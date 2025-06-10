import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { stockPricesState, marketDataState } from "@/store/marketAtom";
import { subscribeToStock, unsubscribeFromStock } from "@/utils/socketClient";

interface LiveStockPriceProps {
  symbol: string;
}

export default function LiveStockPrice({ symbol }: LiveStockPriceProps) {
  const [stockPrices, setStockPrices] = useRecoilState(stockPricesState);
  const [marketData, setMarketData] = useRecoilState(marketDataState);
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);
  const [priceDirection, setPriceDirection] = useState<'up' | 'down' | 'neutral'>('neutral');
  const [flashClass, setFlashClass] = useState<string>('');
  
  // Get current price from market data or stock prices (fallback)
  const stockData = marketData[symbol];
  const price = stockData?.price || stockPrices[symbol] || 0;
  
  // Sync stockPricesState with marketDataState for backward compatibility
  useEffect(() => {
    if (stockData?.price && stockPrices[symbol] !== stockData.price) {
      setStockPrices(prev => ({
        ...prev,
        [symbol]: stockData.price
      }));
    }
  }, [stockData?.price, symbol, stockPrices, setStockPrices]);
  
  // Track price changes for visual effect
  useEffect(() => {
    if (previousPrice !== null) {
      if (price > previousPrice) {
        setPriceDirection('up');
        setFlashClass('bg-green-50 dark:bg-green-900/20');
      } else if (price < previousPrice) {
        setPriceDirection('down');
        setFlashClass('bg-red-50 dark:bg-red-900/20');
      }
      
      // Clear flash effect after 500ms
      const timeout = setTimeout(() => {
        setFlashClass('');
      }, 500);
      
      return () => clearTimeout(timeout);
    }
    
    setPreviousPrice(price);
  }, [price, previousPrice]);
  
  // Subscribe to specific stock updates
  useEffect(() => {
    subscribeToStock(symbol);
    
    return () => {
      unsubscribeFromStock(symbol);
    };
  }, [symbol]);
  
  return (
    <div className={`p-4 transition-colors duration-300 ${flashClass} rounded-lg`}>
      <h2 className="text-lg text-gray-900 dark:text-white font-semibold">
        {stockData?.name || stockData?.symbol || symbol}
      </h2>
      
      <div className="flex items-center gap-2 mt-2">
        <p className={`text-xl font-bold ${
          priceDirection === 'up' ? 'text-green-600 dark:text-green-400' : 
          priceDirection === 'down' ? 'text-red-600 dark:text-red-400' : 
          'text-gray-900 dark:text-white'
        }`}>
          ${price.toFixed(2)}
        </p>
        
        {stockData && (
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
            (stockData.changePercent ?? 0) >= 0 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400'
          }`}>
            {(stockData.changePercent ?? 0) >= 0 ? '+' : ''}{(stockData.changePercent ?? 0).toFixed(2)}%
          </span>
        )}
      </div>
      
      {stockData && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex justify-between">
            <span>Open</span>
            <span className="font-medium text-gray-900 dark:text-white">${(stockData.open ?? stockData.price).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>High</span>
            <span className="font-medium text-gray-900 dark:text-white">${(stockData.high ?? stockData.price).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Low</span>
            <span className="font-medium text-gray-900 dark:text-white">${(stockData.low ?? stockData.price).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Vol</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {(stockData.volume ?? 0) > 1000000 
                ? `${((stockData.volume ?? 0) / 1000000).toFixed(1)}M`
                : (stockData.volume ?? 0) > 1000
                  ? `${((stockData.volume ?? 0) / 1000).toFixed(1)}K`
                  : (stockData.volume ?? 0)
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
