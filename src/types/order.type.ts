export interface Order {
    id: string;
    stock: string;
    symbol: string;
    type: "buy" | "sell";
    quantity: number;
    price: number;
    profitLoss: number;
    date: string;
    buyPrice: number;
    name: string;
    createdAt: string;
}
