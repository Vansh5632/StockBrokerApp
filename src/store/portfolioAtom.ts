import { atom } from 'recoil';

export const portfolioState = atom({
  key: 'portfolioState',
  default: {
    funds: 100000,
    stocks: [],
    history:[],
  }
});