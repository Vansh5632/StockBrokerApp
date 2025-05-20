import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { portfolioState } from "@/store/portfolioAtom";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import TradeForm from "@/components/trading/TradeForm";
import Portfolio from "@/components/trading/Portfolio";

// Define types for our stock and user
interface Stock {
  symbol: string;
  name?: string;
  quantity?: number;
  purchasePrice?: number;
  currentPrice?: number;
}

interface ExtendedUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  funds?: number;
}

export default function PortfolioPage() {
  const { data: session } = useSession();
  const [portfolio, setPortfolio] = useRecoilState(portfolioState);
  const [userName, setUserName] = useState("Trader");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("holdings");
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  
  // Ensure we have an array to work with for calculations
  const holdings = Array.isArray(portfolio.holdings) ? portfolio.holdings : [];
  
  // Calculate portfolio metrics
  const totalValue = holdings.reduce((total, stock) => 
    total + ((stock.currentPrice || 0) * (stock.quantity || 0)), 0);
  const totalGainLoss = holdings.reduce((total, stock) => 
    total + (((stock.currentPrice || 0) - (stock.purchasePrice || 0)) * (stock.quantity || 0)), 0);
  const percentageChange = totalValue > 0 
    ? ((totalGainLoss / (totalValue - totalGainLoss)) * 100).toFixed(2) 
    : "0.00";
  
  useEffect(() => {
    if (session?.user?.name) {
      const firstName = session.user.name.split(' ')[0];
      setUserName(firstName);
    }
    
    // Fetch portfolio data
    const fetchPortfolio = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/portfolio");
        if (response.ok) {
          const data = await response.json();
          setPortfolio(data);
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPortfolio();
  }, [session, setPortfolio]);
  
  const handleTradeClick = (stock: Stock) => {
    setSelectedStock(stock);
    setShowTradeModal(true);
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
              <Link href="/marketoverview" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                Markets
              </Link>
              <Link href="/portfolio" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium border-b-2 border-indigo-500">
                Portfolio
              </Link>
              <Link href="/orders" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                Orders
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 px-3 py-1.5 rounded-full text-sm">
                <span className="hidden sm:inline">Balance: </span>${(session?.user as ExtendedUser)?.funds || 10000}
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
        {/* Portfolio Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Your Portfolio
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Track and manage your investments
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                onClick={() => {
                  setSelectedStock(null);
                  setShowTradeModal(true);
                }}
                className="px-5 py-2.5 bg-secondary hover:bg-secondary/90 text-white rounded-lg font-medium transition-colors shadow-sm"
              >
                New Trade
              </button>
            </div>
          </div>
        </div>
        
        {/* Portfolio Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4">
            <h2 className="text-lg font-semibold text-white">Portfolio Overview</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Total Value</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalValue.toFixed(2)}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Total Gain/Loss</h3>
                <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ${totalGainLoss.toFixed(2)}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Performance</h3>
                <p className={`text-2xl font-bold ${parseFloat(percentageChange) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {percentageChange}% {parseFloat(percentageChange) >= 0 ? '↑' : '↓'}
                </p>
              </div>
            </div>
            
            {/* Portfolio Distribution Chart would go here */}
            <div className="mt-6 h-80 bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Portfolio Distribution Chart (Coming Soon)</p>
            </div>
          </div>
        </div>
        
        {/* Portfolio Holdings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-100 dark:border-gray-700">
            <div className="flex">
              <button 
                onClick={() => setActiveTab("holdings")}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === "holdings" 
                    ? "bg-gray-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500"
                    : "text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                Holdings
              </button>
              <button 
                onClick={() => setActiveTab("transactions")}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === "transactions" 
                    ? "bg-gray-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500"
                    : "text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                Transactions
              </button>
            </div>
          </div>
          
          <div className="p-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-indigo-500 rounded-full animate-spin"></div>
              </div>
            ) : activeTab === "holdings" ? (
              <div>
                {holdings.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Symbol</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Avg. Price</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Price</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Gain/Loss</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {holdings.map((stock) => {
                          const purchasePrice = stock.purchasePrice || 0;
                          const currentPrice = stock.currentPrice || 0;
                          const quantity = stock.quantity || 0;
                          const value = currentPrice * quantity;
                          const gainLoss = (currentPrice - purchasePrice) * quantity;
                          const percentChange = purchasePrice > 0
                            ? ((currentPrice - purchasePrice) / purchasePrice * 100).toFixed(2)
                            : "0.00";
                          
                          return (
                            <tr key={stock.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{stock.symbol}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{quantity}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${purchasePrice.toFixed(2)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${currentPrice.toFixed(2)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${value.toFixed(2)}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className={`text-sm ${gainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                  ${gainLoss.toFixed(2)} ({percentChange}%)
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button 
                                  onClick={() => handleTradeClick(stock)}
                                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                                >
                                  Trade
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 dark:text-gray-500 mb-2">No stocks in your portfolio</div>
                    <button 
                      onClick={() => {
                        setSelectedStock(null);
                        setShowTradeModal(true);
                      }}
                      className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                    >
                      Start Trading
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="text-center py-12">
                  <div className="text-gray-400 dark:text-gray-500">Transaction history will appear here</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Trade Modal */}
      {showTradeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedStock ? `Trade ${selectedStock.symbol}` : 'New Trade'}
              </h3>
              <button 
                onClick={() => setShowTradeModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <TradeForm 
              stock={selectedStock} 
              onComplete={() => {
                setShowTradeModal(false);
                // Refresh portfolio data after trade
                fetch("/api/portfolio")
                  .then(response => response.json())
                  .then(data => setPortfolio(data))
                  .catch(error => console.error("Error refreshing portfolio:", error));
              }} 
            />
          </div>
        </div>
      )}
      
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}