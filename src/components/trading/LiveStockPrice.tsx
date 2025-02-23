import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { stockPricesState } from "@/store/marketAtom";

interface LiveStockPriceProps {
  symbol: string;
}

export default function LiveStockPrice({ symbol }: LiveStockPriceProps) {
  const [stockPrices, setStockPrices] = useRecoilState(stockPricesState);
  const price = stockPrices[symbol] || 100.0; // Default price if not found

  useEffect(() => {
    const interval = setInterval(() => {
      setStockPrices((prevPrices) => ({
        ...prevPrices,
        [symbol]: prevPrices[symbol] + (Math.random() * 10 - 5), // Fluctuates ±5
      }));
    }, 2000); // Updates every 2 seconds

    return () => clearInterval(interval);
  }, [symbol, setStockPrices]);

  return (
    <div className="p-4">
      <h2 className="text-lg text-black font-semibold">Live Stock Price: {symbol}</h2>
      <p className="text-xl text-green-600 font-bold">${price.toFixed(2)}</p>
    </div>
  );
}
