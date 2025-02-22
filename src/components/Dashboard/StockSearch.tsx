import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { watchlistState, availableStocks } from "../../store/watchlistAtom";

export default function StockSearch() {
    const [query, setQuery] = useState("");
    const [watchlist, setWatchlist] = useRecoilState(watchlistState);

    const filteredStocks = availableStocks.filter(
        (stock) =>
            stock.name.toLowerCase().includes(query.toLowerCase()) ||
            stock.symbol.toLowerCase().includes(query.toLowerCase())
    );

    const addStock = (stock: any) => {
        if (!watchlist.some((s) => s.symbol === stock.symbol)) {
            setWatchlist([...watchlist, stock]);
        }
        setQuery(""); // Clear search bar
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search stocks..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="text-black w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {query && (
                <ul className="bg-black border mt-2 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredStocks.map((stock) => (
                        <li
                            key={stock.symbol}
                            className="p-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                            onClick={() => addStock(stock)}
                        >
                            <span>{stock.name} ({stock.symbol})</span>
                            <button
                                className="text-blue-500 hover:text-blue-700"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addStock(stock);
                                }}
                            >
                                Add
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
