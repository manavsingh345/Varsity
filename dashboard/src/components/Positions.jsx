import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
  const checkUser = () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      setError("User not logged in.");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (!user || !user._id) {
        setError("User not logged in.");
        return;
      }

      axios
        .get(`http://localhost:3002/positions/${user._id}`)
        .then((res) => setPositions(res.data))
        .catch((err) => {
          console.error("Error fetching positions:", err);
          setError("Failed to fetch positions.");
        });
    } catch (err) {
      setError("Invalid user data.");
    }
  };

  // Optional small delay to ensure localStorage is ready
  setTimeout(checkUser, 100); 
}, []);


  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
  {positions.length === 0 ? (
    <tr>
      <td colSpan="7" style={{ textAlign: "center", padding: "1rem" }}>
        No open positions. You have closed all your trades.
      </td>
    </tr>
  ) : (
    positions.map((stock, index) => {
      const curValue = stock.price * stock.qty;
      const investment = stock.avg * stock.qty;
      const isProfit = curValue >= investment;
      const profitLoss = curValue - investment;
      const changePercent = ((stock.price - stock.avg) / stock.avg) * 100;
      const profClass = isProfit ? "profit" : "loss";
      const dayClass = changePercent < 0 ? "loss" : "profit";

      return (
        <tr key={index}>
          <td>{stock.product}</td>
          <td>{stock.name}</td>
          <td>{stock.qty}</td>
          <td>{stock.avg.toFixed(2)}</td>
          <td>{stock.price.toFixed(2)}</td>
          <td className={profClass}>{profitLoss.toFixed(2)}</td>
          <td className={dayClass}>{changePercent.toFixed(2)}%</td>
        </tr>
      );
    })
  )}
</tbody>

        </table>
      </div>
    </>
  );
};

export default Positions;
