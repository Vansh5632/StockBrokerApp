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
];
