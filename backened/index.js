require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "zerodha_clone_secret";


const app = express();
app.use(cors());
app.use(bodyParser.json());



//razorpay
const Razorpay = require("razorpay");
const { WalletModel } = require("./model/WalletModel");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const allowedOrigins = [
  "https://frontend-09yj.onrender.com",
  "https://dashboard-m8d9.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Varsity backend is running!");
});



function authMiddleware(req, res, next) {
    const token = req.headers.authorization; // no split, directly get token

    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

app.get("/user/summary", authMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId).select("name marginAvailable openingBalance");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            name: user.name,
            marginAvailable: user.marginAvailable,
            openingBalance: user.openingBalance,
        });
    } catch (err) {
        console.error("Error in /user/summary:", err);
        res.status(500).json({ message: "Server error" });
    }
});


app.get("/dashboard", authMiddleware, async (req, res) => {
    const user = await UserModel.findById(req.userId).select("-password");
    res.json({ message: "Dashboard access granted", user });
});


app.get("/allHoldings", async (req, res) => {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
});

app.post("/newOrder", authMiddleware, async (req, res) => {
    const { name, qty, price, mode } = req.body;
    const userId = req.userId;

    const quantity = Number(qty);
    const priceValue = Number(price);
    const totalAmount = quantity * priceValue;

    if (!name || isNaN(quantity) || isNaN(priceValue) || !mode) {
        return res.status(400).send("Invalid input data");
    }

    try {
        // Save order
        const newOrder = new OrdersModel({
            name,
            qty: quantity,
            price: priceValue,
            mode: mode.toUpperCase(),
            userId: userId,
        });
        await newOrder.save();

        let wallet = await WalletModel.findOne({ userId });
        if (!wallet) {
            wallet = new WalletModel({ userId, balance: 0, transactions: [] });
        }

        if (mode === "BUY") {
            if (wallet.balance < totalAmount) {
                return res.status(400).send("Insufficient funds");
            }

           wallet.balance = Math.round((wallet.balance - totalAmount) * 100) / 100;

            wallet.transactions.push({
                amount: -totalAmount,
                paymentId: `buy_${Date.now()}`,
            });

            const existing = await HoldingsModel.findOne({ name, userId });

            if (existing) {
                const totalQty = existing.qty + quantity;
                const totalCost = (existing.avg * existing.qty) + (priceValue * quantity);
                const newAvg = totalCost / totalQty;

                existing.qty = totalQty;
                existing.avg = newAvg;
                existing.price = priceValue;
                await existing.save();
            } else {
                const newHolding = new HoldingsModel({
                    userId,
                    name,
                    qty: quantity,
                    avg: priceValue,
                    price: priceValue,
                    net: "+0.00%",
                    day: "+0.00%",
                });
                await newHolding.save();
            }

            // ✅ ADDING THIS: Update PositionsModel
            const existingPosition = await PositionsModel.findOne({ name, user: userId });

            if (existingPosition) {
                const totalQty = existingPosition.qty + quantity;
                const totalCost = (existingPosition.avg * existingPosition.qty) + (priceValue * quantity);
                const newAvg = totalCost / totalQty;

                existingPosition.qty = totalQty;
                existingPosition.avg = newAvg;
                existingPosition.price = priceValue;
                await existingPosition.save();
            } else {
                const newPosition = new PositionsModel({
                    user: userId,
                    name,
                    product: "CNC",
                    qty: quantity,
                    avg: priceValue,
                    price: priceValue
                });
                await newPosition.save();
            }
        }

        if (mode === "SELL") {
            const existing = await HoldingsModel.findOne({ name, userId });

            if (!existing || existing.qty < quantity) {
                return res.status(400).send("Not enough stock to sell");
            }

            const newQty = existing.qty - quantity;

            if (newQty === 0) {
                    await HoldingsModel.deleteOne({ name, userId });
            } else {
                existing.qty = newQty;
                existing.price = priceValue;
                await existing.save();
            }

            wallet.balance = Math.round((wallet.balance + totalAmount) * 100) / 100;
            wallet.transactions.push({
            amount: totalAmount,
            paymentId: `sell_${Date.now()}`,
            });

            // Optional: You can also update or remove positions on SELL
            const existingPosition = await PositionsModel.findOne({ name, user: userId });

            if (existingPosition) {
                const newQty = existingPosition.qty - quantity;

            if (newQty <= 0) {
                await PositionsModel.deleteOne({ name, user: userId });
            } else {
                existingPosition.qty = newQty;
                existingPosition.price = priceValue;
                await existingPosition.save();
            }
        }
    }
        await wallet.save();
        res.send("Order, holdings, positions, and wallet updated!");
    } catch (err) {
        console.error("[ORDER ERROR]", err);
        res.status(500).send("Server error");
    }
});



const { Types } = require("mongoose");


app.get("/orders/:userId", async (req, res) => {
    const { userId } = req.params;

    if (!Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid userId" });
    }

    try {
        const orders = await OrdersModel.find({ userId });
        res.json(orders);
    } catch (err) {
        console.error("Error in /orders route:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/positions/:userId", async (req, res) => {
    const { userId } = req.params;

    if (!Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid userId" });
    }

    try {
        const positions = await PositionsModel.find({ user: userId });

        res.json(positions); // send empty array if none
    } catch (err) {
        console.error("Error fetching positions:", err);
        res.status(500).json({ message: "Server error" });
    }
});


app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).send("Missing fields");

    const existing = await UserModel.findOne({ email });
    if (existing) return res.status(409).send("User already exists");

    const hashed = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashed });
    await user.save();

    res.status(201).send("Signup successful");
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                name: user.name,
                email: user.email,
                id: user._id
            }
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});




app.post("/create-order", async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100, // Razorpay needs amount in paise
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (err) {
        console.error("Razorpay Order Error:", err);
        res.status(500).json({ error: "Unable to create Razorpay order" });
    }
});

app.post("/add-funds", authMiddleware, async (req, res) => {
    const { amount, paymentId } = req.body;
    const userId = req.userId;

    try {
        let wallet = await WalletModel.findOne({ userId });

        if (!wallet) {
            wallet = new WalletModel({ userId, balance: 0, transactions: [] });
        }

        wallet.transactions.push({ amount, paymentId });
        wallet.balance += amount;

        await wallet.save();

        res.status(200).json({ message: "Funds added successfully", wallet });
    } catch (err) {
        console.error("Wallet Error:", err);
        res.status(500).json({ error: "Unable to update wallet" });
    }
});

const axios = require("axios");

app.get("/myHoldings", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const holdings = await HoldingsModel.find({ userId });

    const apiKey = process.env.FINNHUB_API_KEY;
    const symbolMap = {
        "Apple": "AAPL",
        "Google": "GOOGL",
        "Microsoft": "MSFT",
        "Amazon": "AMZN",
        "Tesla": "TSLA",
        "Meta": "META",
        "Nvidia": "NVDA",
        "Netflix": "NFLX",
        "Intel": "INTC",
        "AMD": "AMD"
    };


    const updatedHoldings = await Promise.all(
        holdings.map(async (stock) => {
            try {
                const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
                    params: {
                        symbol: stock.name, // Example: AAPL, TSLA
                        token: apiKey,
                    },
                });

                const livePrice = response.data.c; // current price
                return {
                    ...stock._doc,
                    price: livePrice,
                };
            } catch (error) {
                console.error(`Error fetching price for ${stock.name}:`, error.message);
                return {
                    ...stock._doc,
                    price: stock.avg, // fallback
                };
            }
        })
    );

    res.json(updatedHoldings);
});



app.get("/wallet", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const wallet = await WalletModel.findOne({ userId });

        if (!wallet) {
            return res.status(404).json({ balance: 0 });
        }

        res.json({ balance: wallet.balance });
    } catch (err) {
        console.error("Wallet Fetch Error:", err);
        res.status(500).json({ error: "Failed to fetch wallet" });
    }
});

//to get the price of stock
app.get("/price/:symbol", async (req, res) => {
    const { symbol } = req.params;
    const apiKey = process.env.FINNHUB_API_KEY;

    try {
        const response = await axios.get("https://finnhub.io/api/v1/quote", {
            params: {
                symbol: symbol,  // Example: TSLA
                token: apiKey,
            },
        });

        const price = response.data.c;
        res.json({ price });
    } catch (err) {
        console.error("Error fetching live price:", err.message);
        res.status(500).json({ price: 0 });
    }
});


    


mongoose.connect(url)
    .then(() => {
        console.log("DB connected");
        app.listen(3002, () => {
            console.log("Server is running on port 3002");
        });
    })
    .catch((err) => {
        console.error("DB connection error:", err);
    });
