import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StockForm from './components/StockForm';
import StockTable from './components/StockTable';
import StockPrice from './components/StockPrice';
import NavBar from './components/NavBar';
import Portfolio from './components/Portfolio';

const App = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('${process.env.REACT_APP_API_URL}/api/portfolio');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${ response.status }`);
        }
        const data = await response.json();
        setPortfolio(data);
      } catch (error) {
        console.error("There was an error fetching the portfolio:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  // Persist wishlist to localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist'));
    if (savedWishlist) {
      setWishlist(savedWishlist);
    }
  }, []);

  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  // Add stock to wishlist
  const handleAddToWishlist = (stock) => {
    setWishlist((prevWishlist) => [...prevWishlist, stock]);
  };

  // Handle buying stock and updating portfolio
  const handleBuyStock = (stock, buyPrice) => {
    const newStock = {
      ...stock,
      buyPrice: parseFloat(buyPrice),
      totalValue: stock.quantity * buyPrice,
      gainOrLoss: (stock.quantity * stock.currentPrice) - (stock.quantity * buyPrice),
    };
    setPortfolio((prevPortfolio) => [...prevPortfolio, newStock]);
  };

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<StockForm />} />
          <Route path="/edit/:id" element={<StockForm />} />
          <Route path="/stocks" element={<StockTable onAddToWishlist={handleAddToWishlist} />} />
          <Route path="/price" element={<StockPrice />} />
          {/* <Route
            path="/portfolio"
            element={<Portfolio portfolio={portfolio} wishlist={wishlist} isLoading={isLoading} onBuyStock={handleBuyStock} />}
          /> */}
          <Route
            path="/portfolio"
            element={
              <Portfolio
                portfolio={portfolio}
                wishlist={wishlist}
                setWishlist={setWishlist} // Pass setWishlist
                isLoading={isLoading}
                onBuyStock={handleBuyStock}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;