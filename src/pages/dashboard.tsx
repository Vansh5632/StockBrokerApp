import PortfolioSummary from "@/components/Dashboard/PortfolioSummary";
import QuickTrade from "@/components/Dashboard/QuickTrade";
import TransactionHistory from "@/components/Dashboard/TransactionHistory";
import Watchlist from "@/components/Dashboard/Watchlist";
import Footer from "@/components/layout/Footer";
import LiveStockPrice from "@/components/trading/LiveStockPrice";
import MarketOverview from "@/components/Dashboard/MarketOverview";
import MarketNews from "@/components/Dashboard/MarketNews";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = useSession();
  const [userName, setUserName] = useState("Trader");
  
  useEffect(() => {
    if (session?.user?.name) {
      // Extract first name only
      const firstName = session.user.name.split(' ')[0];
      setUserName(firstName);
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Top navigation bar */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-indigo-700 dark:text-indigo-400">
                <span className="text-accent">V</span>broker
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                Dashboard
              </Link>
              <Link href="/marketoverview" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                Markets
              </Link>
              <Link href="/portfolio" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                Portfolio
              </Link>
              <Link href="/orders" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                Orders
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 px-3 py-1.5 rounded-full text-sm">
                <span className="hidden sm:inline">Balance: </span>${session?.user?.funds || 10000}
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                  {userName?.charAt(0) || 'T'}
                </div>
                <span className="hidden md:inline font-medium">{userName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6">
        {/* Welcome section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Welcome back, {userName} 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your portfolio today
          </p>
        </div>
        
        {/* Bento grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Summary - Span 1 column on larger screens */}
          <div className="col-span-1 row-span-1">
            <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4">
                <h2 className="text-lg font-semibold text-white">Portfolio Summary</h2>
              </div>
              <div className="p-4">
                <PortfolioSummary />
              </div>
            </div>
          </div>
          
          {/* Market Overview - Span 2 columns on larger screens */}
          <div className="col-span-1 lg:col-span-2 row-span-1">
            <MarketOverview />
          </div>
          
          {/* Watchlist - Span 1 column */}
          <div className="col-span-1 row-span-1">
            <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                <h2 className="text-lg font-semibold text-white">Watchlist</h2>
              </div>
              <div className="p-4 h-[400px] overflow-y-auto scrollbar-hide">
                <Watchlist />
              </div>
            </div>
          </div>
          
          {/* Quick Trade - Span 1 column */}
          <div className="col-span-1 row-span-1">
            <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-4">
                <h2 className="text-lg font-semibold text-white">Quick Trade</h2>
              </div>
              <div className="p-4">
                <QuickTrade />
              </div>
            </div>
          </div>
          
          {/* Market News - Span 1 column */}
          <div className="col-span-1 row-span-1 order-last lg:order-none">
            <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">Market News</h2>
                <span className="text-xs text-teal-200 bg-teal-800/50 px-2 py-1 rounded-full">LIVE</span>
              </div>
              <div className="p-4 h-[400px] overflow-y-auto scrollbar-hide">
                <MarketNews />
              </div>
            </div>
          </div>
          
          {/* Live Tickers - Span 1 column */}
          <div className="col-span-1 row-span-1">
            <div className="grid grid-cols-1 gap-4">
              {/* NVDA */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-3 flex justify-between items-center">
                  <h2 className="text-sm font-semibold text-white">NVDA</h2>
                  <div className="text-xs text-purple-200">Live Price</div>
                </div>
                <div className="p-3">
                  <LiveStockPrice symbol="NVDA" />
                </div>
              </div>
              
              {/* AAPL */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-3 flex justify-between items-center">
                  <h2 className="text-sm font-semibold text-white">AAPL</h2>
                  <div className="text-xs text-purple-200">Live Price</div>
                </div>
                <div className="p-3">
                  <LiveStockPrice symbol="AAPL" />
                </div>
              </div>
              
              {/* GOOGL */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-3 flex justify-between items-center">
                  <h2 className="text-sm font-semibold text-white">GOOGL</h2>
                  <div className="text-xs text-purple-200">Live Price</div>
                </div>
                <div className="p-3">
                  <LiveStockPrice symbol="GOOGL" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Transaction History - Span full width */}
          <div className="col-span-1 lg:col-span-3 row-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">Transaction History</h2>
                <Link href="/orders" className="text-sm text-amber-200 hover:text-white transition-colors">
                  View all →
                </Link>
              </div>
              <div className="p-4">
                <TransactionHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Market trends banner */}
      <div className="bg-gradient-to-r from-gray-900 to-indigo-900 py-8 mt-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-2">Ready to explore more market trends?</h3>
              <p className="text-indigo-200">Check out our detailed market overview page for in-depth analysis.</p>
            </div>
            <Link 
              href="/marketoverview" 
              className="px-6 py-3 bg-white text-indigo-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              View Market Overview
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
