// Ensure this path is correct
import MarketOverview from "@/components/Dashboard/MarketOverview";
import PortfolioSummary from "@/components/Dashboard/PortfolioSummary";
import QuickTrade from "@/components/Dashboard/QuickTrade";
import { RecoilRoot } from "recoil";

export default function Dashboard() {
  return (
    <RecoilRoot>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white shadow-md rounded-md p-4">
            <PortfolioSummary />
          </div>
          <div className="bg-white shadow-md rounded-md p-4">
            <MarketOverview />
          </div>
          <div className="bg-white shadow-md rounded-md p-4">
            <QuickTrade />
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}
