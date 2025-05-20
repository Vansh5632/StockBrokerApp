// src/utils/socketClient.ts
import { io, Socket } from 'socket.io-client';
import { useState, useEffect } from 'react';
import { OrderBookEntry } from '@/store/marketAtom';

// Define base URL
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';

// Create a socket instance
let socket: Socket;

// Initialize socket connection
export const initializeSocket = async (): Promise<Socket> => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Connection event listeners
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Wait for connection
    if (!socket.connected) {
      await new Promise<void>((resolve) => {
        socket.once('connect', () => resolve());
      });
    }
  }
  
  return socket;
};

// Get the socket instance (initializes if needed)
export const getSocket = async (): Promise<Socket> => {
  if (!socket || !socket.connected) {
    return initializeSocket();
  }
  return socket;
};

// Subscribe to updates for a specific stock
export const subscribeToStock = async (symbol: string): Promise<void> => {
  const socket = await getSocket();
  socket.emit('subscribeToStock', symbol);
};

// Unsubscribe from updates for a specific stock
export const unsubscribeFromStock = async (symbol: string): Promise<void> => {
  if (socket && socket.connected) {
    socket.emit('unsubscribeFromStock', symbol);
  }
};

// Get price history for a stock
export const getStockHistory = async (symbol: string): Promise<number[]> => {
  const socket = await getSocket();
  return new Promise((resolve, reject) => {
    socket.emit('getStockHistory', symbol, (response: any) => {
      if (response.success) {
        resolve(response.prices);
      } else {
        reject(new Error(response.error || 'Failed to get stock history'));
      }
    });
  });
};

// Place an order
export const placeOrder = async (order: {
  symbol: string;
  quantity: number;
  price: number;
  type: 'buy' | 'sell';
  userId: string;
}): Promise<any> => {
  const socket = await getSocket();
  return new Promise((resolve, reject) => {
    socket.emit('placeOrder', order, (response: any) => {
      if (response.success) {
        resolve(response);
      } else {
        reject(new Error(response.error || 'Failed to place order'));
      }
    });
  });
};

// Get order book for a stock
export const getOrderBook = async (symbol: string): Promise<{ buy: OrderBookEntry[], sell: OrderBookEntry[] }> => {
  const socket = await getSocket();
  return new Promise((resolve, reject) => {
    socket.emit('getOrderBook', symbol, (response: any) => {
      if (response.success) {
        resolve(response.orderBook);
      } else {
        reject(new Error(response.error || 'Failed to get order book'));
      }
    });
  });
};

// React hook to use real-time stock price
export const useStockPrice = (symbol: string) => {
  const [price, setPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const setupSocket = async () => {
      try {
        setIsLoading(true);
        const socket = await getSocket();
        
        // Subscribe to stock updates
        await subscribeToStock(symbol);
        
        // Listen for price updates
        const handlePriceUpdate = (data: { symbol: string, price: number }) => {
          if (mounted && data.symbol === symbol) {
            setPrice(data.price);
            setIsLoading(false);
          }
        };
        
        socket.on('stockUpdate', handlePriceUpdate);
        
        // Get initial price
        socket.emit('getStockHistory', symbol, (response: any) => {
          if (mounted) {
            if (response.success && response.prices && response.prices.length > 0) {
              setPrice(response.prices[response.prices.length - 1]);
            }
            setIsLoading(false);
          }
        });
        
        return () => {
          socket.off('stockUpdate', handlePriceUpdate);
          if (mounted) {
            unsubscribeFromStock(symbol);
          }
        };
      } catch (err) {
        if (mounted) {
          setError((err as Error).message || 'Failed to connect to market data');
          setIsLoading(false);
        }
      }
    };
    
    setupSocket();
    
    return () => {
      mounted = false;
      unsubscribeFromStock(symbol);
    };
  }, [symbol]);
  
  return { price, isLoading, error };
};

// React hook to use order book data
export const useOrderBook = (symbol: string) => {
  const [orderBook, setOrderBook] = useState<{ buy: OrderBookEntry[], sell: OrderBookEntry[] } | null>(null);

  useEffect(() => {
    let mounted = true;

    const setupOrderBook = async () => {
      try {
        // Get socket
        const socket = await getSocket();
        
        // Subscribe to stock updates
        await subscribeToStock(symbol);
        
        // Listen for order book updates
        const handleOrderBookUpdate = (data: { symbol: string, orderBook: any }) => {
          if (mounted && data.symbol === symbol) {
            setOrderBook(data.orderBook);
          }
        };
        
        // Get initial order book
        getOrderBook(symbol)
          .then((initialOrderBook) => {
            if (mounted) {
              setOrderBook(initialOrderBook);
            }
          })
          .catch((err) => console.error('Error getting initial order book:', err));
        
        socket.on('orderBookUpdate', handleOrderBookUpdate);
        
        return () => {
          socket.off('orderBookUpdate', handleOrderBookUpdate);
        };
      } catch (err) {
        console.error('Order book subscription error:', err);
      }
    };
    
    setupOrderBook();
    
    return () => {
      mounted = false;
      unsubscribeFromStock(symbol);
    };
  }, [symbol]);
  
  return orderBook;
};