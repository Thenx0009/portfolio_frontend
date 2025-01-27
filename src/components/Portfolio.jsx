import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa'; // Import icons

const Portfolio = ({ wishlist, setWishlist, isLoading, onBuyStock  }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [buyPrice, setBuyPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [isWishlistVisible, setIsWishlistVisible] = useState(true);
  const [portfolio, setPortfolio] = useState([]);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(true);

  // Fetch portfolio data from the backend
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('https://portfolio-backend-latest-xngv.onrender.com/api/stocks/portfolio');
        if (response.ok) {
          const data = await response.json();
          setPortfolio(data);
        } else {
          console.error('Failed to fetch portfolio data');
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setIsLoadingPortfolio(false);
      }
    };

    fetchPortfolio();
  }, []);

  const handleBuyClick = (stock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const handleBuyPriceChange = (e) => setBuyPrice(e.target.value);

  const handleQuantityChange = (e) => setQuantity(e.target.value);

  // Handle wishlist stock removal
  const handleRemoveStock = (ticker) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((stock) => stock.ticker !== ticker)
    );
  };
  

  const handleBuyStockSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(buyPrice) || buyPrice <= 0) {
      setError('Please enter a valid buy price');
      return;
    }
  
    if (quantity <= 0 || quantity > selectedStock.availableQuantity) {
      setError('Please enter a valid quantity');
      return;
    }
  
    const stockData = {
      name: selectedStock.name,
      ticker: selectedStock.ticker,
      buyPrice: parseFloat(buyPrice),
      quantity: parseInt(quantity),
      currentPrice: selectedStock.currentPrice,
    };
  
    try {
      const response = await fetch('https://portfolio-backend-latest-xngv.onrender.com/api/stocks/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stockData),
      });
  
      if (response.ok) {
        const newStock = await response.json();
        setPortfolio((prevPortfolio) => [...prevPortfolio, newStock]);
  
        // DO NOT remove the stock from the wishlist here
      } else {
        throw new Error('Failed to add stock to portfolio');
      }
    } catch (error) {
      console.error('Error while adding stock to portfolio:', error);
    }
  
    setIsModalOpen(false);
    setBuyPrice('');
    setQuantity(1);
    setError('');
  };
  
  

  const toggleWishlistVisibility = () => setIsWishlistVisible(!isWishlistVisible);

  return (
    <div className="mt-14 flex flex-col items-center px-4 md:px-0">
      <h1 className="text-3xl sm:text-2xl md:text-4xl text-green-600 py-4 px-5 rounded-xl font-bold">
        My Portfolio
      </h1>

      {/* Wishlist Section */}
      <div className="bg-gray-100 py-3 px-3 rounded-3xl shadow-2xl w-[90vw] sm:w-[80vw] md:w-[80vw] lg:w-[70vw] mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">Your Wishlist</h2>
          <button className="text-gray-700 p-2" onClick={toggleWishlistVisibility}>
            {isWishlistVisible ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
          </button>
        </div>

        {isWishlistVisible && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {wishlist.length > 0 ? (
              wishlist.map((stock, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md border border-gray-300"
                >
                  <h2 className="text-lg font-bold text-gray-700">{stock.name}</h2>
                  <p className="text-gray-600">Ticker: {stock.ticker}</p>
                  <p className="text-gray-600">
                    Current Price: ${stock.currentPrice?.toFixed(2) || 'N/A'}
                  </p>
                  <button
                    className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600 transition"
                    onClick={() => handleBuyClick(stock)}
                  >
                    Buy
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600 transition ml-2"
                    onClick={() => handleRemoveStock(stock.ticker)}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                Your wishlist is empty. Add stocks to your wishlist to track them!
              </p>
            )}
          </div>
        )}
      </div>

      {/* Portfolio Table */}
      <div className="bg-gray-100 py-3 px-3 rounded-3xl shadow-2xl w-[85vw] sm:w-[93vw] md:w-[80vw] lg:w-[70vw] mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Portfolio</h2>
        {isLoadingPortfolio ? (
          <p className="text-gray-500 text-center">Loading portfolio...</p>
        ) : portfolio.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-1 py-1 text-[12px] sm:text-[17px] sm:px-4 sm:py-2">Name</th>
                <th className="border border-gray-300 px-1 py-1 text-[12px] sm:text-[17px] sm:px-4 sm:py-2">Ticker</th>
                <th className="border border-gray-300 px-1 py-1 text-[12px] sm:text-[17px] sm:px-4 sm:py-2">Quantity</th>
                <th className="border border-gray-300 px-1 py-1 text-[12px] sm:text-[17px] sm:px-4 sm:py-2">Buy Price</th>
                <th className="border border-gray-300 px-1 py-1 text-[12px] sm:text-[17px] sm:px-4 sm:py-2">Current Price</th>
                <th className="border border-gray-300 px-1 py-1 text-[12px] sm:text-[17px] sm:px-4 sm:py-2">P&L</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((stock, index) => {
                const profitLoss = ((stock.currentPrice - stock.buyPrice) * stock.quantity).toFixed(2);
                const isProfit = profitLoss > 0;

                return (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 px-1 py-1 text-[10px] sm:text-[17px] sm:px-4 sm:py-2">{stock.name}</td>
                    <td className="border border-gray-300 px-1 py-1 text-[10px] sm:text-[17px] sm:px-4 sm:py-2">{stock.ticker}</td>
                    <td className="border border-gray-300 px-1 py-1 text-[10px] sm:text-[17px] sm:px-4 sm:py-2">{stock.quantity}</td>
                    <td className="border border-gray-300 px-1 py-1 text-[10px] sm:text-[17px] sm:px-4 sm:py-2">
                      ${stock.buyPrice?.toFixed(2) || 'N/A'}
                    </td>
                    <td className="border border-gray-300 px-1 py-1 text-[10px] sm:text-[17px] sm:px-4 sm:py-2">
                      ${stock.currentPrice?.toFixed(2) || 'N/A'}
                    </td>
                    <td className={`border border-gray-300 px-1 py-1 text-[10px] sm:text-[17px] sm:px-4 sm:py-2 ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                      ${profitLoss} {isProfit ? '(Profit)' : '(Loss)'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">
            Your portfolio is empty. Add stocks to see your performance!
          </p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedStock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90vw] sm:w-[60vw] md:w-[40vw]">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold mb-4">Buy Stock</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <FaTimes size={24} className="text-gray-700" />
              </button>
            </div>
            <form onSubmit={handleBuyStockSubmit}>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">Stock Name</label>
                <input
                  type="text"
                  value={selectedStock.name}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">Ticker</label>
                <input
                  type="text"
                  value={selectedStock.ticker}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">Current Price</label>
                <input
                  type="number"
                  value={selectedStock.currentPrice?.toFixed(2) || 'N/A'}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">Buy Price</label>
                <input
                  type="number"
                  value={buyPrice}
                  onChange={handleBuyPriceChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  max={selectedStock.availableQuantity}
                  className="w-full p-2 border rounded-md"
                  required
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
              >
                Buy Stock
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;