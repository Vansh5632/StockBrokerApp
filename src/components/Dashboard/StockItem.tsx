import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { watchlistState, Stock } from "../../store/watchlistAtom";
import { portfolioState } from "../../store/portfolioAtom";

export default function StockItem({ 
    symbol, 
    name, 
    price, 
    quantity: initialQuantity, 
    onRemove 
}: Stock & { onRemove: (symbol: string) => void }) {
    const [watchlist, setWatchlist] = useRecoilState(watchlistState);
    const [portfolio, setPortfolio] = useRecoilState(portfolioState);
    const [tradeQuantity, setTradeQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [currentPrice, setCurrentPrice] = useState(price);

    // Get the most up-to-date quantity from the watchlist state instead of props
    const getCurrentStock = () => {
        return watchlist.find(stock => stock.symbol === symbol);
    };

    // Simulate stock price fluctuations
    useEffect(() => {
        const intervalId = setInterval(() => {
            const priceChange = (Math.random() * 0.02 - 0.01) * price; // Random change between -1% to +1%
            const newPrice = Math.max(0, currentPrice + priceChange);
            setCurrentPrice(newPrice);

            // Update watchlist stock price
            setWatchlist((prev) => {
                return prev.map((stock) =>
                    stock.symbol === symbol
                        ? {
                            symbol: stock.symbol,
                            name: stock.name,
                            price: newPrice,
                            quantity: stock.quantity
                        }
                        : stock
                );
            });
        }, 5000);

        return () => clearInterval(intervalId);
    }, [price, symbol, setWatchlist, currentPrice]);

    // Handle Buy/Sell Transactions
    const updateStockQuantity = async (type: "buy" | "sell") => {
        const currentStock = getCurrentStock();
        const currentQuantity = currentStock?.quantity || 0;

        // Validate sell operation
        if (type === "sell" && currentQuantity < tradeQuantity) {
            alert("Not enough shares to sell!");
            return;
        }

        setLoading(true);

        try {
            // First get the current state to avoid race conditions
            const currentPortfolioState = { ...portfolio };
            const currentHoldings = [...(currentPortfolioState.holdings || [])];
            const currentTradeHistory = [...(currentPortfolioState.tradeHistory || [])];
            const currentFunds = currentPortfolioState.funds || 0;
            
            // Find stock in holdings
            const stockIndex = currentHoldings.findIndex(h => h.symbol === symbol);
            
            // Calculate transaction value
            const transactionValue = currentPrice * tradeQuantity;
            
            // Create a new trade record
            const tradeRecord = {
                symbol,
                name,
                buyPrice: type === "buy" ? currentPrice : (stockIndex !== -1 ? currentHoldings[stockIndex].buyPrice : currentPrice),
                sellPrice: type === "sell" ? currentPrice : null,
                quantity: tradeQuantity,
                type,
                timestamp: new Date().toISOString(),
            };
            
            // Update funds
            let updatedFunds = currentFunds;
            if (type === "buy") {
                updatedFunds -= transactionValue;
            } else { // sell
                updatedFunds += transactionValue;
            }
            
            // Update holdings
            let updatedHoldings = [...currentHoldings];
            if (type === "buy") {
                if (stockIndex !== -1) {
                    // Update existing holding
                    const currentHolding = { ...currentHoldings[stockIndex] };
                    const newQuantity = currentHolding.quantity + tradeQuantity;
                    // Calculate new average buy price
                    const newBuyPrice = ((currentHolding.buyPrice * currentHolding.quantity) + 
                                        (currentPrice * tradeQuantity)) / newQuantity;
                    
                    updatedHoldings[stockIndex] = {
                        ...currentHolding,
                        quantity: newQuantity,
                        buyPrice: newBuyPrice
                    };
                } else {
                    // Add new holding
                    updatedHoldings.push({
                        symbol,
                        name,
                        buyPrice: currentPrice,
                        quantity: tradeQuantity
                    });
                }
            } else if (type === "sell" && stockIndex !== -1) {
                const currentHolding = { ...currentHoldings[stockIndex] };
                const newQuantity = currentHolding.quantity - tradeQuantity;
                
                if (newQuantity <= 0) {
                    // Remove the holding completely
                    updatedHoldings = updatedHoldings.filter((_, index) => index !== stockIndex);
                } else {
                    // Update the holding quantity
                    updatedHoldings[stockIndex] = {
                        ...currentHolding,
                        quantity: newQuantity
                    };
                }
            }
            
            // Update portfolio state with all new values
            setPortfolio({
                funds: updatedFunds,
                holdings: updatedHoldings,
                tradeHistory: [...currentTradeHistory, tradeRecord]
            });
            
            // Update watchlist quantity
            setWatchlist(prev => {
                return prev.map(stock => {
                    if (stock.symbol === symbol) {
                        return {
                            ...stock,
                            quantity: type === "buy" 
                                ? (stock.quantity || 0) + tradeQuantity 
                                : Math.max((stock.quantity || 0) - tradeQuantity, 0)
                        };
                    }
                    return stock;
                });
            });
            
            // Simulate API call
            await fetch("/api/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    symbol,
                    name,
                    price: currentPrice,
                    quantity: tradeQuantity,
                    type,
                }),
            });
        } catch (error) {
            console.error("Error processing transaction:", error);
            alert("Failed to process the transaction. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Get current quantity from watchlist rather than using the prop
    const currentStock = getCurrentStock();
    const currentQuantity = currentStock?.quantity ?? initialQuantity;

    return (
        <li className="flex justify-between items-center p-4 border rounded-lg shadow-md bg-gray-800 text-white">
            <div>
                <p className="font-semibold">{name} ({symbol})</p>
                <p className="text-gray-400">💰 ${currentPrice.toFixed(2)}</p>
                <p className="text-gray-400">📦 Holdings: {currentQuantity}</p>
            </div>
            <div className="flex gap-2 items-center">
                <input
                    type="number"
                    min="1"
                    value={tradeQuantity}
                    onChange={(e) => setTradeQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="bg-gray-700 text-white w-14 p-1 border rounded-md text-center"
                />
                <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                    onClick={() => updateStockQuantity("buy")}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Buy"}
                </button>
                <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    onClick={() => updateStockQuantity("sell")}
                    disabled={loading || currentQuantity < tradeQuantity}
                >
                    {loading ? "Processing..." : "Sell"}
                </button>
                <button 
                    className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-500" 
                    onClick={() => onRemove(symbol)}
                >
                    ❌
                </button>
            </div>
        </li>
    );
}