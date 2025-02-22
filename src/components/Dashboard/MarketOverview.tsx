const stocks = [
  { name: "Reliance", symbol: "RELI", price: 2520.5, change: "+1.5%" },
  { name: "TCS", symbol: "TCS", price: 3350.8, change: "-0.8%" },
  { name: "Infosys", symbol: "INFY", price: 1490.2, change: "+0.3%" },
];

export default function MarketOverview() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md overflow-hidden">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Market Overview</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Change
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {stocks.map((stock) => (
              <tr key={stock.symbol}>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">{stock.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">₹{stock.price}</p>
                </td>
                <td className={`px-5 py-5 border-b border-gray-200 text-sm ${stock.change.includes("-") ? "text-red-500" : "text-green-500"}`}>
                  {stock.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}