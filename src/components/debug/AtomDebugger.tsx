// src/components/debug/AtomDebugger.tsx
import React from 'react';
import { useRecoilValue } from 'recoil';
import { marketDataState, stockPricesState } from '@/store/marketAtom';
import { portfolioState } from '@/store/portfolioAtom';
import { watchlistState } from '@/store/watchlistAtom';

export default function AtomDebugger() {
  const marketData = useRecoilValue(marketDataState);
  const stockPrices = useRecoilValue(stockPricesState);
  const portfolio = useRecoilValue(portfolioState);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Atom State Debugger</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium">Market Data State:</h4>
          <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-2 rounded overflow-auto max-h-32">
            {JSON.stringify(marketData, null, 2)}
          </pre>
        </div>
        
        <div>
          <h4 className="font-medium">Stock Prices State:</h4>
          <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-2 rounded overflow-auto max-h-32">
            {JSON.stringify(stockPrices, null, 2)}
          </pre>
        </div>
        
        <div>
          <h4 className="font-medium">Portfolio State:</h4>
          <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-2 rounded overflow-auto max-h-32">
            {JSON.stringify(portfolio, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
