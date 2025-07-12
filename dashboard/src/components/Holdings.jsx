import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import { VerticalGraph } from "./VerticalGraph";

// import { holdings } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/myHoldings`, {
      headers: { Authorization: token },
    }).then((res) => {
      // console.log(res.data);
      setAllHoldings(res.data);
    });
  }, []);

  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Total investment and value calculations
  const totalInvestment = allHoldings.reduce(
    (acc, stock) => acc + stock.avg * stock.qty,
    0
  );
  const currentValue = allHoldings.reduce(
    (acc, stock) => acc + stock.price * stock.qty,
    0
  );
  const profitLoss = currentValue - totalInvestment;
  const profitPercent =
    totalInvestment > 0 ? (profitLoss / totalInvestment) * 100 : 0;
  const plClass = profitLoss >= 0 ? "profit" : "loss";


  // export const data = {
  //   labels,
  //   datasets: [
  // {
  //   label: 'Dataset 1',
  //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
  // },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          // inside map callback
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const investment = stock.avg * stock.qty;

              const isProfit = curValue - investment >= 0.0;
              const profClass = isProfit ? "profit" : "loss";

              const safeAvg = stock.avg > 0 ? stock.avg : 1;
              const netChangePercent = ((stock.price - safeAvg) / safeAvg) * 100;

              // fallback to avg if prevClose is missing (or use your DB’s previousClose if available)
              const prevClose = stock.avg || stock.price;
              const safePrev = prevClose > 0 ? prevClose : 1;
              const dayChangePercent = ((stock.price - safePrev) / safePrev) * 100;
              const dayClass = dayChangePercent < 0 ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - investment).toFixed(2)}
                  </td>
                  <td className={profClass}>
                    {netChangePercent.toFixed(2)}%
                  </td>
                  <td className={dayClass}>
                    {dayChangePercent.toFixed(2)}%
                  </td>
                </tr>
              );
        })}


        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{currentValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={plClass}>
            {profitLoss.toFixed(2)} ({profitPercent.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;