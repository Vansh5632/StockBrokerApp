// src/components/trading/MarketDataProvider.tsx
import { useEffect, useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { 
  marketDataState, 
  stockPricesState, 
  marketIndicesState,
  orderBookState,
  stockPriceHistoryState, 
  recentTransactionsState,
  marketSentimentState
} from '@/store/marketAtom';
import { 
  initializeSocket, 
  useSocketEvent, 
  getStockHistory 
} from '@/utils/socketClient';

interface MarketDataProviderProps {
  children: React.ReactNode;
}

export default function MarketDataProvider({ children }: MarketDataProviderProps) {
  // Recoil state
  const [marketData, setMarketData] = useRecoilState(marketDataState);
  const setStockPrices = useSetRecoilState(stockPricesState);
  const setOrderBook = useSetRecoilState(orderBookState);
  const setPriceHistory = useSetRecoilState(stockPriceHistoryState);
  const setRecentTransactions = useSetRecoilState(recentTransactionsState);
  const setMarketSentiment = useSetRecoilState(marketSentimentState);
  
  // Initialize socket connection
  useEffect(() => {
    const socket = initializeSocket();
    
    return () => {
      // Clean up code if needed
    };
  }, []);
  
  // Handle market updates
  useSocketEvent('marketUpdate', (data) => {
    setMarketData(data);
    
    // Update stockPrices for backward compatibility
    const simplePrices: Record<string, number> = {};
    Object.keys(data).forEach(symbol => {
      simplePrices[symbol] = data[symbol].price;
    });
    setStockPrices(simplePrices);
  });
  
  // Handle order book updates
  useSocketEvent('orderBookUpdate', (data) => {
    if (data.symbol && data.orderBook) {
      setOrderBook(prev => ({
        ...prev,
        [data.symbol]: data.orderBook
      }));
    }
  });
  
  // Handle transaction updates
  useSocketEvent('transaction', (transaction) => {
    setRecentTransactions(prev => [transaction, ...prev].slice(0, 50)); // Keep last 50 transactions
    
    // Update sentiment based on transaction volume and prices
    setMarketSentiment(prev => {
      // Positive transactions make sentiment more positive, negative make it more negative
      const impact = transaction.price * transaction.quantity / 100000; // Normalize impact
      return Math.max(-1, Math.min(1, prev + impact * 0.01)); // Limit between -1 and 1
    });
  });
  
  // Load price history for each stock when available
  useEffect(() => {
    const symbols = Object.keys(marketData);
    
    if (symbols.length > 0) {
      symbols.forEach(symbol => {
        getStockHistory(symbol)
          .then(prices => {
            setPriceHistory(prev => ({
              ...prev,
              [symbol]: prices as number[]
            }));
          })
          .catch(error => {
            console.error(`Failed to load price history for ${symbol}:`, error);
          });
      });
    }
  }, [Object.keys(marketData).length]); // Only run when we get new symbols
  
  return <>{children}</>;
}