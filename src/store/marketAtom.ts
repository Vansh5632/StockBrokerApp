import { atom } from "recoil";

export const stockPricesState = atom<{ [key: string]: number }>({
  key: "stockPricesState",
  default: {
    AAPL: 150.0,
    NVDA: 500.0,
    TSLA: 200.0,
    AMZN: 3200.0,
    MSFT: 290.0,
  },
});
