import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import { watchlistState } from "../store/watchlistAtom";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import StockSearch from "@/components/Dashboard/StockSearch";

export default function MarketOverviewPage() {
  const { data: session } = useSession();
  const watchlist = useRecoilValue(watchlistState);
  const [marketData, setMarketData] = useState<{ [key: string]: number[] }>({});
  const [timeLabels, setTimeLabels] = useState<string[]>([]);
  const [marketIndex, setMarketIndex] = useState<{ name: string, value: number, change: number }[]>([
    { name: "S&P 500", value: 5328.27, change: 0.28 },
    { name: "Nasdaq", value: 16748.33, change: 0.43 },
    { name: "Dow Jones", value: 38799.50, change: -0.12 },
    { name: "Russell 2000", value: 2079.56, change: 0.16 }
  ]);
  const [userName, setUserName] = useState("Trader");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [mostActive, setMostActive] = useState([]);

  // Set user name from session
  useEffect(() => {
    if (session?.user?.name) {
      const firstName = session.user.name.split(' ')[0];
      setUserName(firstName);
    }
  }, [session]);

  // Fetch market data
  const fetchMarketData = async () => {
    try {
      setIsLoading(true);
      // Simulated API fetching - replace with your fake simulation API
      const response = await fetch("/api/market");
      const data = await response.json();

      const newMarketData: { [key: string]: number[] } = {};
      const timestamps: string[] = [];

      watchlist.forEach((stock) => {
        newMarketData[stock.symbol] = data[stock.symbol] || [];
      });

      if (data.timestamps) {
        timestamps.push(...data.timestamps);
      }

      setMarketData(newMarketData);
      setTimeLabels(timestamps);

      // Generate mock data for top gainers, losers and most active
      generateMockMarketData();
    } catch (error) {
      console.error("Error fetching market data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate mock data for market trends
  const generateMockMarketData = () => {
    // Mock top gainers
    const gainers = [
      { symbol: "NVDA", name: "NVIDIA Corporation", price: 946.52, change: 7.48, percentChange: 8.42 },
      { symbol: "MSTR", name: "MicroStrategy Inc", price: 1458.06, change: 88.89, percentChange: 6.49 },
      { symbol: "AMD", name: "Advanced Micro Devices", price: 175.57, change: 8.92, percentChange: 5.35 },
      { symbol: "TSLA", name: "Tesla, Inc.", price: 193.57, change: 6.74, percentChange: 3.61 },
      { symbol: "AAPL", name: "Apple Inc.", price: 192.53, change: 4.21, percentChange: 2.24 }
    ];

    // Mock top losers
    const losers = [
      { symbol: "META", name: "Meta Platforms, Inc.", price: 482.34, change: -18.62, percentChange: -3.72 },
      { symbol: "PYPL", name: "PayPal Holdings, Inc.", price: 62.38, change: -2.19, percentChange: -3.39 },
      { symbol: "INTC", name: "Intel Corporation", price: 30.16, change: -0.83, percentChange: -2.68 },
      { symbol: "NFLX", name: "Netflix, Inc.", price: 628.50, change: -14.31, percentChange: -2.23 },
      { symbol: "BAC", name: "Bank of America Corp", price: 38.25, change: -0.77, percentChange: -1.97 }
    ];

    // Mock most active
    const active = [
      { symbol: "AAPL", name: "Apple Inc.", price: 192.53, change: 4.21, percentChange: 2.24, volume: "84.51M" },
      { symbol: "TSLA", name: "Tesla, Inc.", price: 193.57, change: 6.74, percentChange: 3.61, volume: "71.34M" },
      { symbol: "AMD", name: "Advanced Micro Devices", price: 175.57, change: 8.92, percentChange: 5.35, volume: "62.88M" },
      { symbol: "NVDA", name: "NVIDIA Corporation", price: 946.52, change: 7.48, percentChange: 8.42, volume: "51.62M" },
      { symbol: "INTC", name: "Intel Corporation", price: 30.16, change: -0.83, percentChange: -2.68, volume: "49.75M" }
    ];

    setTopGainers(gainers);
    setTopLosers(losers);
    setMostActive(active);
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [watchlist]);

  // Handle timeframe change
  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
    // In a real app, you would fetch new data based on timeframe
    fetchMarketData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Top navigation bar */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-indigo-700 dark:text-indigo-400">
                <span className="text-accent">V</span>broker
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                Dashboard
              </Link>
              <Link href="/marketoverview" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium border-b-2 border-indigo-500">
                Markets
              </Link>
              <Link href="/portfolio" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                Portfolio
              </Link>
              <Link href="/orders" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                Orders
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 px-3 py-1.5 rounded-full text-sm">
                <span className="hidden sm:inline">Balance: </span>${session?.user?.funds || 10000}
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                  {userName?.charAt(0) || 'T'}
                </div>
                <span className="hidden md:inline font-medium">{userName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6">
        {/* Market Overview Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Market Overview
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Track global markets and trends
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {['1D', '1W', '1M', '3M', '1Y', 'YTD'].map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => handleTimeframeChange(timeframe)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                      selectedTimeframe === timeframe
                        ? 'bg-indigo-600 text-white'
                        : 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    } transition-colors`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Market Indices */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {marketIndex.map((index) => (
            <div key={index.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400 text-sm mb-1">{index.name}</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">{index.value.toLocaleString()}</span>
                <div className={`flex items-center mt-1 ${index.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  <span className="text-sm font-medium">
                    {index.change >= 0 ? '+' : ''}{index.change}% {index.change >= 0 ? '↑' : '↓'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Market Trends & Watchlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Watchlist with Charts */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">Your Watchlist</h2>
                <Link href="/dashboard" className="text-xs text-indigo-200 hover:text-white bg-indigo-700/50 px-2 py-1 rounded transition-colors">
                  Manage Watchlist
                </Link>
              </div>
              <div className="p-4">
                {isLoading ? (
                  <div className="flex justify-center py-16">
                    <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-indigo-500 rounded-full animate-spin"></div>
                  </div>
                ) : watchlist.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">No stocks in your watchlist.</p>
                    <Link 
                      href="/dashboard"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Add Stocks to Watchlist
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {watchlist.map((stock) => (
                      <div key={stock.symbol} className="border-b border-gray-100 dark:border-gray-700 pb-8 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{stock.symbol}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{stock.price}</p>
                            <p className={`text-sm ${stock.change?.includes?.('-') ? 'text-red-500' : 'text-green-500'}`}>
                              {stock.change}
                            </p>
                          </div>
                        </div>
                        <div className="h-56">
                          {marketData[stock.symbol] && (
                            <Line
                              data={{
                                labels: timeLabels.length > 0 ? timeLabels : Array(10).fill('').map((_, i) => i.toString()),
                                datasets: [
                                  {
                                    label: `${stock.symbol} Price`,
                                    data: marketData[stock.symbol].length > 0 ? marketData[stock.symbol] : Array(10).fill(0).map(() => Math.random() * 100 + 100),
                                    borderColor: stock.change?.includes?.('-') ? "rgb(239, 68, 68)" : "rgb(34, 197, 94)",
                                    backgroundColor: stock.change?.includes?.('-') ? "rgba(239, 68, 68, 0.1)" : "rgba(34, 197, 94, 0.1)",
                                    tension: 0.4,
                                    fill: true,
                                    pointRadius: 0,
                                    borderWidth: 2
                                  },
                                ],
                              }}
                              options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                  legend: {
                                    display: false,
                                  },
                                  tooltip: {
                                    mode: 'index',
                                    intersect: false,
                                  },
                                },
                                scales: {
                                  x: {
                                    grid: {
                                      display: false,
                                    },
                                    ticks: {
                                      color: 'gray',
                                    },
                                  },
                                  y: {
                                    position: 'right',
                                    grid: {
                                      color: 'rgba(156, 163, 175, 0.1)',
                                    },
                                    ticks: {
                                      callback: (value) => `$${value}`,
                                      color: 'gray',
                                    },
                                  },
                                },
                              }}
                            />
                          )}
                        </div>
                        <div className="flex justify-end mt-4 space-x-2">
                          <Link 
                            href={`/portfolio?symbol=${stock.symbol}`} 
                            className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                          >
                            Buy
                          </Link>
                          <Link 
                            href={`/portfolio?symbol=${stock.symbol}&action=sell`} 
                            className="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                          >
                            Sell
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Market Trends - Top Gainers, Losers, etc. */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Stock Search */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                  <h2 className="text-lg font-semibold text-white">Search Stocks</h2>
                </div>
                <div className="p-4">
                  <StockSearch />
                </div>
              </div>

              {/* Top Gainers */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-4">
                  <h2 className="text-lg font-semibold text-white">Top Gainers</h2>
                </div>
                <div className="p-0">
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {topGainers.map((stock) => (
                      <div key={stock.symbol} className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{stock.symbol}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900 dark:text-white">${stock.price.toFixed(2)}</div>
                          <div className="text-xs text-green-500">+{stock.percentChange}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Losers */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-4">
                  <h2 className="text-lg font-semibold text-white">Top Losers</h2>
                </div>
                <div className="p-0">
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {topLosers.map((stock) => (
                      <div key={stock.symbol} className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{stock.symbol}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900 dark:text-white">${stock.price.toFixed(2)}</div>
                          <div className="text-xs text-red-500">{stock.percentChange}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Most Active */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4">
                  <h2 className="text-lg font-semibold text-white">Most Active</h2>
                </div>
                <div className="p-0">
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {mostActive.map((stock) => (
                      <div key={stock.symbol} className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{stock.symbol}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Vol: {stock.volume}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900 dark:text-white">${stock.price.toFixed(2)}</div>
                          <div className={`text-xs ${stock.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {stock.percentChange >= 0 ? '+' : ''}{stock.percentChange}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
