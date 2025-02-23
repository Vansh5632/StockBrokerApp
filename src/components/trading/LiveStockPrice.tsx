import { useState, useEffect } from "react";

interface StockData {
  symbol: string;
  price: number;
  change: number;
  percentChange: string;
}

interface LiveStockPriceProps {
  symbol: string;
}

const mockStockData: StockData[] = [
  {
    symbol: "AAPL",
    price: 150.25,
    change: 2.34,
    percentChange: "1.58%",
  },
  {
    symbol: "TSLA",
    price: 800.00,
    change: -5.00,
    percentChange: "-0.62%",
  },
  {
    symbol: "AMZN",
    price: 3500.00,
    change: 10.00,
    percentChange: "0.29%",
  },
  {
    symbol: "MSFT",
    price: 300.00,
    change: -1.50,
    percentChange: "-0.50%",
  },
  {
    symbol: "GOOGL",
    price: 2805.50,
    change: 2.50,
    percentChange: "0.09%",
  },
  {
    symbol: "FB",
    price: 355.64,
    change: 4.50,
    percentChange: "1.28%",
  },
  {
    symbol: "NFLX",
    price: 590.65,
    change: -6.50,
    percentChange: "-1.09%",
  },
  {
    symbol: "NVDA",
    price: 220.50,
    change: 7.00,
    percentChange: "3.28%",
  },
  {
    symbol: "BABA",
    price: 160.00,
    change: -3.00,
    percentChange: "-1.85%",
  },
  {
    symbol: "INTC",
    price: 55.00,
    change: 0.50,
    percentChange: "0.91%",
  },
];

export default function LiveStockPrice({ symbol }: LiveStockPriceProps) {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStockData() {
      try {
        let data;
        if (process.env.NODE_ENV === "development") {
          data = mockStockData.find(stock => stock.symbol === symbol);
          if (!data) {
            throw new Error("Stock data not found");
          }
        } else {
          const response = await fetch(`/api/marketData?symbol=${symbol}`);
          data = await response.json();

          if (data.error) {
            console.log("Error fetching stock data:", data.error);
            setError(data.error);
            return;
          }
        }

        setStockData(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStockData();
    const interval = setInterval(fetchStockData, 30000);
    return () => clearInterval(interval);
  }, [symbol]);

  if (loading) return <div className="animate-pulse p-6 bg-gray-50 rounded-lg">Loading...</div>;
  if (error) return <div className="p-6 bg-red-50 rounded-lg text-red-600 font-medium">{error}</div>;
  if (!stockData || stockData.price == null) 
    return <div className="p-6 bg-gray-50 rounded-lg text-gray-500">Stock data not available</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">{stockData.symbol}</h3>
        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
          Live
        </span>
      </div>
      
      <div className="space-y-3">
        <p className="text-3xl font-bold text-gray-900">
          ${stockData.price.toFixed(2)}
        </p>
        
        <div className="flex items-center space-x-2">
          <span className={`flex items-center ${stockData.change >= 0 ? "text-green-600" : "text-red-600"}`}>
            {stockData.change >= 0 ? "↑" : "↓"}
            <span className="ml-1 font-semibold">
              ${Math.abs(stockData.change).toFixed(2)}
            </span>
          </span>
          <span className={`font-medium ${stockData.change >= 0 ? "text-green-600" : "text-red-600"}`}>
            ({stockData.percentChange})
          </span>
        </div>
      </div>
    </div>
  );
}
