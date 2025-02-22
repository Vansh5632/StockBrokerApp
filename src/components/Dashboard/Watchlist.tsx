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
    <div className="p-6 bg-gray-100 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">📈 Watchlist</h2>
      <StockSearch />
      {watchlist.length > 0 ? (
        watchlist.map((stock) => (
          <StockItem key={stock.symbol} {...stock} onRemove={removeStock} />
        ))
      ) : (
        <p className="text-gray-500">No stocks in your watchlist.</p>
      )}
    </div>
  );
}
