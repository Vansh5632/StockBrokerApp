import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { watchlistState } from "../../store/watchlistAtom";

export default function PortfolioSummary() {
  const watchlist = useRecoilValue(watchlistState);
  const [portfolioValue, setPortfolioValue] = useState(0);

  useEffect(() => {
    // Calculate the total portfolio value
    const totalValue = watchlist.reduce((sum, stock) => sum + stock.price * stock.quantity, 0);
    setPortfolioValue(totalValue);
  }, [watchlist]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">📊 Portfolio Summary</h2>
      <p className="text-xl text-center font-semibold text-green-600">💰 Total Value: ${portfolioValue.toFixed(2)}</p>
    </div>
  );
}
