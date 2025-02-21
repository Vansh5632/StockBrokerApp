// Ensure this path is correct
import PortfolioSummary from "@/components/Dashboard/PortfolioSummary";
import { RecoilRoot } from "recoil";
export default function Dashboard() { // Is this causing issues?

  return (
    <RecoilRoot>
      <div>
        <h1>Dashboard</h1>
        <PortfolioSummary/>
      </div>
    </RecoilRoot>
  );
}
