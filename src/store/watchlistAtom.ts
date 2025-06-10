import { atom } from "recoil";

// Define the Stock type
interface Stock {
  name: string;
  symbol: string;
  price: number;
  quantity: number;
}

// Fake stock data (Simulated Market)
const availableStocks: Stock[] = [
  { name: "Apple Inc.", symbol: "AAPL", price: 175, quantity: 0 },
  { name: "Tesla, Inc.", symbol: "TSLA", price: 850, quantity: 0 },
  { name: "NVIDIA Corporation", symbol: "NVDA", price: 450, quantity: 0 },
  { name: "Amazon.com, Inc.", symbol: "AMZN", price: 3300, quantity: 0 },
];

// Define the type of the watchlist state
const watchlistState = atom<Stock[]>({
  key: "vbroker_watchlistState",
  default: [],
});

export { watchlistState, availableStocks };  export type { Stock };

