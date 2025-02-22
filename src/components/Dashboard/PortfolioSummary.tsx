import React from "react";
import * as Recoil from "recoil";
import { portfolioState } from "../../store/portfolioAtom";

export default function PortfolioSummary() {
    console.log("PortfolioSummary is rendering...");
    const portfolio = Recoil.useRecoilValue(portfolioState);
    return(
        <div className="bg-[#1E293B] p-6 rounded-2xl shadow-xl text-white">
            <h2 className="text-2xl font-bold mb-4">Portfolio Summary</h2>
            <div className="flex items-center justify-between mb-3">
                <span className="text-lg">Total Funds:</span>
                <span className="text-xl font-semibold">${portfolio.funds.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-sm">As of:</span>
                <span className="text-sm">{new Date().toLocaleDateString()}</span>
            </div>
        </div>
    )
}