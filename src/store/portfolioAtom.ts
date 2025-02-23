import { atom } from 'recoil';

export const portfolioState = atom({
  key: 'portfolioState',
  default: {
    funds: 0,
    stocks: [],
    history:[],
  }
});