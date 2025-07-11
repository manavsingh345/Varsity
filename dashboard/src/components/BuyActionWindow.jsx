import React, { useState, useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const generalContext = useContext(GeneralContext);

  useEffect(() => {
  // fetch current price from backend
  axios
    .get(`http://localhost:3002/price/${uid}`)  // you'll add this backend route
    .then((res) => setStockPrice(res.data.price))
    .catch((err) => {
      console.error("Error fetching price:", err);
      setStockPrice(0); // fallback
    });
}, [uid]);

  const handleBuyClick = () => {
  const token = localStorage.getItem("token");

  axios
    .post(
      "http://localhost:3002/newOrder",
      {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then(() => {
      toast.success("Buy successful!", {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        generalContext.closeBuyWindow(); // ✅ CORRECTED
        window.location.reload();
      }, 1000);
    })
    .catch((err) => {
      toast.error(err.response?.data || "Buy failed", {
        position: "top-center",
        autoClose: 3000,
      });
    });
};

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
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
          Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}
        </span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
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

export default BuyActionWindow;
