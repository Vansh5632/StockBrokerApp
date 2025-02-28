import React, { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { portfolioState } from "../../store/portfolioAtom";
import { watchlistState } from "../../store/watchlistAtom";

export default function PortfolioSummary() {
    const { data: session } = useSession();
    const [portfolio, setPortfolio] = useRecoilState(portfolioState);
    const watchlist = useRecoilState(watchlistState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session) return;

        async function fetchPortfolio() {
            setLoading(true);
            try {
                const res = await fetch("/api/portfolio");
                const data = await res.json();
                setPortfolio(data);
            } catch (error) {
                console.error("Error fetching portfolio:", error);
            }
            setLoading(false);
        }

        fetchPortfolio();
    }, [session, setPortfolio]);

    async function savePortfolio() {
        if (!session) return;

        const response = await fetch("/api/portfolio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                holdings,
                tradeHistory,
                funds,
            }),
        });

        if (!response.ok) {
            console.error("Failed to save portfolio:", response.statusText);
        }
    };
    

    const holdings = portfolio?.holdings || [];
    const tradeHistory = portfolio?.tradeHistory || [];
    const funds = portfolio?.funds || 10000;

    const totalInvested = useMemo(() => {
        return holdings.reduce(
            (sum, stock) => sum + stock.quantity * stock.buyPrice,
            0
        );
    }, [holdings]);

    const currentValue = useMemo(() => {
        return holdings.reduce((sum, stock) => {
            const marketStock = watchlist.find((s) => s.symbol === stock.symbol);
            const currentPrice = marketStock ? marketStock.price : stock.buyPrice;
            return sum + stock.quantity * currentPrice;
        }, 0);
    }, [holdings, watchlist]);

    const unrealizedPL = useMemo(() => {
        return holdings.reduce((sum, stock) => {
            const marketStock = watchlist.find((s) => s.symbol === stock.symbol);
            const currentPrice = marketStock ? marketStock.price : stock.buyPrice;
            return sum + (currentPrice - stock.buyPrice) * stock.quantity;
        }, 0);
    }, [holdings, watchlist]);

    const realizedPL = useMemo(() => {
        return tradeHistory.reduce((sum, trade) => {
            if (trade.type === "sell" && trade.sellPrice) {
                return sum + (trade.sellPrice - trade.buyPrice) * trade.quantity;
            }
            return sum;
        }, 0);
    }, [tradeHistory]);

    const totalPL = realizedPL + unrealizedPL;

    const portfolioPerformance = useMemo(() => {
        const totalInvestment = totalInvested + realizedPL;
        if (totalInvestment <= 0) return 0;
        return ((currentValue - totalInvestment) / totalInvestment) * 100;
    }, [currentValue, totalInvested, realizedPL]);

    useEffect(() => {
        savePortfolio();
    }, [funds, realizedPL]);

    return (
        <div className="bg-gray-800 text-white p-4 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
                Portfolio Summary
            </h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
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
                            <p
                                className={`text-xl font-bold ${
                                    portfolioPerformance >= 0 ? "text-green-500" : "text-red-500"
                                }`}
                            >
                                {portfolioPerformance.toFixed(2)}%
                            </p>
                        </div>
                    </div>

                    <h3 className="text-md font-semibold mt-4 mb-2">
                        Profit/Loss Breakdown
                    </h3>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-700 p-3 rounded-lg">
                            <p className="text-gray-400 text-sm">Unrealized P/L</p>
                            <p
                                className={`text-lg font-bold ${
                                    unrealizedPL >= 0 ? "text-green-500" : "text-red-500"
                                }`}
                            >
                                ${unrealizedPL.toFixed(2)}
                            </p>
                        </div>

                        <div className="bg-gray-700 p-3 rounded-lg">
                            <p className="text-gray-400 text-sm">Realized P/L</p>
                            <p
                                className={`text-lg font-bold ${
                                    realizedPL >= 0 ? "text-green-500" : "text-red-500"
                                }`}
                            >
                                ${realizedPL.toFixed(2)}
                            </p>
                        </div>

                        <div className="bg-gray-700 p-3 rounded-lg">
                            <p className="text-gray-400 text-sm">Total P/L</p>
                            <p
                                className={`text-lg font-bold ${
                                    totalPL >= 0 ? "text-green-500" : "text-red-500"
                                }`}
                            >
                                ${totalPL.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
