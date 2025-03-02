import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { watchlistState } from "../../store/watchlistAtom";
import StockItem from "./StockItem";
import StockSearch from "./StockSearch";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useRecoilState(watchlistState);

  // Fetch watchlist from the backend on mount
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await fetch("/api/watchlist");
        if (response.ok) {
          const data = await response.json();
          setWatchlist(data);
        }
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };
    fetchWatchlist();
  }, []);

  // Save watchlist to the backend whenever it changes
  useEffect(() => {
    const saveWatchlist = async () => {
      try {
        await fetch("/api/watchlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stocks: watchlist }),
        });
      } catch (error) {
        console.error("Error saving watchlist:", error);
      }
    };
    if (watchlist.length > 0) saveWatchlist();
  }, [watchlist]);

  const removeStock = (symbol: string) => {
    setWatchlist(watchlist.filter((stock) => stock.symbol !== symbol));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">📈 Watchlist</h2>
      <StockSearch />
      <div className={`mt-4 ${watchlist.length > 2 ? "max-h-96 overflow-y-auto scrollbar-hide" : ""}`}>
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
