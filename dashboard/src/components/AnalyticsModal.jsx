import React, { useEffect, useState } from "react";
import "./AnalyticsModal.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AnalyticsModal = ({ stock, onClose }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
  // Static data generation (mocked)
  const basePrice = stock.price;
  const tempData = [];

  for (let i = 6; i >= 0; i--) {
    const variation = (Math.random() - 0.5) * 10;
    tempData.push({
      day: `Day ${7 - i}`,
      price: +(basePrice + variation).toFixed(2),
    });
  }

  setChartData(tempData);
}, [stock]);



  return (
    <div className="analytics-modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>{stock.name} - Analytics</h3>

        <p><strong>Price:</strong> ₹{stock.price.toFixed(2)}</p>
        <p><strong>Day High:</strong> ₹{(stock.price * 1.03).toFixed(2)}</p>
        <p><strong>Day Low:</strong> ₹{(stock.price * 0.97).toFixed(2)}</p>
        <p><strong>Volume:</strong> 1.2M (mocked)</p>
        <p><strong>Market Cap:</strong> ₹2.3T (mocked)</p>

        <div style={{ width: "100%", height: 200, marginTop: "20px" }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="day" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#007bff" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;
