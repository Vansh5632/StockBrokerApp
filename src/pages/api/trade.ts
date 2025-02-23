import { portfolioState } from "@/store/portfolioAtom";
import { getFakeMarketData } from "@/utils/fakeMarket";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { symbol, qty, side } = req.body;
  const stockPrice = getFakeMarketData()[symbol]?.price;

  if (!stockPrice) {
    return res.status(400).json({ error: "Invalid stock symbol" });
  }

  const portfolio = portfolioState.default;
  let totalCost = qty * stockPrice;

  if (side === "buy") {
    if (portfolio.funds < totalCost) {
      return res.status(400).json({ error: "Insufficient funds" });
    }

    portfolio.funds -= totalCost;
    portfolio.holdings[symbol] = (portfolio.holdings[symbol] || 0) + qty;
  } else if (side === "sell") {
    if (!portfolio.holdings[symbol] || portfolio.holdings[symbol] < qty) {
      return res.status(400).json({ error: "Not enough shares" });
    }

    portfolio.funds += totalCost;
    portfolio.holdings[symbol] -= qty;
  }

  portfolio.history.push({
    symbol,
    qty,
    side,
    price: stockPrice,
    timestamp: new Date().toISOString(),
  });

  res.status(200).json({ success: true, portfolio });
}
