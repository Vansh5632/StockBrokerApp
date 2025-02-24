import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { watchlistState, Stock } from "../../store/watchlistAtom";

export default function StockItem({ symbol, name, price, quantity, onRemove }: Stock & { onRemove: (symbol: string) => void }) {
    const [watchlist, setWatchlist] = useRecoilState(watchlistState);
    const [tradeQuantity, setTradeQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [currentPrice, setCurrentPrice] = useState(price);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Generate a random price change between -1% and +1%
            const priceChange = (Math.random() * 0.02 - 0.01) * price;
            const newPrice = Math.max(0, currentPrice + priceChange); // Ensure price doesn't go below 0
            setCurrentPrice(newPrice);

            // Update the price in the watchlist
            setWatchlist((prev) =>
                prev.map((stock) =>
                    stock.symbol === symbol
                        ? {
                              ...stock,
                              price: newPrice,
                          }
                        : stock
                )
            );
        }, 5000); // Change price every 5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [price, symbol, setWatchlist, currentPrice]);

    const updateStockQuantity = async (type: "buy" | "sell") => {
        if (type === "sell" && quantity < tradeQuantity) return;

        setWatchlist((prev) =>
            prev.map((stock) =>
                stock.symbol === symbol
                    ? {
                            ...stock,
                            quantity: type === "buy" ? stock.quantity + tradeQuantity : Math.max(stock.quantity - tradeQuantity, 0),
                        }
                    : stock
            )
        );

        setLoading(true);

        try {
            await fetch("/api/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ symbol, name, price: currentPrice, quantity: tradeQuantity, type }), // Use currentPrice for transaction
            });
        } catch (error) {
            console.error("Error saving transaction:", error);
        }

        setLoading(false);
    };

    return (
        <li className="flex justify-between items-center p-4 border rounded-lg shadow-md bg-gray-800 text-white">
            <div>
                <p className="font-semibold">{name} ({symbol})</p>
                <p className="text-gray-400">💰 ${currentPrice.toFixed(2)}</p>
                <p className="text-gray-400">📦 Holdings: {quantity}</p>
            </div>
            <div className="flex gap-2 items-center">
                <input
                    type="number"
                    min="1"
                    value={tradeQuantity}
                    onChange={(e) => setTradeQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="bg-gray-700 text-white w-14 p-1 border rounded-md text-center"
                />
                <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                    onClick={() => updateStockQuantity("buy")}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Buy"}
                </button>
                <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    onClick={() => updateStockQuantity("sell")}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Sell"}
                </button>
                <button className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-500" onClick={() => onRemove(symbol)}>
                    ❌
                </button>
            </div>
        </li>
    );
}
