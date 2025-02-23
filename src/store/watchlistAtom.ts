import { atom } from "recoil";

export const watchlistState = atom({
  key: "watchlistState",
  default: [],
});

export const availableStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 175.60, change: "+1.5%" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 2805.50, change: "-0.8%" },
  { symbol: "TSLA", name: "Tesla Inc.", price: 750.00, change: "+2.3%" },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 3400.00, change: "-0.5%" },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 299.35, change: "+0.7%" },
  { symbol: "FB", name: "Meta Platforms Inc.", price: 355.64, change: "+1.2%" },
  { symbol: "NFLX", name: "Netflix Inc.", price: 590.65, change: "-1.1%" },
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 220.50, change: "+3.0%" },
  { symbol: "BABA", name: "Alibaba Group Holding Limited", price: 160.00, change: "-2.0%" },
  { symbol: "INTC", name: "Intel Corporation", price: 55.00, change: "+0.5%" },
];
