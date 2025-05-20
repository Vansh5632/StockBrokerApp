// src/components/trading/MarketDataProvider.tsx
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { marketDataState, stockPriceHistoryState } from '@/store/marketAtom';
import { initializeSocket, subscribeToStock, unsubscribeFromStock } from '@/utils/socketClient';

interface MarketDataProviderProps {
  children: React.ReactNode;
}

export default function MarketDataProvider({ children }: MarketDataProviderProps) {
  const [marketData, setMarketData] = useRecoilState(marketDataState);
  const [priceHistory, setPriceHistory] = useRecoilState(stockPriceHistoryState);

  // Initialize WebSocket connection and subscriptions
  useEffect(() => {
    const setupSocket = async () => {
      try {
        await initializeSocket();
        // Subscribe to default stocks
        const defaultStocks = ['AAPL', 'GOOGL', 'MSFT'];
        defaultStocks.forEach(symbol => subscribeToStock(symbol));
      } catch (error) {
        console.error('Failed to setup WebSocket:', error);
      }
    };

    setupSocket();

    // Cleanup subscriptions
    return () => {
      const symbols = Object.keys(marketData);
      symbols.forEach(symbol => unsubscribeFromStock(symbol));
    };
  }, []);

  // Update price history when market data changes
  useEffect(() => {
    Object.entries(marketData).forEach(([symbol, data]) => {
      setPriceHistory(prev => ({
        ...prev,
        [symbol]: [...(prev[symbol] || []), data.price]
      }));
    });
  }, [marketData, setPriceHistory]);

  return <>{children}</>;
}