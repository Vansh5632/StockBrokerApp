const stocks = [
    { name: "Reliance", symbol: "RELI", price: 2520.5, change: "+1.5%" },
    { name: "TCS", symbol: "TCS", price: 3350.8, change: "-0.8%" },
    { name: "Infosys", symbol: "INFY", price: 1490.2, change: "+0.3%" },
  ];
  
  export default function MarketOverview() {
    return (
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Market Overview</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Stock</th>
              <th className="p-2">Price</th>
              <th className="p-2">Change</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.symbol} className="border-b">
                <td className="p-2">{stock.name}</td>
                <td className="p-2">₹{stock.price}</td>
                <td className={`p-2 ${stock.change.includes("-") ? "text-red-500" : "text-green-500"}`}>
                  {stock.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  