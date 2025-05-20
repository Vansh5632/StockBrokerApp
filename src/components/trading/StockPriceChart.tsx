import { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { useRecoilValue } from 'recoil';
import { stockPriceHistoryState } from '@/store/marketAtom';
import { getStockHistory, subscribeToStock, unsubscribeFromStock } from '@/utils/socketClient';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

interface StockPriceChartProps {
  symbol: string;
  timeframe?: string; // 1D, 1W, 1M, 3M, 1Y
  height?: number;
  showControls?: boolean;
}

export default function StockPriceChart({ 
  symbol, 
  timeframe = '1D', 
  height = 300,
  showControls = true
}: StockPriceChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
  const [priceData, setPriceData] = useState<number[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [timestamps, setTimestamps] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get historical stock price data from Recoil state
  const priceHistoryMap = useRecoilValue(stockPriceHistoryState);
  
  // Chart reference for updating
  const chartRef = useRef<Chart | null>(null);
  
  // Initialize and manage price history
  useEffect(() => {
    const initPriceHistory = async () => {
      try {
        setIsLoading(true);
        
        // Try to get data from our Recoil state first
        if (priceHistoryMap[symbol]) {
          setPriceData(priceHistoryMap[symbol]);
        } else {
          // If not available, fetch via WebSocket
          const history = await getStockHistory(symbol);
          setPriceData(history as number[]);
        }
        
        // Subscribe to real-time updates
        subscribeToStock(symbol);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load price history:', err);
        setError('Failed to load price history. Please try again later.');
        setIsLoading(false);
      }
    };
    
    initPriceHistory();
    
    // Cleanup: unsubscribe when unmounted
    return () => {
      unsubscribeFromStock(symbol);
    };
  }, [symbol]);
  
  // Generate timestamps based on the selected timeframe
  useEffect(() => {
    const now = new Date();
    const newTimestamps: Date[] = [];
    
    // Generate timestamps based on the amount of price data we have
    if (priceData.length > 0) {
      const intervalMs = getIntervalFromTimeframe(selectedTimeframe);
      const totalDataPoints = priceData.length;
      
      for (let i = totalDataPoints - 1; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - (i * intervalMs));
        newTimestamps.push(timestamp);
      }
      
      setTimestamps(newTimestamps);
    }
  }, [priceData.length, selectedTimeframe]);
  
  // Update chart data when prices or timestamps change
  useEffect(() => {
    if (priceData.length > 0 && timestamps.length > 0) {
      const trend = priceData[0] < priceData[priceData.length - 1] ? 'up' : 'down';
      
      const newChartData = {
        labels: timestamps,
        datasets: [
          {
            label: symbol,
            data: priceData,
            borderColor: trend === 'up' ? 'rgba(16, 185, 129, 1)' : 'rgba(239, 68, 68, 1)',
            backgroundColor: trend === 'up' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 2,
          }
        ]
      };
      
      setChartData(newChartData);
    }
  }, [priceData, timestamps, symbol]);
  
  // Helper function to determine interval based on timeframe
  const getIntervalFromTimeframe = (tf: string): number => {
    switch (tf) {
      case '1D': return 60000; // 1 minute
      case '1W': return 900000; // 15 minutes
      case '1M': return 3600000; // 1 hour
      case '3M': return 14400000; // 4 hours
      case '1Y': return 86400000; // 1 day
      default: return 60000;
    }
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context: any) => `$${context.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: selectedTimeframe === '1D' ? 'hour' : 
                selectedTimeframe === '1W' ? 'day' : 
                selectedTimeframe === '1M' ? 'day' : 
                selectedTimeframe === '3M' ? 'month' : 'month',
          tooltipFormat: selectedTimeframe === '1D' ? 'HH:mm' : 'MMM d, yyyy',
          displayFormats: {
            hour: 'HH:mm',
            day: 'MMM d',
            month: 'MMM yyyy',
          }
        },
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          font: {
            size: 10,
          },
          color: 'rgba(156, 163, 175, 1)',
          maxTicksLimit: 6,
        },
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          font: {
            size: 10,
          },
          color: 'rgba(156, 163, 175, 1)',
          callback: (value: number) => `$${value.toFixed(2)}`,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    animation: {
      duration: 0, // Disable animations for better performance
    }
  };
  
  // Available timeframes
  const timeframes = ['1D', '1W', '1M', '3M', '1Y'];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      {/* Chart header with controls */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {symbol} Price Chart
        </h3>
        
        {showControls && (
          <div className="flex gap-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                className={`px-3 py-1 text-xs font-medium rounded-md ${
                  selectedTimeframe === tf
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSelectedTimeframe(tf)}
              >
                {tf}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Chart container */}
      <div style={{ height: `${height}px` }} className="relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80">
            <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-red-500 dark:text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        ) : chartData && (
          <Line 
            data={chartData} 
            options={chartOptions}
            ref={(reference) => {
              if (reference) {
                chartRef.current = reference;
              }
            }}
          />
        )}
      </div>
      
      {/* Current price indicator */}
      {priceData.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Current</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              ${priceData[priceData.length - 1].toFixed(2)}
            </div>
          </div>
          
          {/* Change indicator */}
          {priceData.length > 1 && (
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Change</div>
              <div className={`text-sm font-medium ${
                priceData[priceData.length - 1] >= priceData[0]
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {((priceData[priceData.length - 1] - priceData[0]) / priceData[0] * 100).toFixed(2)}%
                {priceData[priceData.length - 1] >= priceData[0] ? ' ↑' : ' ↓'}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}