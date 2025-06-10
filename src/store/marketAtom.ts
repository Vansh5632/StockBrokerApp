import { atom } from "recoil";

// Stock data interface
export interface StockData {
  symbol: string;
  name?: string;
  price: number;
  previousClose?: number;
  open?: number;
  high?: number;
  low?: number;
  volume?: number;
  change?: number;
  changePercent?: number;
  lastUpdated?: Date;
}

// Order book state for current stock
export interface OrderBookEntry {
  id: string;
  type: 'buy' | 'sell';
  price: number;
  quantity: number;
  userId?: string;
  timestamp?: Date;
  status?: string;
}

// Full market data state
export const marketDataState = atom<Record<string, StockData>>({
  key: "vbroker_marketDataState",
  default: {},
});

// Simple stock prices state (for backward compatibility)
export const stockPricesState = atom<Record<string, number>>({
  key: "vbroker_stockPricesState",
  default: {},
});

// Stock price history for charts
export const stockPriceHistoryState = atom<Record<string, number[]>>({
  key: "vbroker_stockPriceHistoryState",
  default: {},
});

// Order book state
export const orderBookState = atom<Record<string, { buy: OrderBookEntry[]; sell: OrderBookEntry[] }>>({
  key: "vbroker_orderBookState",
  default: {},
});

// Recently executed transactions
export interface Transaction {
  id: string;
  symbol: string;
  price: number;
  quantity: number;
  buyOrderId: string;
  sellOrderId: string;
  timestamp: Date;
  buyerId?: string;
  sellerId?: string;
}

export const transactionsState = atom<Transaction[]>({
  key: "vbroker_transactionsState",
  default: [],
});

// Market parameters state
export const marketParametersState = atom<{
  baseVolatility: number;
  marketSentiment: number;
  tradingVolumeFactor: number;
  updateInterval: number;
  orderImpactFactor: number;
  momentumFactor: number;
}>({
  key: "vbroker_marketParametersState",
  default: {
    baseVolatility: 0.002,
    marketSentiment: 0,
    tradingVolumeFactor: 0.5,
    updateInterval: 1000,
    orderImpactFactor: 0.001,
    momentumFactor: 0.3,
  },
});

// Socket connection status
export const socketConnectionState = atom<{
  connected: boolean;
  error: string | null;
}>({
  key: "vbroker_socketConnectionState",
  default: {
    connected: false,
    error: null,
  },
});

// Subscribed symbols for WebSocket
export const subscribedSymbolsState = atom<string[]>({
  key: "vbroker_subscribedSymbolsState",
  default: [],
});
