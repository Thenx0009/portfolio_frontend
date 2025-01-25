import React, { useState, useEffect } from 'react';

const StockPrice = () => {
  const [stockData, setStockData] = useState(null);
  const [ticker, setTicker] = useState('AAPL'); // Default ticker (AAPL)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockPrice = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://portfolio-backend-latest-xngv.onrender.com/api/stocks/real-time-price/${ticker}`);
        if (!response.ok) {
          throw new Error('Failed to fetch stock price');
        }
        const data = await response.json();
        setStockData(data);
        console.log(ticker);
        
        console.log("AAPL = ",data);

      } catch (error) {
        console.error('Error fetching stock price:', error);
        setError(error.message);
        setStockData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStockPrice();
  }, [ticker]);

  return (
    <div className="pt-14 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl md:text-4xl font-bold text-green-600 mb-6 text-center">Stock Price Checker</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Enter Stock Ticker:
          </label>
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="e.g., AAPL"
          />
        </div>
        {loading ? (
          <div className="text-center">
            <div className="loader border-t-4 border-green-500 w-8 h-8 rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading stock price...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold">
            <p>Error: {error}</p>
          </div>
        ) : stockData ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">
              Ticker: <span className="text-green-600">{ticker}</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Current Price: <span className="text-green-600">${stockData}</span>
            </p>
          </div>
        ) : (
          <div className="text-center text-gray-500 font-semibold">
            <p>No data available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockPrice;





