// marketSimulator.js
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// Market data state
const marketState = {
  stocks: {},
  orders: {
    buy: [],
    sell: []
  },
  transactions: [],
  orderBook: {},
  lastPrices: {},
  volatilityFactors: {}
};

// Market parameters - these affect price movements
const MARKET_PARAMS = {
  baseVolatility: 0.002, // Base level price movement (0.2% per tick)
  marketSentiment: 0, // Range from -1 (bearish) to 1 (bullish)
  tradingVolumeFactor: 0.5, // How much trading affects price
  updateInterval: 1000, // Update prices every 1000ms (1 second)
  orderImpactFactor: 0.001, // How much each order affects price
  momentumFactor: 0.3, // How much previous price changes affect current ones
  sentimentChangeRate: 0.05, // How quickly market sentiment can change
  newsImpactFactor: 0.2, // How much news affects prices
  randomWalkFactor: 0.4 // Random price movement factor
};

// Simulated stock data
const stocks = {
  AAPL: { price: 150, history: [], orderBook: { buy: [], sell: [] } },
  TSLA: { price: 700, history: [], orderBook: { buy: [], sell: [] } },
  AMZN: { price: 3200, history: [], orderBook: { buy: [], sell: [] } },
};

// Initialize stock data from database
async function initializeMarketData() {
  try {
    // Fetch stocks from database
    const stocksFromDB = await prisma.stock.findMany();
    
    // Initialize market state with stocks from DB
    stocksFromDB.forEach(stock => {
      // Add stock to market state
      marketState.stocks[stock.symbol] = {
        symbol: stock.symbol,
        name: stock.companyName,
        price: stock.price,
        previousClose: stock.price,
        open: stock.price,
        high: stock.price,
        low: stock.price,
        volume: 0,
        change: 0,
        changePercent: 0,
        lastUpdated: new Date()
      };
      
      marketState.lastPrices[stock.symbol] = [stock.price];
      
      // Each stock gets a custom volatility factor based on its characteristics
      marketState.volatilityFactors[stock.symbol] = 
        Math.random() * 0.8 + 0.5; // Random volatility between 0.5 and 1.3
      
      // Initialize empty order book for this stock
      marketState.orderBook[stock.symbol] = {
        buy: [],
        sell: []
      };
    });
    
    console.log(`Initialized ${stocksFromDB.length} stocks in the market`);
    
    // If no stocks were loaded, create some default ones
    if (stocksFromDB.length === 0) {
      console.log('No stocks found, creating default stocks');
      await createDefaultStocks();
    }
  } catch (error) {
    console.error('Failed to initialize market data:', error);
  }
}

// Create default stocks if none exist
async function createDefaultStocks() {
  const defaultStocks = [
    { symbol: 'AAPL', companyName: 'Apple Inc.', price: 190.50, volume: 10000000 },
    { symbol: 'MSFT', companyName: 'Microsoft Corporation', price: 405.75, volume: 8500000 },
    { symbol: 'GOOGL', companyName: 'Alphabet Inc.', price: 160.20, volume: 7500000 },
    { symbol: 'AMZN', companyName: 'Amazon.com, Inc.', price: 178.30, volume: 9000000 },
    { symbol: 'NVDA', companyName: 'NVIDIA Corporation', price: 950.80, volume: 12000000 },
    { symbol: 'TSLA', companyName: 'Tesla, Inc.', price: 175.40, volume: 11000000 },
    { symbol: 'META', companyName: 'Meta Platforms, Inc.', price: 485.60, volume: 8000000 },
    { symbol: 'AMD', companyName: 'Advanced Micro Devices, Inc.', price: 172.30, volume: 7000000 },
    { symbol: 'INTC', companyName: 'Intel Corporation', price: 30.15, volume: 5000000 },
    { symbol: 'NFLX', companyName: 'Netflix, Inc.', price: 625.80, volume: 4500000 }
  ];

  try {
    for (const stock of defaultStocks) {
      // Create in database
      await prisma.stock.create({
        data: {
          symbol: stock.symbol,
          companyName: stock.companyName,
          price: stock.price,
          volume: stock.volume,
          change: 0,
          changePercent: 0
        }
      });
      
      // Add to market state
      marketState.stocks[stock.symbol] = {
        symbol: stock.symbol,
        name: stock.companyName,
        price: stock.price,
        previousClose: stock.price,
        open: stock.price,
        high: stock.price,
        low: stock.price,
        volume: stock.volume,
        change: 0,
        changePercent: 0,
        lastUpdated: new Date()
      };
      
      marketState.lastPrices[stock.symbol] = [stock.price];
      marketState.volatilityFactors[stock.symbol] = Math.random() * 0.8 + 0.5;
      marketState.orderBook[stock.symbol] = { buy: [], sell: [] };
    }
    
    console.log(`Created ${defaultStocks.length} default stocks`);
  } catch (error) {
    console.error('Failed to create default stocks:', error);
  }
}

// Advanced price simulation algorithm
function updateStockPrices() {
  const now = new Date();
  
  Object.keys(marketState.stocks).forEach(symbol => {
    const stock = marketState.stocks[symbol];
    const lastPrices = marketState.lastPrices[symbol];
    const volatilityFactor = marketState.volatilityFactors[symbol];
    
    // Calculate price components
    
    // 1. Random walk component (brownian motion)
    const randomWalk = (Math.random() - 0.5) * 2 * MARKET_PARAMS.baseVolatility * 
                        volatilityFactor * MARKET_PARAMS.randomWalkFactor;
    
    // 2. Momentum component (trend following)
    const priceHistory = lastPrices.slice(-10); // Last 10 price points
    let momentum = 0;
    if (priceHistory.length > 1) {
      const recentChanges = priceHistory.slice(1).map((price, i) => 
        (price - priceHistory[i]) / priceHistory[i]
      );
      momentum = recentChanges.reduce((sum, change) => sum + change, 0) / recentChanges.length;
    }
    
    // 3. Market sentiment component
    const sentimentEffect = MARKET_PARAMS.marketSentiment * MARKET_PARAMS.baseVolatility * 0.5;
    
    // 4. Order book imbalance component
    const buyOrders = marketState.orderBook[symbol]?.buy?.length || 0;
    const sellOrders = marketState.orderBook[symbol]?.sell?.length || 0;
    let orderImbalance = 0;
    
    if (buyOrders + sellOrders > 0) {
      orderImbalance = (buyOrders - sellOrders) / (buyOrders + sellOrders);
    }
    
    const orderEffect = orderImbalance * MARKET_PARAMS.orderImpactFactor * volatilityFactor;
    
    // 5. Calculate volume factor
    const volumeFactor = (stock.volume / 10000) * MARKET_PARAMS.tradingVolumeFactor * 0.001;
    
    // Combine all factors for price change
    const combinedFactor = randomWalk + 
                          (momentum * MARKET_PARAMS.momentumFactor) + 
                          sentimentEffect + 
                          orderEffect + 
                          volumeFactor;
    
    // Apply price change
    const oldPrice = stock.price;
    let newPrice = oldPrice * (1 + combinedFactor);
    
    // Ensure price can't go negative or beyond reasonable bounds
    newPrice = Math.max(newPrice, oldPrice * 0.9, 0.01);
    newPrice = Math.min(newPrice, oldPrice * 1.1);
    
    // Update stock information
    stock.price = newPrice;
    stock.change = newPrice - stock.previousClose;
    stock.changePercent = ((newPrice - stock.previousClose) / stock.previousClose) * 100;
    stock.high = Math.max(stock.high, newPrice);
    stock.low = Math.min(stock.low, newPrice);
    stock.lastUpdated = now;
    
    // Save the new price to the price history array (keeps last 100 prices)
    marketState.lastPrices[symbol].push(newPrice);
    if (marketState.lastPrices[symbol].length > 100) {
      marketState.lastPrices[symbol].shift();
    }
  });
  
  // Slightly adjust market sentiment (random walk)
  MARKET_PARAMS.marketSentiment += (Math.random() - 0.5) * MARKET_PARAMS.sentimentChangeRate;
  MARKET_PARAMS.marketSentiment = Math.max(-1, Math.min(1, MARKET_PARAMS.marketSentiment));
}

// Process orders - match buy and sell orders
function processOrders() {
  Object.keys(marketState.orderBook).forEach(symbol => {
    const stockOrderBook = marketState.orderBook[symbol];
    const stock = marketState.stocks[symbol];
    
    if (!stock) return;
    
    // Sort buy orders by price (highest first)
    stockOrderBook.buy.sort((a, b) => b.price - a.price);
    
    // Sort sell orders by price (lowest first)
    stockOrderBook.sell.sort((a, b) => a.price - b.price);
    
    let matchedOrders = true;
    
    // Match orders while possible
    while (matchedOrders && stockOrderBook.buy.length > 0 && stockOrderBook.sell.length > 0) {
      const topBuy = stockOrderBook.buy[0];
      const topSell = stockOrderBook.sell[0];
      
      // Check if orders can be matched (buy price >= sell price)
      if (topBuy.price >= topSell.price) {
        // Determine execution price (midpoint of bid and ask)
        const executionPrice = (topBuy.price + topSell.price) / 2;
        
        // Determine quantity to trade
        const tradeQuantity = Math.min(topBuy.quantity, topSell.quantity);
        
        // Record the transaction
        const transaction = {
          id: uuidv4(),
          symbol: symbol,
          buyOrderId: topBuy.id,
          sellOrderId: topSell.id,
          price: executionPrice,
          quantity: tradeQuantity,
          timestamp: new Date(),
          buyerId: topBuy.userId,
          sellerId: topSell.userId
        };
        
        marketState.transactions.push(transaction);
        
        // Update order quantities
        topBuy.quantity -= tradeQuantity;
        topSell.quantity -= tradeQuantity;
        
        // Update stock volume
        stock.volume += tradeQuantity;
        
        // Remove fulfilled orders
        if (topBuy.quantity === 0) {
          stockOrderBook.buy.shift();
        }
        
        if (topSell.quantity === 0) {
          stockOrderBook.sell.shift();
        }
        
        // Update last traded price
        stock.price = executionPrice;
        
        // Persist the transaction to the database
        persistTransaction(transaction).catch(err => 
          console.error('Failed to persist transaction:', err)
        );
        
        return transaction;
      } else {
        // No more matches possible
        matchedOrders = false;
      }
    }
    
    return null;
  });
}

// Persist transaction to the database
async function persistTransaction(transaction) {
  try {
    await prisma.transaction.create({
      data: {
        id: transaction.id,
        symbol: transaction.symbol,
        price: transaction.price,
        quantity: transaction.quantity,
        type: 'market',
        buyOrderId: transaction.buyOrderId,
        sellOrderId: transaction.sellOrderId,
        buyerId: transaction.buyerId || null,
        sellerId: transaction.sellerId || null
      }
    });
    
    console.log(`Persisted transaction ${transaction.id} to database`);
    
    // Also update the order status in the database
    await prisma.order.update({
      where: { id: transaction.buyOrderId },
      data: { status: 'executed' }
    });
    
    await prisma.order.update({
      where: { id: transaction.sellOrderId },
      data: { status: 'executed' }
    });
  } catch (error) {
    console.error('Failed to persist transaction:', error);
    throw error;
  }
}

// Update stock prices in the database periodically
async function persistStockPrices() {
  try {
    const updates = Object.values(marketState.stocks).map(stock => {
      return prisma.stock.update({
        where: { symbol: stock.symbol },
        data: {
          price: stock.price,
          change: stock.change,
          changePercent: stock.changePercent,
          volume: stock.volume
        }
      });
    });
    
    await Promise.all(updates);
    
    console.log(`Updated ${updates.length} stock prices in database`);
  } catch (error) {
    console.error('Failed to persist stock prices:', error);
  }
}

// Simulate stock price movements
function simulateStockPrices(io) {
  setInterval(() => {
    Object.keys(stocks).forEach((symbol) => {
      const stock = stocks[symbol];
      const change = (Math.random() - 0.5) * 2; // Random change between -1 and 1
      stock.price = Math.max(1, stock.price + change);
      stock.history.push(stock.price);
      if (stock.history.length > 100) stock.history.shift();

      // Broadcast price update
      io.emit('priceUpdate', { symbol, price: stock.price });
    });
  }, 1000); // Update every second
}

// Place an order in the order book
function placeOrder(order) {
  const { symbol, type, price, quantity } = order;
  const stock = stocks[symbol];
  if (!stock) throw new Error(`Stock ${symbol} not found`);

  const orderBook = stock.orderBook;
  const oppositeType = type === 'buy' ? 'sell' : 'buy';

  // Match orders
  const matches = [];
  orderBook[oppositeType] = orderBook[oppositeType].filter((oppositeOrder) => {
    if (
      (type === 'buy' && price >= oppositeOrder.price) ||
      (type === 'sell' && price <= oppositeOrder.price)
    ) {
      const matchQuantity = Math.min(quantity, oppositeOrder.quantity);
      matches.push({
        price: oppositeOrder.price,
        quantity: matchQuantity,
      });
      oppositeOrder.quantity -= matchQuantity;
      return oppositeOrder.quantity > 0;
    }
    return true;
  });

  // Add remaining order to the book if not fully matched
  if (matches.reduce((sum, match) => sum + match.quantity, 0) < quantity) {
    orderBook[type].push({ price, quantity, id: uuidv4() });
    orderBook[type].sort((a, b) => (type === 'buy' ? b.price - a.price : a.price - b.price));
  }

  return matches;
}

// Get the order book for a stock
function getOrderBook(symbol) {
  const stock = stocks[symbol];
  if (!stock) throw new Error(`Stock ${symbol} not found`);
  return stock.orderBook;
}

// Get the price history for a stock
function getStockHistory(symbol) {
  const stock = stocks[symbol];
  if (!stock) throw new Error(`Stock ${symbol} not found`);
  return stock.history;
}

// Get all stock data
function getAllStockData() {
  return Object.keys(stocks).map((symbol) => ({
    symbol,
    price: stocks[symbol].price,
    history: stocks[symbol].history,
  }));
}

// Setup market simulator
function setupMarketSimulator(io, stockSubscriptions) {
  // Initialize market data
  initializeMarketData().then(() => {
    console.log('Market data initialized');
    
    // Start price update timer
    setInterval(() => {
      updateStockPrices();
      
      // Send updates to subscribed clients
      Object.keys(marketState.stocks).forEach(symbol => {
        const stockData = marketState.stocks[symbol];
        
        if (stockSubscriptions.has(symbol)) {
          const subscribers = stockSubscriptions.get(symbol);
          
          if (subscribers.size > 0) {
            io.to(Array.from(subscribers)).emit('stockUpdate', {
              symbol: stockData.symbol,
              price: stockData.price,
              change: stockData.change,
              changePercent: stockData.changePercent,
              high: stockData.high,
              low: stockData.low,
              volume: stockData.volume,
              lastUpdated: stockData.lastUpdated
            });
          }
        }
      });
      
      // Send full market update less frequently
      if (Math.random() > 0.8) { // Only ~20% of the time to reduce traffic
        io.emit('marketUpdate', marketState.stocks);
      }
    }, MARKET_PARAMS.updateInterval);
    
    // Start order matching timer
    setInterval(() => {
      const transaction = processOrders();
      
      if (transaction) {
        // Emit transaction to all clients
        io.emit('transaction', transaction);
        
        // Emit specific updates to stock subscribers
        if (stockSubscriptions.has(transaction.symbol)) {
          const subscribers = stockSubscriptions.get(transaction.symbol);
          
          if (subscribers.size > 0) {
            io.to(Array.from(subscribers)).emit('orderBookUpdate', {
              symbol: transaction.symbol,
              orderBook: marketState.orderBook[transaction.symbol]
            });
          }
        }
      }
    }, 2000); // Process orders every 2 seconds
    
    // Persist data to DB every minute
    setInterval(() => {
      persistStockPrices();
    }, 60000);
  });
  
  // Simulate stock price movements
  simulateStockPrices(io);

  // Return the market API
  return {
    // Get stock data
    getStockData: (symbol) => {
      return marketState.stocks[symbol];
    },
    
    // Get all stock data
    getAllStockData: () => {
      return marketState.stocks;
    },
    
    // Get order book for a stock
    getOrderBook: (symbol) => {
      return marketState.orderBook[symbol] || { buy: [], sell: [] };
    },
    
    // Get price history for a stock
    getStockHistory: (symbol) => {
      return marketState.lastPrices[symbol] || [];
    },
    
    // Place an order
    placeOrder: (order) => {
      if (!order.symbol || !order.quantity || order.quantity <= 0) {
        throw new Error('Invalid order parameters');
      }
      
      if (!marketState.stocks[order.symbol]) {
        throw new Error('Invalid stock symbol');
      }
      
      // Create order object
      const newOrder = {
        id: uuidv4(),
        userId: order.userId || 'anonymous',
        symbol: order.symbol,
        quantity: order.quantity,
        price: order.price || marketState.stocks[order.symbol].price,
        type: order.type, // 'buy' or 'sell'
        status: 'active',
        created: new Date()
      };
      
      // Add to order book
      if (!marketState.orderBook[order.symbol]) {
        marketState.orderBook[order.symbol] = { buy: [], sell: [] };
      }
      
      marketState.orderBook[order.symbol][order.type].push(newOrder);
      
      // Return success
      return { 
        success: true, 
        orderId: newOrder.id,
        message: `${order.type.toUpperCase()} order for ${order.quantity} shares of ${order.symbol} placed successfully`
      };
    },
    
    // Get market parameters
    getMarketParams: () => {
      return { ...MARKET_PARAMS };
    },
    
    // Set market parameters
    setMarketParams: (params) => {
      Object.assign(MARKET_PARAMS, params);
      return { ...MARKET_PARAMS };
    }
  };
}

export { setupMarketSimulator };