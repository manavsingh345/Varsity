import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/holdings.css";

function Holdings() {
  const [allHoldings, setAllHoldings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const getHoldings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/myHoldings/${user._id}`);
      setAllHoldings(res.data);
    } catch (error) {
      console.log("Error fetching holdings", error);
    }
  };

  useEffect(() => {
    getHoldings();
  }, []);

  return (
    <div className="main-holdings-container">
      <h1>My Holdings</h1>
      <div className="table-container-holdings">
        <table>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Quantity</th>
              <th>Avg Cost</th>
              <th>LTP</th>
              <th>Cur Value</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const investment = stock.avg * stock.qty;

              const isProfit = curValue - investment >= 0;
              const profClass = isProfit ? "profit" : "loss";

              // Handle avg = 0 gracefully
              let netChangePercent = "--";
              let dayChangePercent = "--";

              if (stock.avg > 0) {
                netChangePercent = ((stock.price - stock.avg) / stock.avg) * 100;
                dayChangePercent = netChangePercent; // or calculate based on prevClose if available
              }

              const dayClass =
                typeof dayChangePercent === "number" && dayChangePercent < 0
                  ? "loss"
                  : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>{(curValue - investment).toFixed(2)}</td>
                  <td className={profClass}>
                    {typeof netChangePercent === "number"
                      ? `${netChangePercent.toFixed(2)}%`
                      : netChangePercent}
                  </td>
                  <td className={dayClass}>
                    {typeof dayChangePercent === "number"
                      ? `${dayChangePercent.toFixed(2)}%`
                      : dayChangePercent}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Holdings;
