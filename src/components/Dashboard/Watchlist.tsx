import React from "react";
import { useRecoilState } from "recoil";
import { watchlistState } from "../../store/watchlistAtom";
import StockItem from "./StockItem";
import StockSearch from "./StockSearch";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useRecoilState(watchlistState);

  const removeStock = (symbol: string) => {
    setWatchlist(watchlist.filter((stock) => stock.symbol !== symbol));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">📈 Watchlist</h2>
      <StockSearch />
      <div className="mt-4">
        {watchlist.length > 0 ? (
          <ul className="space-y-4">
            {watchlist.map((stock) => (
              <StockItem key={stock.symbol} {...stock} onRemove={removeStock} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No stocks in your watchlist.</p>
        )}
      </div>
    </div>
  );
}
