import PortfolioSummary from "@/components/Dashboard/PortfolioSummary";
import QuickTrade from "@/components/Dashboard/QuickTrade";
import TransactionHistory from "@/components/Dashboard/TransactionHistory";
import Watchlist from "@/components/Dashboard/Watchlist";
import Footer from "@/components/layout/Footer";
import LiveStockPrice from "@/components/trading/LiveStockPrice";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-indigo-200 dark:border-indigo-800 pb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800 dark:text-indigo-400 mb-2 sm:mb-0">
            Dashboard
          </h1>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Portfolio Summary */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-indigo-50 dark:border-indigo-900 transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">
                Portfolio Summary
              </h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-200" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
            </div>
            <div className="p-5">
              <PortfolioSummary />
            </div>
          </div>

          {/* Quick Trade */}
          <div className="col-span-1 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-indigo-50 dark:border-indigo-900 transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">
                Quick Trade
              </h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-200" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="p-5">
              <QuickTrade />
            </div>
          </div>

          {/* Watchlist */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-indigo-50 dark:border-indigo-900 transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">
                Watchlist
              </h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="p-5">
              <Watchlist />
            </div>
          </div>

          {/* Live Stock Prices */}
          <div className="col-span-1 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-indigo-50 dark:border-indigo-900 transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">
                NVDA
              </h2>
              <div className="text-sm text-purple-200">Live Stock</div>
            </div>
            <div className="p-5">
              <LiveStockPrice symbol={"NVDA"} />
            </div>
          </div>

          <div className="col-span-1 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-indigo-50 dark:border-indigo-900 transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">
                AAPL
              </h2>
              <div className="text-sm text-purple-200">Live Stock</div>
            </div>
            <div className="p-5">
              <LiveStockPrice symbol={"AAPL"} />
            </div>
          </div>

          <div className="col-span-1 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-indigo-50 dark:border-indigo-900 transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">
                GOOGL
              </h2>
              <div className="text-sm text-purple-200">Live Stock</div>
            </div>
            <div className="p-5">
              <LiveStockPrice symbol={"GOOGL"} />
            </div>
          </div>

          {/* Transaction History */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-indigo-50 dark:border-indigo-900 transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">
                Transaction History
              </h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-200" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="p-5">
              <TransactionHistory />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Footer/>
      </div>
    </div>
  );
}
