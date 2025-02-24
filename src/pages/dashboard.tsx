import PortfolioSummary from "@/components/Dashboard/PortfolioSummary";
import QuickTrade from "@/components/Dashboard/QuickTrade";
import TransactionHistory from "@/components/Dashboard/TransactionHistory";
import Watchlist from "@/components/Dashboard/Watchlist";
import LiveStockPrice from "@/components/trading/LiveStockPrice";

export default function Dashboard() {
  return (
    <div>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-8 text-gray-900">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Portfolio Summary */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Portfolio Summary
              </h2>
              <PortfolioSummary />
            </div>
          </div>

          {/* Quick Trade */}
          <div className="col-span-1 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Trade
              </h2>
              <QuickTrade />
            </div>
          </div>

          {/* Watchlist */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Watchlist
              </h2>
              <Watchlist />
            </div>
          </div>

          {/* Live Stock Prices */}
          <div className="col-span-1 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Live Stock Price (NVDA)
              </h2>
              <LiveStockPrice symbol={"NVDA"} />
            </div>
          </div>

          <div className="col-span-1 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Live Stock Price (AAPL)
              </h2>
              <LiveStockPrice symbol={"AAPL"} />
            </div>
          </div>

          <div className="col-span-1 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Live Stock Price (GOOGL)
              </h2>
              <LiveStockPrice symbol={"GOOGL"} />
            </div>
          </div>

          {/* Transaction History */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Transaction History
              </h2>
              <TransactionHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
