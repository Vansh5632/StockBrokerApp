import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { watchlistState, Stock } from "../../store/watchlistAtom";

export default function StockItem({ symbol, name, price, quantity, onRemove }: Stock & { onRemove: (symbol: string) => void }) {
    const [watchlist, setWatchlist] = useRecoilState(watchlistState);
    const [tradeQuantity, setTradeQuantity] = useState(1);

    const updateStockQuantity = (type: "buy" | "sell") => {
        setWatchlist((prev) =>
            prev.map((stock) =>
                stock.symbol === symbol
                    ? {
                            ...stock,
                            quantity: type === "buy" ? (stock.quantity ?? 0) + tradeQuantity : Math.max((stock.quantity ?? 0) - tradeQuantity, 0),
                        }
                    : stock
            )
        );
    };

    return (
        <li className="flex justify-between items-center p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
            <div>
                <p className="font-semibold text-lg text-black">{name} ({symbol})</p>
                <p className="text-gray-600">💰 ${price.toFixed(2)}</p>
                <p className="text-gray-600">📦 Holdings: {quantity}</p>
            </div>
            <div className="flex gap-2 text-black items-center">
                <input
                    type="number"
                    min="1"
                    value={tradeQuantity}
                    onChange={(e) => setTradeQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 p-2 border rounded-md text-center"
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300" onClick={() => updateStockQuantity("buy")}>
                    Buy
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300" onClick={() => updateStockQuantity("sell")}>
                    Sell
                </button>
                <button className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors duration-300" onClick={() => onRemove(symbol)}>
                    ❌
                </button>
            </div>
        </li>
    );
}
