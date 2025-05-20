import { useState, useEffect } from 'react';
import { useOrderBook, subscribeToStock, unsubscribeFromStock } from '@/utils/socketClient';
import { OrderBookEntry } from '@/store/marketAtom';

interface OrderBookProps {
  symbol: string;
  maxDepth?: number; // Maximum number of price levels to show on each side
}

// Helper function to format numbers with commas
const formatNumber = (num: number): string => {
  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

// Helper function to aggregate orders by price level
const aggregateOrdersByPrice = (
  orders: OrderBookEntry[],
  maxDepth: number
): { price: number; quantity: number; total: number }[] => {
  if (!orders || orders.length === 0) return [];
  
  // Group by price level
  const aggregated = orders.reduce<Record<number, number>>((acc, order) => {
    const price = Number(order.price.toFixed(2)); // Round to 2 decimal places
    acc[price] = (acc[price] || 0) + order.quantity;
    return acc;
  }, {});
  
  // Convert to array of price/quantity objects
  const result = Object.entries(aggregated).map(([priceStr, quantity]) => {
    const price = parseFloat(priceStr);
    return { price, quantity, total: price * quantity };
  });
  
  // Sort by price (ascending for sells, descending for buys)
  const sortedResult = orders[0]?.type === 'sell' 
    ? result.sort((a, b) => a.price - b.price)
    : result.sort((a, b) => b.price - a.price);
  
  // Limit to maxDepth
  return sortedResult.slice(0, maxDepth);
};

export default function OrderBook({ symbol, maxDepth = 10 }: OrderBookProps) {
  const orderBook = useOrderBook(symbol);
  
  // Calculate spread between highest bid and lowest ask
  const highestBid = orderBook?.buy[0]?.price || 0;
  const lowestAsk = orderBook?.sell[0]?.price || 0;
  const spread = lowestAsk - highestBid;
  const spreadPercentage = highestBid ? (spread / highestBid) * 100 : 0;

  // Aggregate orders by price level
  const buyLevels = aggregateOrdersByPrice(orderBook?.buy || [], maxDepth);
  const sellLevels = aggregateOrdersByPrice(orderBook?.sell || [], maxDepth);
  
  // Calculate totals for volume visualization
  const maxBuyVolume = Math.max(...buyLevels.map(level => level.quantity), 1);
  const maxSellVolume = Math.max(...sellLevels.map(level => level.quantity), 1);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Order Book: {symbol}
      </h3>
      
      {/* Spread indicator */}
      <div className="flex justify-between items-center py-2 px-4 mb-2 bg-gray-50 dark:bg-gray-700/50 rounded-md">
        <span className="text-sm text-gray-500 dark:text-gray-400">Spread</span>
        <div className="text-right">
          <span className="font-medium text-gray-900 dark:text-white">
            ${spread.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
            ({spreadPercentage.toFixed(2)}%)
          </span>
        </div>
      </div>
      
      {/* Order book table */}
      <div className="relative overflow-hidden">
        <div className="grid grid-cols-3 gap-0 text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 px-2">
          <div className="text-left">Size</div>
          <div className="text-center">Price</div>
          <div className="text-right">Size</div>
        </div>
        
        <div className="relative">
          {/* Sell orders (asks) */}
          <div className="space-y-0.5 mb-2">
            {sellLevels.map((level, i) => (
              <div key={`sell-${level.price}`} className="grid grid-cols-3 gap-0 relative">
                <div className="text-right pr-2"></div>
                <div className="text-center font-medium text-red-600 dark:text-red-400">
                  ${level.price.toFixed(2)}
                </div>
                <div className="text-right relative z-10 pr-2">
                  {formatNumber(level.quantity)}
                  
                  {/* Volume visualization */}
                  <div 
                    className="absolute inset-y-0 right-0 bg-red-100 dark:bg-red-900/20 z-0"
                    style={{ width: `${(level.quantity / maxSellVolume) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Price marker */}
          <div className="py-1 px-2 bg-gray-100 dark:bg-gray-700 text-center text-sm font-semibold text-gray-900 dark:text-white mb-2">
            ${(orderBook?.buy[0]?.price || 0).toFixed(2)}
          </div>
          
          {/* Buy orders (bids) */}
          <div className="space-y-0.5">
            {buyLevels.map((level, i) => (
              <div key={`buy-${level.price}`} className="grid grid-cols-3 gap-0 relative">
                <div className="text-right relative z-10 pr-2">
                  {formatNumber(level.quantity)}
                  
                  {/* Volume visualization */}
                  <div 
                    className="absolute inset-y-0 left-0 bg-green-100 dark:bg-green-900/20 z-0"
                    style={{ width: `${(level.quantity / maxBuyVolume) * 100}%` }}
                  />
                </div>
                <div className="text-center font-medium text-green-600 dark:text-green-400">
                  ${level.price.toFixed(2)}
                </div>
                <div className="text-right pr-2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Order book statistics */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
          <div className="text-gray-500 dark:text-gray-400">Buy Orders</div>
          <div className="font-medium text-gray-900 dark:text-white">
            {orderBook?.buy?.length || 0}
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
          <div className="text-gray-500 dark:text-gray-400">Sell Orders</div>
          <div className="font-medium text-gray-900 dark:text-white">
            {orderBook?.sell?.length || 0}
          </div>
        </div>
      </div>
    </div>
  );
}