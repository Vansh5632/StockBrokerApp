import React from "react";
import { useRecoilState } from "recoil";
import { watchlistState } from "../../store/watchlistAtom";
import StockItem from "./StockItem";

export default function Watchlist() {
    const [watchlist, setWatchlist] = useRecoilState(watchlistState);

    const removeStock = (symbol: string) => {
        setWatchlist(watchlist.filter(stock => stock.symbol !== symbol));
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                📈 Watchlist
            </h2>
            {watchlist.length > 0 ? (
                watchlist.map(stock => (
                    <StockItem key={stock.symbol} {...stock} onRemove={removeStock} />
                ))
            ) : (
                <p className="text-gray-600">No stocks in your watchlist.</p>
            )}
        </div>
    );
}
