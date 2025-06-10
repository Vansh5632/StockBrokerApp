// server.js
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';
import { setupMarketSimulator } from './marketSimulator.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Track subscriptions for each stock symbol
const stockSubscriptions = new Map();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });
  
  // Initialize Socket.IO with the server
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  // Make io accessible to API routes
  // @ts-ignore - Adding extra property to the server
  server.io = io;
  
  // Setup market simulator with socket.io instance
  const marketAPI = setupMarketSimulator(io, stockSubscriptions);
  
  // Socket.IO connection handler
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    
    // Send initial market state to new client
    socket.emit('marketUpdate', marketAPI.getAllStockData());
    
    // Handle client placing an order
    socket.on('placeOrder', async (order) => {
      try {
        // Place order through market simulator
        const result = marketAPI.placeOrder(order);
        socket.emit('orderPlaced', result);
        
        // Broadcast order book update
        io.emit('orderBookUpdate', {
          symbol: order.symbol,
          orderBook: marketAPI.getOrderBook(order.symbol)
        });
      } catch (error) {
        console.error('Error handling order:', error);
        socket.emit('orderError', { error: error.message || 'Failed to place order' });
      }
    });
    
    // Handle server placing an order (from REST API)
    socket.on('serverPlaceOrder', async (order) => {
      try {
        // Place order through market simulator
        const result = marketAPI.placeOrder(order);
        
        // Broadcast order book update
        io.emit('orderBookUpdate', {
          symbol: order.symbol,
          orderBook: marketAPI.getOrderBook(order.symbol)
        });
      } catch (error) {
        console.error('Error handling server order:', error);
      }
    });
    
    // Handle client subscribing to specific stock updates
    socket.on('subscribeToStock', (symbol) => {
      // Add client to the stock's subscription set
      if (!stockSubscriptions.has(symbol)) {
        stockSubscriptions.set(symbol, new Set());
      }
      stockSubscriptions.get(symbol).add(socket.id);
      socket.join(`stock:${symbol}`);
      console.log(`Client ${socket.id} subscribed to ${symbol}`);
    });
    
    // Handle client unsubscribing from stock updates
    socket.on('unsubscribeFromStock', (symbol) => {
      if (stockSubscriptions.has(symbol)) {
        stockSubscriptions.get(symbol).delete(socket.id);
      }
      socket.leave(`stock:${symbol}`);
      console.log(`Client ${socket.id} unsubscribed from ${symbol}`);
    });
    
    // Handle getting history for a specific stock
    socket.on('getStockHistory', (symbol, callback) => {
      try {
        const prices = marketAPI.getStockHistory(symbol);
        callback({
          symbol,
          prices,
          success: true
        });
      } catch (error) {
        callback({
          success: false,
          error: 'Failed to get stock history'
        });
      }
    });
    
    // Handle client requesting order book
    socket.on('getOrderBook', (symbol, callback) => {
      try {
        const orderBook = marketAPI.getOrderBook(symbol);
        callback({
          symbol,
          orderBook,
          success: true
        });
      } catch (error) {
        callback({
          success: false,
          error: 'Failed to get order book'
        });
      }
    });
    
    // Handle client disconnection
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
      
      // Remove client from all stock subscriptions
      stockSubscriptions.forEach((subscribers, symbol) => {
        subscribers.delete(socket.id);
      });
    });
  });
  
  // Start the server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});