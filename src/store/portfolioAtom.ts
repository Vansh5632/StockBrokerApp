import { atom } from 'recoil';

interface TradeHistory {
  type: string;
  symbol: string;
  quantity: number;
  buyPrice: number;
  sellPrice: number;
}

export const portfolioState = atom({
  key: 'vbroker_portfolioState',
  default: {
    funds: 100000,
    holdings: [] as any[],
    stocks: [] as any[],
    history: [] as any[],
    tradeHistory: [] as TradeHistory[],
  }
});