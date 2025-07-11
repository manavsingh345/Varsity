import axios from 'axios';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1/quote';
console.log("ENV:", import.meta.env);


export const fetchStockQuote = async (symbol) => {
    try {
        console.log("API KEY:", API_KEY);

        const response = await axios.get(`${BASE_URL}?symbol=${symbol}&token=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${symbol}:`, error);
        return null;
    }
};

export const mapToWatchlistFormat = (symbol, data) => {
    const changePercent = ((data.c - data.pc) / data.pc) * 100;

    return {
        name: symbol,
        price: data.c,
        percent: `${changePercent.toFixed(2)}%`,
        isDown: changePercent < 0
    };
};
