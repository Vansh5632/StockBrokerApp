import { useRecoilValue } from "recoil";
import { portfolioState } from "@/store/portfolioAtom";

export default function Portfolio() {
  const portfolio = useRecoilValue(portfolioState);

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-lg font-semibold mb-2">Portfolio</h2>
      <p>Funds: ${portfolio.funds.toFixed(2)}</p>
      <h3 className="mt-2 font-semibold">Holdings</h3>
      {Object.entries(portfolio.holdings).length === 0 ? (
        <p>No holdings yet</p>
      ) : (
        <ul>
          {Object.entries(portfolio.holdings).map(([symbol, qty]) => (
            <li key={symbol}>
              {symbol}: {qty} shares
            </li>
          ))}
        </ul>
      )}
      <h3 className="mt-2 font-semibold">Trade History</h3>
      <ul>
        {portfolio.history.map((trade, index) => (
          <li key={index}>
            {trade.timestamp} - {trade.side} {trade.qty} shares of {trade.symbol} at ${trade.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
