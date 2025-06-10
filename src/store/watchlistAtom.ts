import { atom } from "recoil";

// Define the Stock type with enhanced properties
interface Stock {
  name: string;
  symbol: string;
  price: number;
  quantity: number;
  change?: number;
  changePercent?: number;
  high?: number;
  low?: number;
  volume?: number;
  lastUpdated?: Date;
}

// Enhanced fake stock data (Simulated Market) with more realistic prices
const availableStocks: Stock[] = [
  { name: "Apple Inc.", symbol: "AAPL", price: 190.50, quantity: 0 },
  { name: "Tesla, Inc.", symbol: "TSLA", price: 175.40, quantity: 0 },
  { name: "NVIDIA Corporation", symbol: "NVDA", price: 950.80, quantity: 0 },
  { name: "Amazon.com, Inc.", symbol: "AMZN", price: 178.30, quantity: 0 },
  { name: "Microsoft Corporation", symbol: "MSFT", price: 405.75, quantity: 0 },
  { name: "Alphabet Inc.", symbol: "GOOGL", price: 160.20, quantity: 0 },
  { name: "Meta Platforms, Inc.", symbol: "META", price: 485.60, quantity: 0 },
  { name: "Advanced Micro Devices, Inc.", symbol: "AMD", price: 172.30, quantity: 0 },
  { name: "Intel Corporation", symbol: "INTC", price: 30.15, quantity: 0 },
  { name: "Netflix, Inc.", symbol: "NFLX", price: 625.80, quantity: 0 }
];

// Define the type of the watchlist state
const watchlistState = atom<Stock[]>({
  key: "vbroker_watchlistState",
  default: [],
});

export { watchlistState, availableStocks };
export type { Stock };

