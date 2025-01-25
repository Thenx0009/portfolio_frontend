// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaRegEdit } from "react-icons/fa";
// import { RiDeleteBin6Line } from "react-icons/ri";

// const StockTable = () => {
//   const [stocks, setStocks] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchStocks = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/stocks');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();

//         // Simulating a delay of 2 seconds before setting data
//         setTimeout(() => {
//           setStocks(data);
//           setIsLoading(false);
//         }, 1000);
//       } catch (error) {
//         console.error("There was an error fetching the stocks:", error.message);
//         setIsLoading(false); // End loading even if there's an error
//       }
//     };

//     fetchStocks();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/stocks/${id}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error('Failed to delete the stock');
//       }
//       setStocks(stocks.filter((stock) => stock.id !== id));
//     } catch (error) {
//       console.error('There was an error deleting the stock:', error);
//     }
//   };

//   return (
//     <div className="mt-14 flex flex-col items-center px-4 md:px-0">
//       <div className="flex justify-between items-center   w-[90vw] sm:w-[80vw] md:w-[80vw] lg:w-[70vw] mb-4">
//         <h1 className="text-[18px] sm:text-2xl md:text-4xl text-green-600 py-4 px-5 rounded-xl font-semibold">
//           Stock Holdings
//         </h1>
//         <Link
//           className="bg-blue-500 text-white py-2 text-[14px] md:text-[18px] px-2 sm:py-2 sm:px-3 md:py-3 md:px-5 font-semibold rounded-lg hover:bg-blue-600 transition text-center"
//           to="/add"
//         >
//           Add New Stock
//         </Link>
//       </div>

//       <div className="bg-gray-100 py-3 px-3 rounded-3xl shadow-2xl w-[90vw] sm:w-[80vw] md:w-[80vw] lg:w-[70vw]">
//         <div className="border-2 shadow-2xl rounded-2xl overflow-hidden border-gray-300">
//           <table className="table-auto border-collapse border-spacing-2 rounded-lg border border-gray-400 w-full text-center mx-auto">
//             <thead className="bg-green-400">
//               <tr>
//                 <th className=" text-white border-gray-400 px-1 py-1 md:px-2 md:py-3 text-[12px] sm:text-[14px] md:text-[18px] sm:px-4">Stock Name</th>
//                 <th className=" text-white border-gray-400 px-1 py-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">Ticker</th>
//                 <th className=" text-white border-gray-400 px-1 py-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">Quantity</th>
//                 <th className=" text-white border-gray-400 px-1 py-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">Buy Price</th>
//                 <th className=" text-white border-gray-400 px-1 py-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isLoading ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-8">
//                     <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid w-12 h-12 mx-auto"></div>
//                     <p className="mt-4 text-xl text-gray-500">Loading stocks...</p>
//                   </td>
//                 </tr>
//               ) : (
//                 stocks.map((stock) => (
//                   <tr key={stock.id} className="odd:bg-white even:bg-white">
//                     <td className=" border-gray-400 px-1 py-3 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">{stock.name}</td>
//                     <td className=" border-gray-400 px-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">{stock.ticker}</td>
//                     <td className=" border-gray-400 px-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">{stock.quantity}</td>
//                     <td className=" border-gray-400 px-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">${stock.buyPrice}</td>
//                     <td className=" border-gray-400 px-3 py-5 md:py-1 text-[12px] md:text-[18px] sm:px-4 flex items-center justify-center gap-3 md:gap-8">
//                       <Link
//                         to={`/edit/${stock.id}`}
//                         className="bg-yellow-500 text-white px-1 md:px-3 py-1 md:py-3 rounded hover:bg-yellow-600 transition"
//                       >
//                         <FaRegEdit size={13} />
//                       </Link>
//                       <button
//                         className="bg-red-500 text-white px-1 md:px-3  md:py-3 py-1 rounded hover:bg-red-600 transition"
//                         onClick={() => handleDelete(stock.id)}
//                       >
//                         <RiDeleteBin6Line size={13} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StockTable;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaRegEdit } from "react-icons/fa";
// import { RiDeleteBin6Line } from "react-icons/ri";

// const StockTable = () => {
//   const [stocks, setStocks] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchStocks = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/stocks');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();

//         // Fetch current prices for each stock
//         const updatedStocks = await Promise.all(
//           data.map(async (stock) => {
//             const priceResponse = await fetch(
//               `http://localhost:8080/api/stocks/real-time-price/${stock.ticker}`
//             );
//             if (!priceResponse.ok) {
//               throw new Error(`Failed to fetch current price for ${stock.ticker}`);
//             }
//             const currentPrice = await priceResponse.json();
//             return { ...stock, currentPrice };
//           })
//         );

//         setTimeout(() => {
//           setStocks(updatedStocks);
//           setIsLoading(false);
//         }, 1000);
//       } catch (error) {
//         console.error("There was an error fetching the stocks:", error.message);
//         setIsLoading(false);
//       }
//     };

//     fetchStocks();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/stocks/${id}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error('Failed to delete the stock');
//       }
//       setStocks(stocks.filter((stock) => stock.id !== id));
//     } catch (error) {
//       console.error('There was an error deleting the stock:', error);
//     }
//   };

//   return (
//     <div className="mt-14 flex flex-col items-center px-4 md:px-0">
//       <div className="flex justify-between items-center w-[90vw] sm:w-[80vw] md:w-[80vw] lg:w-[70vw] mb-4">
//         <h1 className="text-[18px] sm:text-2xl md:text-4xl text-green-600 py-4 px-5 rounded-xl font-semibold">
//           Stock Holdings
//         </h1>
//         <Link
//           className="bg-blue-500 text-white py-2 text-[14px] md:text-[18px] px-2 sm:py-2 sm:px-3 md:py-3 md:px-5 font-semibold rounded-lg hover:bg-blue-600 transition text-center"
//           to="/add"
//         >
//           Add New Stock
//         </Link>
//       </div>

//       <div className="bg-gray-100 py-3 px-3 rounded-3xl shadow-2xl w-[90vw] sm:w-[80vw] md:w-[80vw] lg:w-[70vw]">
//         <div className="border-2 shadow-2xl rounded-2xl overflow-hidden border-gray-300">
//           <table className="table-auto border-collapse border-spacing-2 rounded-lg border border-gray-400 w-full text-center mx-auto">
//             <thead className="bg-green-400">
//               <tr>
//                 <th className="text-white border-gray-400 px-1 py-1 md:px-2 md:py-3 text-[12px] sm:text-[14px] md:text-[18px] sm:px-4">Stock Name</th>
//                 <th className="text-white border-gray-400 px-1 py-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">Ticker</th>
//                 <th className="text-white border-gray-400 px-1 py-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">Quantity</th>
//                 <th className="text-white border-gray-400 px-1 py-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">Current Price</th>
//                 <th className="text-white border-gray-400 px-1 py-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">Buy Price</th>
//                 <th className="text-white border-gray-400 px-1 py-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isLoading ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-8">
//                     <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid w-12 h-12 mx-auto"></div>
//                     <p className="mt-4 text-xl text-gray-500">Loading stocks...</p>
//                   </td>
//                 </tr>
//               ) : (
//                 stocks.map((stock) => (
//                   <tr key={stock.id} className="odd:bg-white even:bg-white">
//                     <td className="border-gray-400 px-1 py-3 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">{stock.name}</td>
//                     <td className="border-gray-400 px-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">{stock.ticker}</td>
//                     <td className="border-gray-400 px-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">{stock.quantity}</td>
//                     <td className="border-gray-400 px-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">${stock.currentPrice?.toFixed(2)}</td>
//                     <td className="border-gray-400 px-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">${stock.buyPrice}</td>
//                     <td className="border-gray-400 px-3 py-5 md:py-1 text-[12px] md:text-[18px] sm:px-4 flex items-center justify-center gap-3 md:gap-8">
//                       <Link
//                         to={`/edit/${stock.id}`}
//                         className="bg-yellow-500 text-white px-1 md:px-3 py-1 md:py-3 rounded hover:bg-yellow-600 transition"
//                       >
//                         <FaRegEdit size={13} />
//                       </Link>
//                       <button
//                         className="bg-red-500 text-white px-1 md:px-3 md:py-3 py-1 rounded hover:bg-red-600 transition"
//                         onClick={() => handleDelete(stock.id)}
//                       >
//                         <RiDeleteBin6Line size={13} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StockTable;



// ---------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaRegEdit, FaRegHeart } from "react-icons/fa";
// import { RiDeleteBin6Line } from "react-icons/ri";

// const StockTable = ({ onAddToWishlist }) => {
//   const [stocks, setStocks] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchStocks = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/stocks');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();

//         // Fetch current prices for each stock
//         const updatedStocks = await Promise.all(
//           data.map(async (stock) => {
//             const priceResponse = await fetch(
//               `http://localhost:8080/api/stocks/real-time-price/${stock.ticker}`
//             );
//             if (!priceResponse.ok) {
//               throw new Error(`Failed to fetch current price for ${stock.ticker}`);
//             }
//             const currentPrice = await priceResponse.json();
//             return { ...stock, currentPrice };
//           })
//         );

//         setTimeout(() => {
//           setStocks(updatedStocks);
//           setIsLoading(false);
//         }, 1000);
//       } catch (error) {
//         console.error("There was an error fetching the stocks:", error.message);
//         setIsLoading(false);
//       }
//     };

//     fetchStocks();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/stocks/${id}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error('Failed to delete the stock');
//       }
//       setStocks(stocks.filter((stock) => stock.id !== id));
//     } catch (error) {
//       console.error('There was an error deleting the stock:', error);
//     }
//   };

//   const handleAddToWishlist = (stock) => {
//     onAddToWishlist(stock);
//   };

//   return (
//     <div className="mt-14 flex flex-col items-center px-4 md:px-0">
//       <div className="flex justify-between items-center w-[90vw] sm:w-[80vw] md:w-[80vw] lg:w-[70vw] mb-4">
//         <h1 className="text-[18px] sm:text-2xl md:text-4xl text-green-600 py-4 px-5 rounded-xl font-semibold">
//           Stock Holdings
//         </h1>
//         <Link
//           className="bg-blue-500 text-white py-2 text-[14px] md:text-[18px] px-2 sm:py-2 sm:px-3 md:py-3 md:px-5 font-semibold rounded-lg hover:bg-blue-600 transition text-center"
//           to="/add"
//         >
//           Add New Stock
//         </Link>
//       </div>

//       <div className="bg-gray-100 py-3 px-3 rounded-3xl shadow-2xl w-[90vw] sm:w-[80vw] md:w-[80vw] lg:w-[70vw]">
//         <div className="border-2 shadow-2xl rounded-2xl overflow-hidden border-gray-300">
//           <table className="table-auto border-collapse border-spacing-2 rounded-lg border border-gray-400 w-full text-center mx-auto">
//             <thead className="bg-green-400">
//               <tr>
//                 <th className="text-white border-gray-400 px-1 py-1 md:px-2 md:py-3 text-[12px] sm:text-[14px] md:text-[18px] sm:px-4">Stock Name</th>
//                 <th className="text-white border-gray-400 px-1 py-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">Ticker</th>
//                 <th className="text-white border-gray-400 px-1 py-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">Quantity</th>
//                 <th className="text-white border-gray-400 px-1 py-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">Current Price</th>
//                 <th className="text-white border-gray-400 px-1 py-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isLoading ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-8">
//                     <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid w-12 h-12 mx-auto"></div>
//                     <p className="mt-4 text-xl text-gray-500">Loading stocks...</p>
//                   </td>
//                 </tr>
//               ) : (
//                 stocks.map((stock) => (
//                   <tr key={stock.id} className="odd:bg-white even:bg-white">
//                     <td className="border-gray-400 px-1 py-3 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">{stock.name}</td>
//                     <td className="border-gray-400 px-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">{stock.ticker}</td>
//                     <td className="border-gray-400 px-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">{stock.quantity}</td>
//                     <td className="border-gray-400 px-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">${stock.currentPrice?.toFixed(2)}</td>
//                     <td className="border-gray-400 px-3 py-5 md:py-1 text-[12px] md:text-[18px] sm:px-4 flex items-center justify-center gap-3 md:gap-8">
//                       <Link
//                         to={`/edit/${stock.id}`}
//                         className="bg-yellow-500 text-white px-1 md:px-3 py-1 md:py-3 rounded hover:bg-yellow-600 transition"
//                       >
//                         <FaRegEdit size={13} />
//                       </Link>
//                       <button
//                         className="bg-red-500 text-white px-1 md:px-3 md:py-3 py-1 rounded hover:bg-red-600 transition"
//                         onClick={() => handleDelete(stock.id)}
//                       >
//                         <RiDeleteBin6Line size={13} />
//                       </button>
//                       <button
//                         className="bg-pink-500 text-white px-1 md:px-3 py-1 md:py-3 rounded hover:bg-pink-600 transition"
//                         onClick={() => handleAddToWishlist(stock)}
//                       >
//                         <FaRegHeart size={13} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StockTable;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit, FaRegHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from 'react-hot-toast';

const StockTable = ({ onAddToWishlist }) => {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stockToDelete, setStockToDelete] = useState(null);
  const [error, setError] = useState(false); // Add error state

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch('${process.env.REACT_APP_API_URL}/api/stocks');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const updatedStocks = await Promise.all(
          data.map(async (stock) => {
            const priceResponse = await fetch(
              `${process.env.REACT_APP_API_URL}/api/stocks/real-time-price/${stock.ticker}`
            );
            if (!priceResponse.ok) {
              throw new Error(`Failed to fetch current price for ${stock.ticker}`);
            }
            const currentPrice = await priceResponse.json();
            return { ...stock, currentPrice };
          })
        );

        setTimeout(() => {
          setStocks(updatedStocks);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("There was an error fetching the stocks:", error.message);
        setError(true); // Set error to true
        setIsLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/stocks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the stock');
      }
      setStocks(stocks.filter((stock) => stock.id !== id));
      toast.success('Stock deleted successfully!');
    } catch (error) {
      console.error('There was an error deleting the stock:', error);
      toast.error('Failed to delete the stock.');
    }
    setStockToDelete(null); // Close the confirmation modal
  };

  const handleAddToWishlist = (stock) => {
    onAddToWishlist(stock);
    toast.success( `${stock.name} added to wishlist!`);
  };

  return (
    <div className="mt-14 flex flex-col items-center px-4 md:px-0">
      <Toaster position="top-center" />
      <div className="flex justify-between items-center w-[90vw] sm:w-[80vw] md:w-[80vw] lg:w-[70vw] mb-4">
        <h1 className="text-[18px] sm:text-2xl md:text-4xl text-green-600 py-4 px-5 rounded-xl font-bold">
          Stock Holdings
        </h1>
        <Link
          className="bg-blue-500 text-white py-2 text-[14px] md:text-[18px] px-2 sm:py-2 sm:px-3 md:py-3 md:px-5 font-semibold rounded-lg hover:bg-blue-600 transition text-center"
          to="/add"
        >
          Add New Stock
        </Link>
      </div>

      <div className="bg-gray-100 py-3 px-3 rounded-3xl shadow-2xl w-[90vw] sm:w-[80vw] md:w-[80vw] lg:w-[70vw]">
        <div className="border-2 shadow-2xl rounded-2xl border-gray-300">
          <table className="table-auto border-collapse border-spacing-2 rounded-lg border border-gray-400 w-full text-center mx-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-gray-900 border-gray-400 px-1 py-1 md:px-2 md:py-3 text-[12px] sm:text-[14px] md:text-[18px] sm:px-4">Stock Name</th>
                <th className="text-gray-900 border-gray-400 px-1 py-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">Ticker</th>
                <th className="text-gray-900 border-gray-400 px-1 py-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">Quantity</th>
                <th className="text-gray-900 border-gray-400 px-1 py-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">Current Price</th>
                <th className="text-gray-900 border-gray-400 px-1 py-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-8">
                    <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid w-12 h-12 mx-auto"></div>
                    <p className="mt-4 text-xl text-gray-500">Loading stocks...</p>
                  </td>
                </tr>
              ) : error ? ( // Display error message when the backend is down
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500 text-lg">
                    Unable to load stocks. Please check the internet connection or Try again later.
                  </td>
                </tr>
              ) : (
                stocks.map((stock) => (
                  <tr key={stock.id} className="odd:bg-white even:bg-white">
                    <td className="border-gray-400 px-1 py-3 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">{stock.name}</td>
                    <td className="border-gray-400 px-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">{stock.ticker}</td>
                    <td className="border-gray-400 px-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">{stock.quantity}</td>
                    <td className="border-gray-400 px-1 text-[11px] sm:text-[14px] md:text-[18px] sm:px-4">${stock.currentPrice?.toFixed(2)}</td>
                    <td className="border-gray-400 px-3 py-5 md:py-1 text-[12px] md:text-[18px] sm:px-4 flex items-center justify-center gap-3 md:gap-8">
                      <Link
                        to={`/edit/${stock.id}`}
                        className="bg-yellow-400 text-white px-1 md:px-3 py-1 md:py-3 rounded hover:bg-yellow-500  hover:scale-110 transition-all duration-200 ease-in-out"
                      >
                        <FaRegEdit size={16} className='hover:scale-150 transition-all ease-in-out duration-200' />
                      </Link>
                      <button
                        className="bg-red-500 text-white px-1 md:px-3 md:py-3 py-1 rounded hover:bg-red-600 hover:scale-110 transition-all duration-200 ease-in-out"
                        onClick={() => setStockToDelete(stock)}
                      >
                        <RiDeleteBin6Line size={16} className='hover:scale-150 transition-all ease-in-out duration-200' />
                      </button>
                      <button
                        className="bg-pink-500 text-white px-1 md:px-3 py-1 md:py-3 rounded hover:bg-pink-600 hover:scale-110 transition-all duration-200 ease-in-out"
                        onClick={() => handleAddToWishlist(stock)}
                      >
                        <FaRegHeart size={16} className='hover:scale-150 transition-all ease-in-out duration-200' />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {stockToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="text-gray-500 mb-6">Do you really want to delete this stock? This process cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                onClick={() => handleDelete(stockToDelete.id)}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition"
                onClick={() => setStockToDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockTable;