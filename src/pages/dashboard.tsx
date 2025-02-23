import { useEffect, useState } from "react";

interface Stock {
  symbol: string;
  companyName: string;
  price: number;
  volume: number;
  change: number;
  changePercent: number;
}

export default function Dashboard() {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    fetch("/api/marketData")
      .then((res) => res.json())
      .then((data) => setStocks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Market Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stocks.map((stock) => (
          <div key={stock.symbol} className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg text-black font-semibold">{stock.companyName} ({stock.symbol})</h2>
            <p>Price: ${stock.price.toFixed(2)}</p>
            <p>Volume: {stock.volume.toLocaleString()}</p>
            <p className={stock.change >= 0 ? "text-green-500" : "text-red-500"}>
              Change: {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
