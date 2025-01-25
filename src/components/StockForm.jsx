// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const StockForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [stock, setStock] = useState({
//     name: '',
//     ticker: '',
//     quantity: 1,
//     buyPrice: 1,
//   });

//   const [error, setError] = useState('');

//   const isEditMode = Boolean(id);

//   useEffect(() => {
//     if (isEditMode) {
//       const fetchStock = async () => {
//         try {
//           const response = await fetch(`http://localhost:8080/api/stocks/${id}`);
//           if (!response.ok) {
//             throw new Error('Failed to fetch stock details');
//           }
//           const data = await response.json();
//           setStock(data);
//         } catch (error) {
//           console.error('Error fetching stock details:', error);
//         }
//       };

//       fetchStock();
//     }
//   }, [id, isEditMode]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'quantity' || name === 'buyPrice') {
//       const numericValue = parseFloat(value);
//       if (numericValue < 1 || isNaN(numericValue)) {
//         setError(`${name === 'quantity' ? 'Quantity' : 'Buy Price'} must be greater than zero`);
//         return;
//       }
//       setError('');
//     }

//     setStock({ ...stock, [name]: value });
//   };

//   const handleIncrement = (field) => {
//     setStock((prevStock) => ({
//       ...prevStock,
//       [field]: Math.max(1, parseFloat(prevStock[field]) + 1),
//     }));
//   };

//   const handleDecrement = (field) => {
//     setStock((prevStock) => ({
//       ...prevStock,
//       [field]: Math.max(1, parseFloat(prevStock[field]) - 1),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (stock.quantity < 1 || stock.buyPrice < 1) {
//       setError('Quantity and Buy Price must be greater than zero');
//       return;
//     }

//     const url = isEditMode
//       ? `http://localhost:8080/api/stocks/${id}`
//       : `http://localhost:8080/api/stocks`;

//     const method = isEditMode ? 'PUT' : 'POST';

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(stock),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to ${isEditMode ? 'update' : 'add'} stock`);
//       }

//       navigate('/stocks');
//     } catch (error) {
//       console.error('Error submitting stock form:', error);
//     }
//   };

//   return (
//     <div className="pt-14 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-2xl md:text-3xl font-bold mb-5 text-center">
//           {isEditMode ? 'Edit Stock' : 'Add New Stock'}
//         </h1>
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           {/* Stock Name */}
//           <div className="flex flex-col md:flex-row items-center">
//             <label className="md:w-1/3 font-semibold mb-2 md:mb-0 md:mr-4">Stock Name</label>
//             <input
//               type="text"
//               name="name"
//               value={stock.name}
//               onChange={handleInputChange}
//               placeholder="Stock Name"
//               className="p-2 border rounded w-full md:w-2/3"
//               required
//             />
//           </div>

//           {/* Ticker */}
//           <div className="flex flex-col md:flex-row items-center">
//             <label className="md:w-1/3 font-semibold mb-2 md:mb-0 md:mr-4">Ticker</label>
//             <input
//               type="text"
//               name="ticker"
//               value={stock.ticker}
//               onChange={handleInputChange}
//               placeholder="Ticker"
//               className="p-2 border rounded w-full md:w-2/3"
//               required
//             />
//           </div>

//           {/* Quantity */}
//           <div className="flex flex-col md:flex-row items-center">
//             <label className="md:w-1/3 font-semibold mb-2 md:mb-0 md:mr-4">Quantity</label>
//             <div className="flex items-center w-full md:w-2/3 border rounded p-1">
//               <button
//                 type="button"
//                 onClick={() => handleDecrement('quantity')}
//                 className="px-4 py-2 text-gray-600"
//               >
//                 -
//               </button>
//               <input
//                 type="number"
//                 name="quantity"
//                 value={stock.quantity}
//                 onChange={handleInputChange}
//                 className="w-full text-center border-0 focus:ring-0 no-spinner outline-none"
//                 required
//                 min="1"
//               />
//               <button
//                 type="button"
//                 onClick={() => handleIncrement('quantity')}
//                 className="px-4 py-2 text-gray-600"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Buy Price */}
//           <div className="flex flex-col md:flex-row items-center">
//             <label className="md:w-1/3 font-semibold mb-2 md:mb-0 md:mr-4">Buy Price</label>
//             <div className="flex items-center w-full md:w-2/3 border rounded p-1">
//               <button
//                 type="button"
//                 onClick={() => handleDecrement('buyPrice')}
//                 className="px-4 py-2 text-gray-600"
//               >
//                 -
//               </button>
//               <input
//                 type="number"
//                 name="buyPrice"
//                 value={stock.buyPrice}
//                 onChange={handleInputChange}
//                 className="w-full text-center border-0 focus:ring-0 no-spinner outline-none"
//                 required
//                 min="1"
//               />
//               <button
//                 type="button"
//                 onClick={() => handleIncrement('buyPrice')}
//                 className="px-4 py-2 text-gray-600"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Submit Button */}
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <button
//             type="submit"
//             className="bg-green-500 text-white py-2 px-4 rounded w-full md:w-full"
//           >
//             {isEditMode ? 'Save Changes' : 'Add Stock'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StockForm;

//------------------------------------
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const StockForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [stock, setStock] = useState({
//     name: '',
//     ticker: '',
//     quantity: 1,
//     currentPrice: 0,
//   });

//   const [error, setError] = useState('');
//   const isEditMode = Boolean(id);

//   // Fetch stock details if in edit mode
//   useEffect(() => {
//     if (isEditMode) {
//       const fetchStock = async () => {
//         try {
//           const response = await fetch(`http://localhost:8080/api/stocks/${id}`);
//           if (!response.ok) {
//             throw new Error('Failed to fetch stock details');
//           }
//           const data = await response.json();
//           setStock(data);
//         } catch (error) {
//           console.error('Error fetching stock details:', error);
//         }
//       };

//       fetchStock();
//     }
//   }, [id, isEditMode]);

//   // Fetch current price when ticker changes
//   useEffect(() => {
//     if (stock.ticker.trim()) {
//       const fetchStockPrice = async () => {
//         try {
//           const response = await fetch(`http://localhost:8080/api/stocks/real-time-price/${stock.ticker}`);
//           if (!response.ok) {
//             throw new Error('Failed to fetch stock price');
//           }
//           const data = await response.json();
//           setStock((prevStock) => ({
//             ...prevStock,
//             currentPrice: data.currentPrice,
//           }));
//         } catch (error) {
//           console.error('Error fetching stock price:', error);
//         }
//       };

//       fetchStockPrice();
//     }
//   }, [stock.ticker]);

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'quantity') {
//       const numericValue = parseFloat(value);
//       if (numericValue < 1 || isNaN(numericValue)) {
//         setError('Quantity must be greater than zero');
//         return;
//       }
//       setError('');
//     }

//     setStock({ ...stock, [name]: value });
//   };

//   // Increment/decrement handlers
//   const handleIncrement = (field) => {
//     setStock((prevStock) => ({
//       ...prevStock,
//       [field]: Math.max(1, parseFloat(prevStock[field]) + 1),
//     }));
//   };

//   const handleDecrement = (field) => {
//     setStock((prevStock) => ({
//       ...prevStock,
//       [field]: Math.max(1, parseFloat(prevStock[field]) - 1),
//     }));
//   };

//   // Form submission handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (stock.quantity < 1 || stock.currentPrice < 1) {
//       setError('Quantity and Current Price must be greater than zero');
//       return;
//     }

//     const url = isEditMode
//       ? `http://localhost:8080/api/stocks/${id}`
//       : `http://localhost:8080/api/stocks`;

//     const method = isEditMode ? 'PUT' : 'POST';

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(stock),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to ${isEditMode ? 'update' : 'add'} stock`);
//       }

//       navigate('/stocks');
//     } catch (error) {
//       console.error('Error submitting stock form:', error);
//     }
//   };

//   return (
//     <div className="pt-14 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-2xl md:text-3xl font-bold mb-5 text-center">
//           {isEditMode ? 'Edit Stock' : 'Add New Stock'}
//         </h1>
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           {/* Stock Name */}
//           <div className="flex flex-col md:flex-row items-center">
//             <label className="md:w-1/3 font-semibold mb-2 md:mb-0 md:mr-4">Stock Name</label>
//             <input
//               type="text"
//               name="name"
//               value={stock.name}
//               onChange={handleInputChange}
//               placeholder="Stock Name"
//               className="p-2 border rounded w-full md:w-2/3"
//               required
//             />
//           </div>

//           {/* Ticker */}
//           <div className="flex flex-col md:flex-row items-center">
//             <label className="md:w-1/3 font-semibold mb-2 md:mb-0 md:mr-4">Ticker</label>
//             <input
//               type="text"
//               name="ticker"
//               value={stock.ticker}
//               onChange={handleInputChange}
//               placeholder="Ticker"
//               className="p-2 border rounded w-full md:w-2/3"
//               required
//             />
//           </div>

//           {/* Quantity */}
//           <div className="flex flex-col md:flex-row items-center">
//             <label className="md:w-1/3 font-semibold mb-2 md:mb-0 md:mr-4">Quantity</label>
//             <div className="flex items-center w-full md:w-2/3 border rounded p-1">
//               <button
//                 type="button"
//                 onClick={() => handleDecrement('quantity')}
//                 className="px-4 py-2 text-gray-600"
//               >
//                 -
//               </button>
//               <input
//                 type="number"
//                 name="quantity"
//                 value={stock.quantity}
//                 onChange={handleInputChange}
//                 className="w-full text-center border-0 focus:ring-0 no-spinner outline-none"
//                 required
//                 min="1"
//               />
//               <button
//                 type="button"
//                 onClick={() => handleIncrement('quantity')}
//                 className="px-4 py-2 text-gray-600"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Current Price */}
//           <div className="flex flex-col md:flex-row items-center">
//             <label className="md:w-1/3 font-semibold mb-2 md:mb-0 md:mr-4">Current Price</label>
//             <input
//               type="number"
//               name="currentPrice"
//               value={stock.currentPrice || ''}
//               readOnly
//               className="p-2 border rounded w-full md:w-2/3 bg-gray-100"
//             />
//           </div>

//           {/* Submit Button */}
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <button
//             type="submit"
//             className="bg-green-500 text-white py-2 px-4 rounded w-full md:w-full"
//           >
//             {isEditMode ? 'Save Changes' : 'Add Stock'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StockForm;
//--------------------------------

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const StockForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [stock, setStock] = useState({
//     name: '',
//     ticker: '',
//     quantity: 1,
//     currentPrice: 0,
//   });

//   const [error, setError] = useState('');
//   const isEditMode = Boolean(id);

//   // Fetch stock details if in edit mode
//   useEffect(() => {
//     if (isEditMode) {
//       const fetchStock = async () => {
//         try {
//           const response = await fetch(`http://localhost:8080/api/stocks/${id}`);
//           if (!response.ok) {
//             throw new Error('Failed to fetch stock details');
//           }
//           const data = await response.json();
//           setStock(data);
//         } catch (error) {
//           console.error('Error fetching stock details:', error);
//         }
//       };

//       fetchStock();
//     }
//   }, [id, isEditMode]);

//   // Fetch current price when ticker changes
//   useEffect(() => {
//     if (stock.ticker.trim()) {
//       const fetchStockPrice = async () => {
//         try {
//           const response = await fetch(`http://localhost:8080/api/stocks/real-time-price/${stock.ticker}`);
//           if (!response.ok) {
//             throw new Error('Failed to fetch stock price');
//           }
//           const data = await response.json();
//           setStock((prevStock) => ({
//             ...prevStock,
//             currentPrice: data,
//           }));
//         } catch (error) {
//           console.error('Error fetching stock price:', error);
//         }
//       };

//       fetchStockPrice();
//     }
//   }, [stock.ticker]);

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'quantity') {
//       const numericValue = parseFloat(value);
//       if (numericValue < 1 || isNaN(numericValue)) {
//         setError('Quantity must be greater than zero');
//         return;
//       }
//       setError('');
//     }

//     setStock({ ...stock, [name]: value });
//   };

//   // Increment/decrement handlers
//   const handleIncrement = (field) => {
//     setStock((prevStock) => ({
//       ...prevStock,
//       [field]: Math.max(1, parseFloat(prevStock[field]) + 1),
//     }));
//   };

//   const handleDecrement = (field) => {
//     setStock((prevStock) => ({
//       ...prevStock,
//       [field]: Math.max(1, parseFloat(prevStock[field]) - 1),
//     }));
//   };

//   // Form submission handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (stock.quantity < 1 || stock.currentPrice < 1) {
//       setError('Quantity and Current Price must be greater than zero');
//       return;
//     }

//     const url = isEditMode
//       ?  `http://localhost:8080/api/stocks/${id}`
//       : `http://localhost:8080/api/stocks;`

//     const method = isEditMode ? 'PUT' : 'POST';

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(stock),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to ${isEditMode ? 'update' : 'add'} stock`);
//       }

//       navigate('/stocks');
//     } catch (error) {
//       console.error('Error submitting stock form:', error);
//     }
//   };

//   return (
//     <div className="pt-14 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-2xl md:text-3xl font-bold mb-5 text-center">
//           {isEditMode ? 'Edit Stock' : 'Add New Stock'}
//         </h1>
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           {/* Stock Name */}
//           <div className="flex flex-col md:flex-row items-center">
//             <label className="md:w-1/3 font-semibold mb-2 md:mb-0 md:mr-4">Stock Name</label>
//             <input
//               type="text"
//               name="name"
//               value={stock.name}
//               onChange={handleInputChange}
//               placeholder="Stock Name"
//               className="p-2 border rounded w-full md:w-2/3"
//               required
//             />
//           </div>

//           {/* Ticker */}
//           <div className="flex flex-col md:flex-row items-center">
//             <label className="md:w-1/3 font-semibold mb-2 md:mb-0 md:mr-4">Ticker</label>
//             <input
//               type="text"
//               name="ticker"
//               value={stock.ticker}
//               onChange={handleInputChange}
//               placeholder="Ticker"
//               className="p-2 border rounded w-full md:w-2/3"
//               required
//             />
//           </div>

//           {/* Quantity */}
//           <div className="flex flex-col md:flex-row items-center">
//             <label className="md:w-1/3 font-semibold mb-2 md:mb-0 md:mr-4">Quantity</label>
//             <div className="flex items-center w-full md:w-2/3 border rounded p-1">
//               <button
//                 type="button"
//                 onClick={() => handleDecrement('quantity')}
//                 className="px-4 py-2 text-gray-600"
//               >
//                 -
//               </button>
//               <input
//                 type="number"
//                 name="quantity"
//                 value={stock.quantity}
//                 onChange={handleInputChange}
//                 className="w-full text-center border-0 focus:ring-0 no-spinner outline-none"
//                 required
//                 min="1"
//               />
//               <button
//                 type="button"
//                 onClick={() => handleIncrement('quantity')}
//                 className="px-4 py-2 text-gray-600"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Current Price */}
//           <div className="flex flex-col md:flex-row items-center">
//             <label className="md:w-1/3 font-semibold mb-2 md:mb-0 md:mr-4">Current Price</label>
//             <input
//               type="number"
//               name="currentPrice"
//               value={stock.currentPrice || ''}
//               readOnly
//               className="p-2 border rounded w-full md:w-2/3 bg-gray-100"
//             />
//           </div>

//           {/* Submit Button */}
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <button
//             type="submit"
//             className="bg-green-500 text-white py-2 px-4 rounded w-full md:w-full"
//           >
//             {isEditMode ? 'Save Changes' : 'Add Stock'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StockForm;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StockForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stock, setStock] = useState({
    name: '',
    ticker: '',
    quantity: 1,
    currentPrice: 0,
  });

  const [error, setError] = useState('');
  const isEditMode = Boolean(id);

  // Fetch stock details if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchStock = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/stocks/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch stock details');
          }
          const data = await response.json();
          setStock(data);
        } catch (error) {
          console.error('Error fetching stock details:', error);
        }
      };

      fetchStock();
    }
  }, [id, isEditMode]);

  // Fetch current price when ticker changes
  useEffect(() => {
    if (stock.ticker.trim()) {
      const fetchStockPrice = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/stocks/real-time-price/${stock.ticker}`);
          if (!response.ok) {
            throw new Error('Failed to fetch stock price');
          }
          const data = await response.json();
          setStock((prevStock) => ({
            ...prevStock,
            currentPrice: data,
          }));
        } catch (error) {
          console.error('Error fetching stock price:', error);
        }
      };

      fetchStockPrice();
    }
  }, [stock.ticker]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'quantity') {
      const numericValue = parseFloat(value);
      if (numericValue < 1 || isNaN(numericValue)) {
        setError('Quantity must be greater than zero');
        return;
      }
      setError('');
    }

    setStock({ ...stock, [name]: value });
  };

  // Increment/decrement handlers
  const handleIncrement = (field) => {
    setStock((prevStock) => ({
      ...prevStock,
      [field]: Math.max(1, parseFloat(prevStock[field]) + 1),
    }));
  };

  const handleDecrement = (field) => {
    setStock((prevStock) => ({
      ...prevStock,
      [field]: Math.max(1, parseFloat(prevStock[field]) - 1),
    }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (stock.quantity < 1 || stock.currentPrice < 1) {
      setError('Quantity and Current Price must be greater than zero');
      return;
    }

    const url = isEditMode
      ? `${process.env.REACT_APP_API_URL}/api/stocks/${id}`
      : `${process.env.REACT_APP_API_URL}/api/stocks`;

    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stock),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditMode ? 'update' : 'add'} stock`);
      }

      navigate('/stocks');
    } catch (error) {
      console.error('Error submitting stock form:', error);
    }
  };

  return (
    <div className="pt-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-5 text-center text-green-600">
          {isEditMode ? 'Edit Stock' : 'Add New Stock'}
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Stock Name */}
          <div className="flex flex-col md:flex-row items-center">
            <label className="md:w-1/3 font-semibold mb-2 md:mb-0 md:mr-4">Stock Name</label>
            <input
              type="text"
              name="name"
              value={stock.name}
              onChange={handleInputChange}
              placeholder="Stock Name"
              className="p-2 border rounded w-full md:w-2/3"
              required
            />
          </div>

          {/* Ticker */}
          <div className="flex flex-col md:flex-row items-center">
            <label className="md:w-1/3 font-semibold mb-2 md:mb-0 md:mr-4">Ticker</label>
            <input
              type="text"
              name="ticker"
              value={stock.ticker}
              onChange={handleInputChange}
              placeholder="Ticker"
              className="p-2 border rounded w-full md:w-2/3"
              required
            />
          </div>

          {/* Quantity */}
          <div className="flex flex-col md:flex-row items-center">
            <label className="md:w-1/3 font-semibold mb-2 md:mb-0 md:mr-4">Quantity</label>
            <div className="flex items-center w-full md:w-2/3 border rounded p-1">
              <button
                type="button"
                onClick={() => handleDecrement('quantity')}
                className="px-4 py-2 text-gray-600"
              >
                -
              </button>
              <input
                type="number"
                name="quantity"
                value={stock.quantity}
                onChange={handleInputChange}
                className="w-full text-center border-0 focus:ring-0 no-spinner outline-none"
                required
                min="1"
              />
              <button
                type="button"
                onClick={() => handleIncrement('quantity')}
                className="px-4 py-2 text-gray-600"
              >
                +
              </button>
            </div>
          </div>

          {/* Current Price */}
          <div className="flex flex-col md:flex-row items-center">
            <label className="md:w-1/3 font-semibold mb-2 md:mb-0 md:mr-4">Current Price</label>
            <input
              type="number"
              name="currentPrice"
              value={stock.currentPrice || ''}
              readOnly
              className="p-2 border rounded w-full md:w-2/3 bg-gray-100"
            />
          </div>

          {/* Submit Button */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded w-full md:w-full"
          >
            {isEditMode ? 'Save Changes' : 'Add Stock'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StockForm;