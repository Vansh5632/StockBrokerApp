// Enhanced MarketDataProvider for real-time watchlist updates
import React, { useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { marketDataState, stockPriceHistoryState } from '../../store/marketAtom';
import { watchlistState } from '../../store/watchlistAtom';
import { initializeSocket, subscribeToStock, unsubscribeFromStock, getSocket } from '../../utils/socketClient';

interface MarketDataProviderProps {
  children: React.ReactNode;
}

export default function MarketDataProvider({ children }: MarketDataProviderProps) {
  const [marketData, setMarketData] = useRecoilState(marketDataState);
  const [priceHistory, setPriceHistory] = useRecoilState(stockPriceHistoryState);
  const setWatchlist = useSetRecoilState(watchlistState);
  const socketInitialized = useRef(false);

  // Initialize WebSocket connection and subscriptions
  useEffect(() => {
    const setupSocket = async () => {
      if (socketInitialized.current) return;
      
      try {
        console.log('Setting up enhanced market data connection...');
        const socket = await initializeSocket();
        socketInitialized.current = true;

        // Listen for market-wide updates
        socket.on('marketUpdate', (stocks) => {
          console.log('Received market update:', stocks);
          
          // Update market data state
          const newMarketData: Record<string, any> = {};
          if (Array.isArray(stocks)) {
            stocks.forEach(stock => {
              newMarketData[stock.symbol] = stock;
            });
          } else if (typeof stocks === 'object') {
            Object.assign(newMarketData, stocks);
          }
          setMarketData(newMarketData);
          
          // Update watchlist prices
          setWatchlist(prevWatchlist => 
            prevWatchlist.map(watchlistStock => {
              const marketStock = Array.isArray(stocks) 
                ? stocks.find((s: any) => s.symbol === watchlistStock.symbol)
                : stocks[watchlistStock.symbol];
              
              if (marketStock) {
                return {
                  ...watchlistStock,
                  price: marketStock.price,
                  change: marketStock.change,
                  changePercent: marketStock.changePercent,
                  high: marketStock.high,
                  low: marketStock.low,
                  volume: marketStock.volume,
                  lastUpdated: marketStock.lastUpdated
                };
              }
              return watchlistStock;
            })
          );
        });

        // Listen for individual stock updates
        socket.on('stockUpdate', (stockData) => {
          console.log('Received stock update:', stockData);
          
          // Update market data
          setMarketData(prev => ({
            ...prev,
            [stockData.symbol]: stockData
          }));
          
          // Update watchlist
          setWatchlist(prevWatchlist => 
            prevWatchlist.map(stock => {
              if (stock.symbol === stockData.symbol) {
                return {
                  ...stock,
                  price: stockData.price,
                  change: stockData.change,
                  changePercent: stockData.changePercent,
                  high: stockData.high,
                  low: stockData.low,
                  volume: stockData.volume,
                  lastUpdated: stockData.lastUpdated
                };
              }
              return stock;
            })
          );
        });

        // Listen for price updates (backward compatibility)
        socket.on('priceUpdate', (data) => {
          console.log('Received price update:', data);
          
          setWatchlist(prevWatchlist => 
            prevWatchlist.map(stock => {
              if (stock.symbol === data.symbol) {
                return {
                  ...stock,
                  price: data.price,
                  change: data.change,
                  changePercent: data.changePercent
                };
              }
              return stock;
            })
          );
        });

        // Subscribe to default stocks
        const defaultStocks = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA', 'AMZN'];
        defaultStocks.forEach(symbol => subscribeToStock(symbol));
        
        console.log('Enhanced market data connection established');
      } catch (error) {
        console.error('Failed to setup enhanced WebSocket:', error);
      }
    };

    setupSocket();

    // Cleanup subscriptions
    return () => {
      getSocket().then(socket => {
        socket.off('marketUpdate');
        socket.off('stockUpdate'); 
        socket.off('priceUpdate');
        
        const symbols = Object.keys(marketData);
        symbols.forEach(symbol => unsubscribeFromStock(symbol));
      }).catch(console.error);
    };
  }, []);

  // Update price history when market data changes
  useEffect(() => {
    Object.entries(marketData).forEach(([symbol, data]) => {
      setPriceHistory(prev => ({
        ...prev,
        [symbol]: [...(prev[symbol] || []).slice(-99), data.price] // Keep last 100 prices
      }));
    });
  }, [marketData, setPriceHistory]);

  return <>{children}</>;
}