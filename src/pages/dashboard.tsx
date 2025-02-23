import MarketOverview from "@/components/Dashboard/MarketOverview";
import PortfolioSummary from "@/components/Dashboard/PortfolioSummary";
import QuickTrade from "@/components/Dashboard/QuickTrade";
import Watchlist from "@/components/Dashboard/Watchlist";
import LiveStockPrice from "@/components/trading/LiveStockPrice";
import { RecoilRoot } from "recoil";

export default function Dashboard() {
  return (
    <RecoilRoot>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="col-span-1 lg:col-span-2 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="p-6">
              <LiveStockPrice symbol={"GOOGL"} />
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="p-6">
              <PortfolioSummary />
            </div>
          </div>
          <div className="col-span-1 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="p-6">
              <MarketOverview />
            </div>
          </div>
          <div className="col-span-1 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="p-6">
              <QuickTrade />
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="p-6">
              <Watchlist />
            </div>
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}
