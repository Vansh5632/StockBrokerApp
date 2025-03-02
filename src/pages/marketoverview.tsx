import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { watchlistState } from "../store/watchlistAtom";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function MarketOverview() {
    const watchlist = useRecoilValue(watchlistState);
    const [marketData, setMarketData] = useState<{ [key: string]: number[] }>({});
    const [timeLabels, setTimeLabels] = useState<string[]>([]);

    // Fake API function to get stock price data
    const fetchMarketData = async () => {
        try {
            // Simulated API fetching - replace with your fake simulation API
            const response = await fetch("/api/market");
            const data = await response.json();

            const newMarketData: { [key: string]: number[] } = {};
            const timestamps: string[] = [];

            watchlist.forEach((stock) => {
                newMarketData[stock.symbol] = data[stock.symbol] || [];
            });

            if (data.timestamps) {
                timestamps.push(...data.timestamps);
            }

            setMarketData(newMarketData);
            setTimeLabels(timestamps);
        } catch (error) {
            console.error("Error fetching market data:", error);
        }
    };

    useEffect(() => {
        fetchMarketData();
        const interval = setInterval(fetchMarketData, 5000); // Refresh every 5 seconds
        return () => clearInterval(interval);
    }, [watchlist]);

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-black">📊 Market Overview</h2>

            {watchlist.length === 0 ? (
                <p className="text-gray-500 text-center">No stocks in your watchlist.</p>
            ) : (
                watchlist.map((stock) => (
                    <div key={stock.symbol} className="mb-6">
                        <h3 className="text-lg font-semibold">{stock.symbol}</h3>
                        {marketData[stock.symbol] && (
                            <Line
                                data={{
                                    labels: timeLabels,
                                    datasets: [
                                        {
                                            label: `${stock.symbol} Price`,
                                            data: marketData[stock.symbol],
                                            borderColor: "rgb(75, 192, 192)",
                                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                }}
                            />
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
