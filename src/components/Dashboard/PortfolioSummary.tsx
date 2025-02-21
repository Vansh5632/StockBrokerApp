import { useRecoilValue } from "recoil";
import { portfolioState } from "../../store/portfolioAtom";

export default function PortfolioSummary() {
    const portfolio = useRecoilValue(portfolioState);
    return(
        <div className="bg-white p-4 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Portfolio Summary</h2>
            <p className="text-gray-700">Total Funds: ${portfolio.funds.toLocaleString()}</p>
        </div>
    )
}