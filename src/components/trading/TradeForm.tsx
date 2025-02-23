import { useState, useEffect } from "react";

export default function TradeForm() {
  const [marketData, setMarketData] = useState({});
  const [symbol, setSymbol] = useState("AAPL");
  const [qty, setQty] = useState(1);
  const [side, setSide] = useState("buy");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/market")
      .then((res) => res.json())
      .then(setMarketData);
  }, []);

  const handleTrade = async () => {
    setStatus("Placing order...");

    const response = await fetch("/api/trade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symbol, qty, side }),
    });

    const data = await response.json();
    if (data.success) {
      setStatus("Order placed successfully!");
    } else {
      setStatus(`Error: ${data.error}`);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-lg font-semibold mb-2">Trade Stocks</h2>
      <select value={symbol} onChange={(e) => setSymbol(e.target.value)} className="p-2 border rounded w-full mb-2">
        {Object.keys(marketData).map((stock) => (
          <option key={stock} value={stock}>
            {stock} - ${marketData[stock]?.price.toFixed(2)}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Quantity"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        className="p-2 border rounded w-full mb-2"
      />
      <select value={side} onChange={(e) => setSide(e.target.value)} className="p-2 border rounded w-full mb-2">
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      <button onClick={handleTrade} className="p-2 bg-blue-500 text-white rounded w-full">
        Place Order
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}
