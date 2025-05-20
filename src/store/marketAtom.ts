import { atom } from "recoil";

// Market data interface
export interface StockPrice {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  lastUpdated: Date;
}

// Full market data state
export const marketDataState = atom<Record<string, StockPrice>>({
  key: "marketData",
  default: {},
});

// Stock prices for backward compatibility
export const stockPricesState = atom<{ [key: string]: number }>({
  key: "stockPrices",
  default: {
    AAPL: 150.0,
    NVDA: 500.0,
    TSLA: 200.0,
    AMZN: 3200.0,
    MSFT: 290.0,
  },
});

// Market indices state
export const marketIndicesState = atom<Array<{ name: string; value: number; change: number }>>({
  key: "marketIndices",
  default: [
    { name: "S&P 500", value: 5328.27, change: 0.28 },
    { name: "Nasdaq", value: 16748.33, change: 0.43 },
    { name: "Dow Jones", value: 38799.50, change: -0.12 },
    { name: "Russell 2000", value: 2079.56, change: 0.16 }
  ],
});

// Market sentiment state (ranges from -1 to 1)
export const marketSentimentState = atom<number>({
  key: "marketSentiment",
  default: 0, // Neutral
});

// Order book state for current stock
export interface OrderBookEntry {
  id: string;
  userId: string;
  symbol: string;
  quantity: number;
  price: number;
  type: 'buy' | 'sell';
  status: string;
  created: Date;
}

export interface OrderBook {
  buy: OrderBookEntry[];
  sell: OrderBookEntry[];
}

export const orderBookState = atom<Record<string, OrderBook>>({
  key: "orderBook",
  default: {},
});

// Stock price history for charts
export const stockPriceHistoryState = atom<Record<string, number[]>>({
  key: "stockPriceHistory",
  default: {},
});

// Recently executed transactions
export interface Transaction {
  id: string;
  symbol: string;
  buyOrderId: string;
  sellOrderId: string;
  price: number;
  quantity: number;
  timestamp: Date;
  buyerId?: string;
  sellerId?: string;
}

export const recentTransactionsState = atom<Transaction[]>({
  key: "recentTransactions",
  default: [],
});
