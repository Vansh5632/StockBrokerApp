import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { watchlistState, availableStocks } from "../../store/watchlistAtom";
import debounce from "lodash/debounce";

export default function StockSearch() {
  const [query, setQuery] = useState("");
  const [watchlist, setWatchlist] = useRecoilState(watchlistState);
  const [filteredStocks, setFilteredStocks] = useState<{ name: string; symbol: string; price: number }[]>([]);

  useEffect(() => {
    const debouncedFilter = debounce(() => {
      setFilteredStocks(
        availableStocks.filter(
          (stock) =>
            stock.name.toLowerCase().includes(query.toLowerCase()) ||
            stock.symbol.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 300);

    debouncedFilter();

    return () => {
      debouncedFilter.cancel();
    };
  }, [query]);

  const addStock = (stock: { name: string; symbol: string; price: number }) => {
    if (!watchlist.some((s) => s.symbol === stock.symbol)) {
      setWatchlist([...watchlist, { ...stock, quantity: 0 }]);
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
        className="text-black w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      />
      {query && (
        <ul className="bg-white text-black border mt-2 rounded-md shadow-lg max-h-60 overflow-y-auto transition duration-300">
          {filteredStocks.map((stock) => (
            <li
              key={stock.symbol}
              className="p-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center transition duration-300"
              onClick={() => addStock(stock)}
            >
              <span>{stock.name} ({stock.symbol}) - 💲{stock.price}</span>
              <button
                className="text-blue-500 hover:text-blue-700 transition duration-300"
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
