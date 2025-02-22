import { atom } from "recoil";

export const watchlistState = atom({
  key: "watchlistState",
  default: [
    { symbol: "AAPL", name: "Apple Inc.", price: 175.60, change: "+1.5%" },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 2805.50, change: "-0.8%" },
  ],
});
