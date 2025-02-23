import { atom } from "recoil";

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  quantity?: number;
}

// Initial Watchlist
export const watchlistState = atom<Stock[]>({
  key: "watchlistState",
  default: [
    { symbol: "AAPL", name: "Apple", price: 150.0 },
    { symbol: "NVDA", name: "Nvidia", price: 500.0 },
    { symbol: "TSLA", name: "Tesla", price: 200.0 },
  ],
});

// Available stocks to search and add
export const availableStocks = [
  { symbol: "AAPL", name: "Apple" },
  { symbol: "NVDA", name: "Nvidia" },
  { symbol: "TSLA", name: "Tesla" },
  { symbol: "GOOGL", name: "Alphabet (Google)" },
  { symbol: "AMZN", name: "Amazon" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "META", name: "Meta (Facebook)" },
  { symbol: "NFLX", name: "Netflix" },
  { symbol: "AMD", name: "AMD" },
  { symbol: "BABA", name: "Alibaba" },
];
