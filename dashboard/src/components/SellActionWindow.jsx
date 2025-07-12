import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css"; // Reuse the styles
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SellActionWindow = ({ uid }) => {
    const [stockQuantity, setStockQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(0.0);
    const generalContext = useContext(GeneralContext);

    useEffect(() => {
      // fetch current price from backend
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/price/${uid}`)  // you'll add this backend route
        .then((res) => setStockPrice(res.data.price))
        .catch((err) => {
          console.error("Error fetching price:", err);
          setStockPrice(0); // fallback
        });
    }, [uid]);

    const handleSellClick = () => {
        const token = localStorage.getItem("token");

        axios
            .post(    
                `${import.meta.env.VITE_BACKEND_URL}/newOrder`,
                {
                    name: uid,
                    qty: Number(stockQuantity),
                    price: Number(stockPrice),
                    mode: "SELL",
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then(() => {
            toast.success("Sell successful!", {
            position: "top-center",
            autoClose: 3000,
        });

        setTimeout(() => {
        generalContext.closeSellWindow();
        window.location.reload(); 
        }, 1000); 
        })

            .catch((err) => {
            toast.error(err.response?.data || "Sell failed", {
            position: "top-center",
            autoClose: 3000,
        });

});

    };

    const handleCancelClick = () => {
        generalContext.closeSellWindow();
    };

    return (
        <div className="container" id="sell-window" draggable="true">
            <div className="regular-order">
                <div className="inputs">
                    <fieldset>
                        <legend>Qty.</legend>
                        <input
                            type="number"
                            onChange={(e) => setStockQuantity(e.target.value)}
                            value={stockQuantity}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Price</legend>
                        <input
                        type="number"
                        name="price"
                        id="price"
                        step="0.05"
                        value={stockPrice}
                        readOnly // 🛑 make it non-editable
                        />
                    </fieldset>
                </div>
            </div>

            <div className="buttons">
                <span>
                    Est. earnings ₹{(stockQuantity * stockPrice).toFixed(2)}
                </span>
                <div>
                    <Link className="btn btn-blue" onClick={handleSellClick}>
                        Sell
                    </Link>
                    <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
                        Cancel
                    </Link>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />

        </div>
    );
};

export default SellActionWindow;
