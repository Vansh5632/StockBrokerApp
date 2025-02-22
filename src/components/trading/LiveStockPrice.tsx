import { useState, useEffect } from "react";

export default function LiveStockPrice({ symbol }) {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStockData() {
      try {
        const response = await fetch(`/api/marketData?symbol=${symbol}`);
        const data = await response.json();

        if (data.error) throw new Error(data.error);

        setStockData(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStockData();

    // Refresh stock price every 30 seconds
    const interval = setInterval(fetchStockData, 30000);
    return () => clearInterval(interval);
  }, [symbol]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!stockData || stockData.price == null) return <p className="text-gray-500">Stock data not available</p>;

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow">
      <h3 className="text-lg font-semibold">{stockData.symbol}</h3>
      <p className="text-xl font-bold">${stockData.price?.toFixed(2)}</p>
      <p className={`text-sm ${stockData.change >= 0 ? "text-green-500" : "text-red-500"}`}>
        {stockData.change?.toFixed(2)} ({stockData.percentChange})
      </p>
    </div>
  );
}
