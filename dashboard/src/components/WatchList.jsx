import React, { useState, useEffect, useContext } from "react";
import { fetchStockQuote, mapToWatchlistFormat } from "../api/finnhub";
import GeneralContext from "./GeneralContext";
import { DoughnutChart } from "./DoughnoutChart";
import AnalyticsModal from "./AnalyticsModal";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

const symbols = [
  "AAPL", "GOOGL", "MSFT", "AMZN", "TSLA",
  "META", "NVDA", "NFLX", "INTC", "AMD"
];

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      const results = await Promise.all(
        symbols.map(async (symbol) => {
          const data = await fetchStockQuote(symbol);
          return mapToWatchlistFormat(symbol.replace(".NS", ""), data);
        })
      );
      setWatchlist(results);
    };

    fetchAll();
    const interval = setInterval(fetchAll, 30000); // auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const handleOpenAnalytics = (stockName) => {
    const stock = watchlist.find((s) => s.name === stockName);
    if (stock) {
      setSelectedStock(stock);
      setShowAnalytics(true);
    }
  };

  const handleCloseAnalytics = () => {
    setSelectedStock(null);
    setShowAnalytics(false);
  };

  const labels = watchlist.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        {/* <input
          type="text"
          name="search"
          id="search"
          //placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        /> */}
        {/* <span className="counts"> {watchlist.length} / 50</span> */}
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => (
          <WatchListItem
            stock={stock}
            key={index}
            onAnalytics={() => handleOpenAnalytics(stock.name)}
          />
        ))}
      </ul>

      <DoughnutChart data={data} />

      {showAnalytics && selectedStock && (
        <AnalyticsModal stock={selectedStock} onClose={handleCloseAnalytics} />
      )}
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, onAnalytics }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowWatchlistActions(true)}
      onMouseLeave={() => setShowWatchlistActions(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">₹{stock.price.toFixed(2)}</span>
        </div>
      </div>
      {showWatchlistActions && (
        <WatchListActions uid={stock.name} onAnalytics={onAnalytics} />
      )}
    </li>
  );
};

const WatchListActions = ({ uid, onAnalytics }) => {
  const generalContext = useContext(GeneralContext);
  const { openBuyWindow, openSellWindow } = generalContext;

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
          <button className="buy" onClick={() => openBuyWindow(uid)}>
            Buy
          </button>
        </Tooltip>

        <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
          <button className="sell" onClick={() => openSellWindow(uid)}>
            Sell
          </button>
        </Tooltip>

        <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
          <button className="action" onClick={onAnalytics}>
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>

        {/* <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip> */}
      </span>
    </span>
  );
};
