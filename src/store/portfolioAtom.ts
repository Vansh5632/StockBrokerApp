import {atom} from "recoil";

interface Portfolio {
    funds: number;
    stocks: [];
}

export const portfolioState = atom<Portfolio>({
    key: "portfolioState",
    default: {
        funds: 10000,
        stocks: []
    },
});