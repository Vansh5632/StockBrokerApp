// src/utils/socketClient.ts
import { io, Socket } from 'socket.io-client';
import { useState, useEffect } from 'react';

// Socket.IO client instance
let socket: Socket | null = null;

// Initialize socket connection
export const initializeSocket = () => {
  if (!socket) {
    // Connect to the same URL the page is served from
    const url = process.env.NEXT_PUBLIC_API_URL || window.location.origin;
    socket = io(url, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }
  
  return socket;
};

// Get the socket instance (creates one if it doesn't exist)
export const getSocket = (): Socket => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};

// Clean up socket connection
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// React hook for socket events
export const useSocketEvent = <T>(eventName: string, callback: (data: T) => void) => {
  useEffect(() => {
    const socketInstance = getSocket();
    
    socketInstance.on(eventName, callback);
    
    return () => {
      socketInstance.off(eventName, callback);
    };
  }, [eventName, callback]);
};

// Place an order through the socket
export const placeOrder = (order: {
  symbol: string;
  quantity: number;
  price: number;
  type: 'buy' | 'sell';
  userId?: string;
}) => {
  const socketInstance = getSocket();
  return new Promise((resolve, reject) => {
    // Set up one-time handlers for this specific order
    socketInstance.once('orderPlaced', (response) => {
      resolve(response);
    });
    
    socketInstance.once('orderError', (error) => {
      reject(error);
    });
    
    // Emit the order to the server
    socketInstance.emit('placeOrder', order);
    
    // Timeout to prevent hanging promises
    setTimeout(() => {
      reject({ error: 'Order placement timed out' });
    }, 5000);
  });
};

// Get order book for a specific stock
export const getOrderBook = (symbol: string) => {
  const socketInstance = getSocket();
  return new Promise((resolve, reject) => {
    socketInstance.emit('getOrderBook', symbol, (response: any) => {
      if (response.success) {
        resolve(response.orderBook);
      } else {
        reject(response.error);
      }
    });
  });
};

// Get stock price history
export const getStockHistory = (symbol: string) => {
  const socketInstance = getSocket();
  return new Promise((resolve, reject) => {
    socketInstance.emit('getStockHistory', symbol, (response: any) => {
      if (response.success) {
        resolve(response.prices);
      } else {
        reject(response.error);
      }
    });
  });
};

// Subscribe to updates for a specific stock
export const subscribeToStock = (symbol: string) => {
  const socketInstance = getSocket();
  socketInstance.emit('subscribeToStock', symbol);
};

// Unsubscribe from updates for a specific stock
export const unsubscribeFromStock = (symbol: string) => {
  const socketInstance = getSocket();
  socketInstance.emit('unsubscribeFromStock', symbol);
};

// React hook for market data
export const useMarketData = () => {
  const [marketData, setMarketData] = useState<Record<string, any>>({});
  
  useSocketEvent<Record<string, any>>('marketUpdate', (data) => {
    setMarketData(data);
  });
  
  return marketData;
};

// React hook for a specific stock's data
export const useStockData = (symbol: string) => {
  const [stockData, setStockData] = useState<any>(null);
  
  useEffect(() => {
    // Subscribe to stock updates
    subscribeToStock(symbol);
    
    return () => {
      // Unsubscribe when component unmounts
      unsubscribeFromStock(symbol);
    };
  }, [symbol]);
  
  useSocketEvent<any>('stockUpdate', (data) => {
    if (data.symbol === symbol) {
      setStockData(data);
    }
  });
  
  return stockData;
};

// React hook for order book data
export const useOrderBook = (symbol: string) => {
  const [orderBook, setOrderBook] = useState<any>({ buy: [], sell: [] });
  
  useEffect(() => {
    // Get initial order book
    getOrderBook(symbol).then(setOrderBook).catch(console.error);
  }, [symbol]);
  
  useSocketEvent<any>('orderBookUpdate', (data) => {
    if (data.symbol === symbol) {
      setOrderBook(data.orderBook);
    }
  });
  
  return orderBook;
};