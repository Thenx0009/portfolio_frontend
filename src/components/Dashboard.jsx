import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto"; 

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalValue: 0,
    topStock: "",
    distribution: {},
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://portfolio-backend-latest-xngv.onrender.com/api/stocks/dashboard"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const data = await response.json();

        // Determine top-performing stock from distribution
        let maxPerformance = 0;
        let bestStock = "";
        Object.entries(data.distribution).forEach(([stock, performance]) => {
          if (performance > maxPerformance) {
            maxPerformance = performance;
            bestStock = stock;
          }
        });

        // Update state with fetched data
        setDashboardData({
          totalValue: data.totalValue,
          topStock: bestStock,
          distribution: data.distribution,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // End loading state
      }
    };

    fetchData();
  }, []);

  // Prepare data for the pie chart
  const chartData = {
    labels: Object.keys(dashboardData.distribution),
    datasets: [
      {
        label: "Stock Distribution",
        data: Object.values(dashboardData.distribution),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div className="px-4 py-8 md:px-12">
      <div className="w-full bg-gray-100 rounded-2xl mx-auto mt-10 flex flex-col items-center justify-center p-6 md:p-10 shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-6">
          Portfolio Dashboard
        </h1>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-12 w-full">
          {/* Left Side */}
          <div className="flex flex-col md:flex-row lg:flex-col md:items-center gap-6 w-full lg:w-1/2 mx-auto">
            {/* Total Value Card */}
            <div className="bg-white shadow-md rounded-lg w-full md:w-72 lg:w-80 p-6 text-center transition transform hover:scale-105">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
                </div>
              ) : (
                <>
                  <p className="text-lg font-medium text-gray-700">
                    Total Portfolio Value
                  </p>
                  <p className="text-2xl md:text-3xl font-semibold text-green-500 mt-4">
                    ${dashboardData.totalValue.toFixed(2)}
                  </p>
                </>
              )}
            </div>

            {/* Top Stock Card */}
            <div className="bg-white shadow-md rounded-lg w-full md:w-72 lg:w-80 p-6 text-center transition transform hover:scale-105">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
                </div>
              ) : (
                <>
                  <p className="text-lg font-medium text-gray-700">
                    Top Performing Stock
                  </p>
                  <p className="text-2xl md:text-3xl font-semibold text-blue-500 mt-4">
                    {dashboardData.topStock}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Right Side (Pie Chart) */}
          <div className="py-8 px-6 bg-white shadow-2xl rounded-2xl w-full lg:w-1/2">
            <div className="w-full md:w-[50%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-64 bg-gray-300 rounded w-full"></div>
                </div>
              ) : (
                <Pie data={chartData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;