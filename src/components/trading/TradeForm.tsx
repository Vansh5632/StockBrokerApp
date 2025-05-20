import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { marketDataState } from "@/store/marketAtom";
import { portfolioState } from "@/store/portfolioAtom";
import { placeOrder } from "@/utils/socketClient";
import { useSession } from "next-auth/react";

interface Stock {
  symbol: string;
  name?: string;
  quantity?: number;
  purchasePrice?: number;
  currentPrice?: number;
}

interface TradeFormProps {
  stock: Stock | null;
  onComplete: () => void;
}

export default function TradeForm({ stock, onComplete }: TradeFormProps) {
  const { data: session } = useSession();
  const marketData = useRecoilValue(marketDataState);
  const [portfolio, setPortfolio] = useRecoilState(portfolioState);
  
  const [symbol, setSymbol] = useState(stock?.symbol || "AAPL");
  const [qty, setQty] = useState(1);
  const [side, setSide] = useState("buy");
  const [price, setPrice] = useState(0);
  const [orderType, setOrderType] = useState("market"); // "market" or "limit"
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get available symbols
  const availableSymbols = Object.keys(marketData);
  
  // Update symbol if stock prop changes
  useEffect(() => {
    if (stock?.symbol) {
      setSymbol(stock.symbol);
    }
  }, [stock]);
  
  // Update price when symbol changes
  useEffect(() => {
    if (marketData[symbol]) {
      setPrice(marketData[symbol].price);
    }
  }, [symbol, marketData]);
  
  // Calculate total cost
  const totalCost = qty * price;
  
  // Check if user has enough funds/shares
  const hasSufficientFunds = side === "buy" ? portfolio.funds >= totalCost : true;
  
  // Check if user has enough shares to sell
  const currentHolding = portfolio.holdings.find(h => h.symbol === symbol);
  const availableShares = currentHolding?.quantity || 0;
  const hasSufficientShares = side === "sell" ? availableShares >= qty : true;
  
  // Handle trade submission
  const handleTrade = async () => {
    if (!hasSufficientFunds) {
      setStatus("Error: Insufficient funds for this transaction");
      return;
    }
    
    if (!hasSufficientShares) {
      setStatus("Error: Insufficient shares for this transaction");
      return;
    }
    
    setIsProcessing(true);
    setStatus("Processing your order...");
    
    try {
      // Place order via WebSocket
      const orderResult = await placeOrder({
        symbol,
        quantity: qty,
        price,
        type: side as 'buy' | 'sell',
        userId: session?.user?.id || 'anonymous',
      });
      
      // Update local portfolio state immediately for better UX
      // The actual transaction will be processed on the server
      const newPortfolio = { ...portfolio };
      
      if (side === "buy") {
        // Reduce funds immediately
        newPortfolio.funds -= totalCost;
        
        // Check if this stock is already in the portfolio
        const existingIndex = newPortfolio.holdings.findIndex(h => h.symbol === symbol);
        
        if (existingIndex >= 0) {
          // Update existing holding
          const existingHolding = newPortfolio.holdings[existingIndex];
          const newQty = existingHolding.quantity! + qty;
          const newAvgPrice = ((existingHolding.purchasePrice! * existingHolding.quantity!) + (price * qty)) / newQty;
          
          newPortfolio.holdings[existingIndex] = {
            ...existingHolding,
            quantity: newQty,
            purchasePrice: newAvgPrice,
            currentPrice: price,
          };
        } else {
          // Add new holding
          newPortfolio.holdings.push({
            symbol,
            name: marketData[symbol]?.name || symbol,
            quantity: qty,
            purchasePrice: price,
            currentPrice: price,
          });
        }
      } else if (side === "sell") {
        // Increase funds immediately
        newPortfolio.funds += totalCost;
        
        // Find and update the holding
        const existingIndex = newPortfolio.holdings.findIndex(h => h.symbol === symbol);
        
        if (existingIndex >= 0) {
          const existingHolding = newPortfolio.holdings[existingIndex];
          const newQty = existingHolding.quantity! - qty;
          
          if (newQty <= 0) {
            // Remove the holding completely
            newPortfolio.holdings = newPortfolio.holdings.filter((_, i) => i !== existingIndex);
          } else {
            // Update the holding
            newPortfolio.holdings[existingIndex] = {
              ...existingHolding,
              quantity: newQty,
            };
          }
        }
      }
      
      // Add to trade history
      const tradeRecord = {
        symbol,
        quantity: qty,
        price,
        type: side,
        timestamp: new Date().toISOString(),
      };
      
      newPortfolio.tradeHistory = [tradeRecord, ...newPortfolio.tradeHistory];
      
      // Update portfolio state
      setPortfolio(newPortfolio);
      
      // Save portfolio changes to the server
      await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPortfolio),
      });
      
      setStatus(`Order placed successfully! ${side.toUpperCase()} ${qty} shares of ${symbol} at $${price.toFixed(2)}`);
      setTimeout(onComplete, 2000);
    } catch (error) {
      console.error("Trade error:", error);
      setStatus(`Error: ${error instanceof Error ? error.message : "Failed to place order"}`);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {stock ? `Trade ${stock.symbol}` : 'New Trade'}
      </h2>
      
      <div className="space-y-4">
        {/* Symbol selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Symbol
          </label>
          <select 
            value={symbol} 
            onChange={(e) => setSymbol(e.target.value)}
            disabled={!!stock}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {availableSymbols.map((sym) => (
              <option key={sym} value={sym}>
                {sym} - {marketData[sym]?.name || sym}
              </option>
            ))}
          </select>
        </div>
        
        {/* Trade type selector */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSide("buy")}
            className={`flex-1 py-2 rounded-md font-medium ${
              side === "buy"
                ? "bg-green-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => setSide("sell")}
            className={`flex-1 py-2 rounded-md font-medium ${
              side === "sell"
                ? "bg-red-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Sell
          </button>
        </div>
        
        {/* Order type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Order Type
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setOrderType("market")}
              className={`flex-1 py-2 rounded-md text-sm font-medium ${
                orderType === "market"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Market
            </button>
            <button
              type="button"
              onClick={() => setOrderType("limit")}
              className={`flex-1 py-2 rounded-md text-sm font-medium ${
                orderType === "limit"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Limit
            </button>
          </div>
        </div>
        
        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 0))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        
        {/* Price (for limit orders) */}
        {orderType === "limit" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Limit Price
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        )}
        
        {/* Current price display (for market orders) */}
        <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-md">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Current Price:</span>
            <span className="font-medium text-gray-900 dark:text-white">${price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500 dark:text-gray-400">Total Value:</span>
            <span className="font-medium text-gray-900 dark:text-white">${(qty * price).toFixed(2)}</span>
          </div>
          {side === "buy" && (
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500 dark:text-gray-400">Your Balance:</span>
              <span className="font-medium text-gray-900 dark:text-white">${portfolio.funds.toFixed(2)}</span>
            </div>
          )}
          {side === "sell" && (
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500 dark:text-gray-400">Available Shares:</span>
              <span className="font-medium text-gray-900 dark:text-white">{availableShares}</span>
            </div>
          )}
        </div>
        
        {/* Submit button */}
        <button
          onClick={handleTrade}
          disabled={isProcessing || !hasSufficientFunds || !hasSufficientShares}
          className={`w-full py-3 rounded-md font-medium text-white ${
            !hasSufficientFunds || !hasSufficientShares
              ? "bg-gray-400 cursor-not-allowed"
              : side === "buy"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isProcessing 
            ? "Processing..." 
            : `${side === "buy" ? "Buy" : "Sell"} ${qty} shares for $${(price * qty).toFixed(2)}`}
        </button>
        
        {/* Status message */}
        {status && (
          <div className={`mt-2 p-3 rounded-md text-sm ${
            status.includes("Error")
              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
          }`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
