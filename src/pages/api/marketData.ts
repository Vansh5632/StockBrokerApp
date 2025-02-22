import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { symbol } = req.query;

    if (!symbol || typeof symbol !== 'string') {
        return res.status(400).json({ error: "Symbol is required" });
    }

    const API_KEY = process.env.API_KEY;
    const API_URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data["Global Quote"]) {
            res.status(200).json({
                symbol: data["Global Quote"]["01. symbol"],
                price: parseFloat(data["Global Quote"]["05. price"]),
                change: parseFloat(data["Global Quote"]["09. change"]),
                percentChange: data["Global Quote"]["10. change percent"]
            });
        } else {
            res.status(404).json({ error: "Stock data not found" });
        }
    } catch {
        res.status(500).json({ error: "Failed to fetch market data" });
    }
}