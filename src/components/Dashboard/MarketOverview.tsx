import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Define TypeScript interfaces
interface StockData {
  symbol: string;
  name: string;
  price: string | number;
  change: string | number;  // Updated to handle both string and number types
}

interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  tension: number;
  fill: boolean;
  pointRadius: number;
  borderWidth: number;
}

interface ChartDataType {
  labels: string[];
  datasets: ChartDataset[];
}

export default function MarketOverview() {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('1d');
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [chartData, setChartData] = useState<ChartDataType | null>(null);

  useEffect(() => {
    async function fetchStockData() {
      try {
        const response = await fetch(`/api/marketData`);
        const data = await response.json();

        if (data.error) {
          console.log("Error fetching stock data:", data.error);
          setError(data.error);
        } else {
          setStockData(data);
          if (data.length > 0 && !selectedStock) {
            setSelectedStock(data[0]);
            generateChartData(data[0], selectedTimeframe);
          }
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    }

    fetchStockData();
    const interval = setInterval(fetchStockData, 30000);
    return () => clearInterval(interval);
  }, [selectedTimeframe, selectedStock]);

  // Generate random chart data based on timeframe
  const generateChartData = (stock: StockData, timeframe: string) => {
    if (!stock) return;

    // Fix for TypeError: handle both string and number price types
    let basePrice: number;
    if (typeof stock.price === 'string') {
      basePrice = parseFloat(stock.price.replace(/[^\d.-]/g, ''));
    } else if (typeof stock.price === 'number') {
      basePrice = stock.price;
    } else {
      // Fallback in case price is in an unexpected format
      basePrice = 0;
      console.error('Unexpected price format:', stock.price);
    }
    
    let priceData: number[] = [];
    let labels: string[] = [];
    let volatility = 0;
    
    // Set different parameters based on timeframe
    switch(timeframe) {
      case '1d':
        // 1-day data with hourly points
        labels = Array.from({length: 7}, (_, i) => `${9 + i}:00`);
        volatility = 0.01;
        break;
      case '1w':
        // 1-week data with daily points
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        volatility = 0.03;
        break;
      case '1m':
        // 1-month data with weekly points
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        volatility = 0.05;
        break;
      case '3m':
        // 3-month data with bi-weekly points
        labels = Array.from({length: 6}, (_, i) => `Week ${i*2 + 1}-${i*2 + 2}`);
        volatility = 0.08;
        break;
      default:
        labels = Array.from({length: 7}, (_, i) => `${9 + i}:00`);
        volatility = 0.01;
    }
    
    // Generate random price movements
    let currentPrice = basePrice;
    priceData = labels.map(() => {
      const change = currentPrice * volatility * (Math.random() - 0.5);
      currentPrice += change;
      return currentPrice;
    });
    
    // Ensure the last price matches the current price
    priceData[priceData.length - 1] = basePrice;
    
    const trend = priceData[0] < priceData[priceData.length - 1] ? 'up' : 'down';
    
    // Set the chart data
    setChartData({
      labels,
      datasets: [
        {
          label: stock.symbol,
          data: priceData,
          borderColor: trend === 'up' ? 'rgba(52, 211, 153, 1)' : 'rgba(239, 68, 68, 1)',
          backgroundColor: trend === 'up' 
            ? 'rgba(52, 211, 153, 0.1)' 
            : 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 2,
          borderWidth: 2,
        }
      ]
    });
  };

  const handleStockSelect = (stock: StockData) => {
    setSelectedStock(stock);
    generateChartData(stock, selectedTimeframe);
  };

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
    if (selectedStock) {
      generateChartData(selectedStock, timeframe);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-800 dark:text-gray-300">Loading market data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-gray-800 dark:text-gray-300 mb-2">Error loading market data</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Market Overview</h2>
          <div className="flex space-x-2 text-xs">
            {['1d', '1w', '1m', '3m'].map(timeframe => (
              <button
                key={timeframe}
                onClick={() => handleTimeframeChange(timeframe)}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  selectedTimeframe === timeframe 
                    ? 'bg-white text-blue-600 font-semibold'
                    : 'bg-blue-700/50 hover:bg-blue-700/70'
                }`}
              >
                {timeframe.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Left side: Stock list */}
        <div className="md:col-span-1 border-r border-gray-100 dark:border-gray-700 max-h-[450px] overflow-y-auto scrollbar-hide">
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {stockData.map((stock) => (
              <li 
                key={stock.symbol} 
                className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  selectedStock && selectedStock.symbol === stock.symbol 
                    ? 'bg-blue-50 dark:bg-gray-700' 
                    : ''
                }`}
                onClick={() => handleStockSelect(stock)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{stock.symbol}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">{stock.price}</p>
                    <p className={`text-sm ${
                      // Fix for TypeError: handle both string and number change types
                      typeof stock.change === 'string' 
                        ? stock.change.includes("-") 
                        : stock.change < 0 
                          ? true 
                          : false
                        ? "text-red-500" 
                        : "text-green-500"
                    }`}>
                      {stock.change}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Right side: Chart & Details */}
        <div className="md:col-span-2 p-6">
          {selectedStock ? (
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedStock.symbol}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedStock.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedStock.price}</p>
                  <p className={`text-sm font-medium ${
                    // Fix for TypeError: handle both string and number change types
                    typeof selectedStock.change === 'string'
                      ? selectedStock.change.includes("-") 
                      : selectedStock.change < 0
                        ? true
                        : false
                      ? "text-red-500" 
                      : "text-green-500"
                  }`}>
                    {selectedStock.change} {
                      // Fix for arrow indicator based on change value
                      typeof selectedStock.change === 'string'
                        ? selectedStock.change.includes("-") 
                        : selectedStock.change < 0
                          ? true
                          : false
                        ? "↓" 
                        : "↑"
                    }
                  </p>
                </div>
              </div>
              
              {/* Chart */}
              <div className="h-64 mb-6">
                {chartData && (
                  <Line 
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          grid: {
                            display: false,
                            // Remove drawBorder property as it's not recognized
                            // drawBorder: false,
                          },
                          ticks: {
                            font: {
                              size: 10,
                            },
                            color: '#9CA3AF',
                          },
                        },
                        y: {
                          grid: {
                            color: 'rgba(156, 163, 175, 0.1)',
                            // Remove drawBorder property as it's not recognized
                            // drawBorder: false,
                          },
                          ticks: {
                            font: {
                              size: 10,
                            },
                            color: '#9CA3AF',
                            callback: function(tickValue: string | number) {
                              return '$' + (typeof tickValue === 'number' ? tickValue.toFixed(2) : parseFloat(tickValue).toFixed(2));
                            }
                          },
                        }
                      },
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          backgroundColor: 'rgba(17, 24, 39, 0.8)',
                          titleFont: {
                            size: 12,
                          },
                          bodyFont: {
                            size: 12,
                          },
                          padding: 10,
                          cornerRadius: 6,
                          callbacks: {
                            label: function(context) {
                              return `$${context.parsed.y.toFixed(2)}`;
                            }
                          }
                        }
                      },
                      elements: {
                        point: {
                          radius: 0,
                          hoverRadius: 5,
                        }
                      }
                    }}
                  />
                )}
              </div>
              
              {/* Additional market stats */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {Math.floor(Math.random() * 10000).toLocaleString()}K
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Market Cap</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${Math.floor(Math.random() * 1000).toLocaleString()}B
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">P/E Ratio</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {(Math.random() * 50 + 10).toFixed(2)}
                  </p>
                </div>
              </div>
              
              {/* Quick trade buttons */}
              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition-colors">
                  Buy
                </button>
                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition-colors">
                  Sell
                </button>
                <button className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-2 rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Select a stock to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}