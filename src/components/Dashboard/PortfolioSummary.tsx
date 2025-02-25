import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { portfolioState } from "../../store/portfolioAtom";
import { watchlistState } from "../../store/watchlistAtom";

export default function PortfolioSummary() {
    const portfolio = useRecoilValue(portfolioState);
    const watchlist = useRecoilValue(watchlistState);

    // Calculate total invested amount
    const totalInvested = useMemo(() => {
        return portfolio.holdings.reduce((sum, stock) => sum + stock.quantity * stock.buyPrice, 0);
    }, [portfolio]);

    // Calculate current portfolio value based on market price
    const currentValue = useMemo(() => {
        return portfolio.holdings.reduce((sum, stock) => {
            const marketStock = watchlist.find(s => s.symbol === stock.symbol);
            return sum + stock.quantity * (marketStock ? marketStock.price : stock.buyPrice); // Fallback to buy price if no market data
        }, 0);
    }, [portfolio, watchlist]);

    // Calculate total profit/loss (unrealized)
    const unrealizedPL = useMemo(() => currentValue - totalInvested, [currentValue, totalInvested]);

    // Calculate realized gains/losses (from sold stocks)
    const realizedPL = useMemo(() => {
        return portfolio.tradeHistory.reduce((sum, trade) => {
            if (trade.type === "SELL") {
                return sum + (trade.sellPrice - trade.buyPrice) * trade.quantity;
            }
            return sum;
        }, 0);
    }, [portfolio]);

    return (
        <div className="bg-white p-4 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Portfolio Summary</h2>
            <p className="text-gray-700">Total Funds: ${portfolio.funds.toLocaleString()}</p>
            <p className="text-gray-700">Total Invested: ${totalInvested.toLocaleString()}</p>
            <p className={`text-${unrealizedPL >= 0 ? "green" : "red"}-500`}>
                Unrealized P/L: ${unrealizedPL.toFixed(2)}
            </p>
            <p className={`text-${realizedPL >= 0 ? "green" : "red"}-500`}>
                Realized P/L: ${realizedPL.toFixed(2)}
            </p>
            <p className="text-gray-700">Current Value: ${currentValue.toLocaleString()}</p>
        </div>
    );
}
