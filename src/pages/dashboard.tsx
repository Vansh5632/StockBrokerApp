import PortfolioSummary from "@/components/Dashboard/PortfolioSummary";
import QuickTrade from "@/components/Dashboard/QuickTrade";
import TransactionHistory from "@/components/Dashboard/TransactionHistory";
import Watchlist from "@/components/Dashboard/Watchlist";
import Footer from "@/components/layout/Footer";
import LiveStockPrice from "@/components/trading/LiveStockPrice";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-indigo-800 border-b pb-3 border-indigo-200">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Portfolio Summary */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-white shadow-lg rounded-xl overflow-hidden border border-indigo-50 transition-transform hover:scale-[1.01] hover:shadow-xl">
            <div className="bg-indigo-600 p-3">
              <h2 className="text-lg font-semibold text-white">
                Portfolio Summary
              </h2>
            </div>
            <div className="p-5">
              <PortfolioSummary />
            </div>
          </div>

          {/* Quick Trade */}
          <div className="col-span-1 bg-white shadow-lg rounded-xl overflow-hidden border border-indigo-50 transition-transform hover:scale-[1.01] hover:shadow-xl">
            <div className="bg-emerald-600 p-3">
              <h2 className="text-lg font-semibold text-white">
                Quick Trade
              </h2>
            </div>
            <div className="p-5">
              <QuickTrade />
            </div>
          </div>

          {/* Watchlist */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-white shadow-lg rounded-xl overflow-hidden border border-indigo-50 transition-transform hover:scale-[1.01] hover:shadow-xl">
            <div className="bg-blue-600 p-3">
              <h2 className="text-lg font-semibold text-white">
                Watchlist
              </h2>
            </div>
            <div className="p-5">
              <Watchlist />
            </div>
          </div>

          {/* Live Stock Prices */}
          <div className="col-span-1 bg-white shadow-lg rounded-xl overflow-hidden border border-indigo-50 transition-transform hover:scale-[1.01] hover:shadow-xl">
            <div className="bg-purple-600 p-3">
              <h2 className="text-lg font-semibold text-white">
                Live Stock Price (NVDA)
              </h2>
            </div>
            <div className="p-5">
              <LiveStockPrice symbol={"NVDA"} />
            </div>
          </div>

          <div className="col-span-1 bg-white shadow-lg rounded-xl overflow-hidden border border-indigo-50 transition-transform hover:scale-[1.01] hover:shadow-xl">
            <div className="bg-purple-600 p-3">
              <h2 className="text-lg font-semibold text-white">
                Live Stock Price (AAPL)
              </h2>
            </div>
            <div className="p-5">
              <LiveStockPrice symbol={"AAPL"} />
            </div>
          </div>

          <div className="col-span-1 bg-white shadow-lg rounded-xl overflow-hidden border border-indigo-50 transition-transform hover:scale-[1.01] hover:shadow-xl">
            <div className="bg-purple-600 p-3">
              <h2 className="text-lg font-semibold text-white">
                Live Stock Price (GOOGL)
              </h2>
            </div>
            <div className="p-5">
              <LiveStockPrice symbol={"GOOGL"} />
            </div>
          </div>

          {/* Transaction History */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white shadow-lg rounded-xl overflow-hidden border border-indigo-50 transition-transform hover:scale-[1.01] hover:shadow-xl">
            <div className="bg-amber-600 p-3">
              <h2 className="text-lg font-semibold text-white">
                Transaction History
              </h2>
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
