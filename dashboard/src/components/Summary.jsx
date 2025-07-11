import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [userData, setUserData] = useState({
    name: "User",
    marginAvailable: 0,
    openingBalance: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3002/myHoldings", {
        headers: { Authorization: token },
      })
      .then((res) => setHoldings(res.data));

    axios
      .get("http://localhost:3002/user/summary", {
        headers: { Authorization: token },
      })
      .then((res) => setUserData(res.data));
  }, []);

  // Financial calculations
  const totalInvestment = holdings.reduce(
    (acc, stock) => acc + stock.avg * stock.qty,
    0
  );
  const currentValue = holdings.reduce(
    (acc, stock) => acc + stock.price * stock.qty,
    0
  );
  const profitLoss = currentValue - totalInvestment;
  const profitPercent =
    totalInvestment > 0 ? (profitLoss / totalInvestment) * 100 : 0;
  const plClass = profitLoss >= 0 ? "profit" : "loss";

  // Margin calculations
  const marginUsed = totalInvestment;
  const marginAvailable = userData.openingBalance - marginUsed;

  return (
    <>
      <div className="username">
        <h6>Hi, {userData.name}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{(marginAvailable / 1000).toFixed(2)}k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{(marginUsed / 1000).toFixed(2)}k</span>
            </p>
            <p>
              Opening balance{" "}
              <span>{(userData.openingBalance / 1000).toFixed(2)}k</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={plClass}>
              {(profitLoss / 1000).toFixed(2)}k{" "}
              <small>({profitPercent.toFixed(2)}%)</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{(currentValue / 1000).toFixed(2)}k</span>
            </p>
            <p>
              Investment <span>{(totalInvestment / 1000).toFixed(2)}k</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
