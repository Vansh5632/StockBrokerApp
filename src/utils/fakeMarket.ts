interface Stock {
    name: string;
    price: number;
}

const stocks: Record<string, Stock> = {
    AAPL: { name: "Apple Inc.", price: 150 },
    TSLA: { name: "Tesla Inc.", price: 800 },
    MSFT: { name: "Microsoft Corp.", price: 300 },
    AMZN: { name: "Amazon.com Inc.", price: 3500 },
};

// Function to randomly change stock prices
export function getFakeMarketData(): Record<string, Stock> {
    Object.keys(stocks).forEach((symbol) => {
        const change = (Math.random() - 0.5) * 5; // Random price change (-2.5% to +2.5%)
        stocks[symbol].price = Math.max(1, stocks[symbol].price + change); // Prevent negative prices
    });

    return stocks;
}