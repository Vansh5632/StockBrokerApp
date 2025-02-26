import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { portfolioState } from "../../store/portfolioAtom";
import { watchlistState } from "../../store/watchlistAtom";

export default function PortfolioSummary() {
    const portfolio = useRecoilValue(portfolioState);
    const watchlist = useRecoilValue(watchlistState);

    // Ensure portfolio data exists with safe defaults
    const holdings = portfolio?.holdings || [];
    const tradeHistory = portfolio?.tradeHistory || [];
    const funds = portfolio?.funds || 0;

    // Calculate total invested amount based on current holdings
    const totalInvested = useMemo(() => {
        if (!holdings.length) return 0;
        return holdings.reduce((sum, stock) => {
            return sum + (stock.quantity * stock.buyPrice);
        }, 0);
    }, [holdings]);

    // Calculate current portfolio value based on market price
    const currentValue = useMemo(() => {
        if (!holdings.length) return 0;
        return holdings.reduce((sum, stock) => {
            const marketStock = watchlist.find(s => s.symbol === stock.symbol);
            const currentPrice = marketStock ? marketStock.price : stock.buyPrice;
            return sum + (stock.quantity * currentPrice);
        }, 0);
    }, [holdings, watchlist]);

    // Calculate unrealized profit/loss (on current holdings)
    const unrealizedPL = useMemo(() => {
        if (!holdings.length) return 0;
        return holdings.reduce((sum, stock) => {
            const marketStock = watchlist.find(s => s.symbol === stock.symbol);
            const currentPrice = marketStock ? marketStock.price : stock.buyPrice;
            const costBasis = stock.buyPrice * stock.quantity;
            const marketValue = currentPrice * stock.quantity;
            return sum + (marketValue - costBasis);
        }, 0);
    }, [holdings, watchlist]);

    // Calculate realized profit/loss (from completed trades)
    const realizedPL = useMemo(() => {
        if (!tradeHistory.length) return 0;
        return tradeHistory.reduce((sum, trade) => {
            // Only count sell trades for realized P/L
            if (trade.type === "sell" && trade.sellPrice) {
                // Profit or loss per share
                const profitPerShare = trade.sellPrice - trade.buyPrice;
                // Total profit or loss for this trade
                return sum + (profitPerShare * trade.quantity);
            }
            return sum;
        }, 0);
    }, [tradeHistory]);

    // Calculate total P/L (realized + unrealized)
    const totalPL = useMemo(() => {
        return realizedPL + unrealizedPL;
    }, [realizedPL, unrealizedPL]);

    // Calculate portfolio performance (percentage return)
    const portfolioPerformance = useMemo(() => {
        const totalInvestment = totalInvested + realizedPL;
        if (totalInvestment <= 0) return 0;
        return ((currentValue - totalInvestment) / totalInvestment) * 100;
    }, [currentValue, totalInvested, realizedPL]);

    // Debug output
    console.log("Portfolio calculations:", {
        holdings: holdings.length,
        trades: tradeHistory.length,
        funds,
        totalInvested,
        currentValue,
        unrealizedPL,
        realizedPL
    });

    return (
        <div className="bg-gray-800 text-white p-4 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Portfolio Summary</h2>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Available Funds</p>
                    <p className="text-xl font-bold">${funds.toLocaleString()}</p>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Current Holdings Value</p>
                    <p className="text-xl font-bold">${currentValue.toFixed(2)}</p>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Total Invested</p>
                    <p className="text-xl font-bold">${totalInvested.toFixed(2)}</p>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Portfolio Performance</p>
                    <p className={`text-xl font-bold ${portfolioPerformance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {portfolioPerformance.toFixed(2)}%
                    </p>
                </div>
            </div>
            
            <h3 className="text-md font-semibold mt-4 mb-2">Profit/Loss Breakdown</h3>
            
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Unrealized P/L</p>
                    <p className={`text-lg font-bold ${unrealizedPL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        ${unrealizedPL.toFixed(2)}
                    </p>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Realized P/L</p>
                    <p className={`text-lg font-bold ${realizedPL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        ${realizedPL.toFixed(2)}
                    </p>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Total P/L</p>
                    <p className={`text-lg font-bold ${totalPL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        ${totalPL.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
}