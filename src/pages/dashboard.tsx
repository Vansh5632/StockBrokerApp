import { useRecoilState } from 'recoil';
import { portfolioState } from '@/state/portfolioAtom';

export default function Dashboard() {
  const [portfolio, setPortfolio] = useRecoilState(portfolioState);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav>
          <ul>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">Portfolio</li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">Market</li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">Orders</li>
          </ul>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome to Your Portfolio</h1>
        
        {/* Portfolio Summary */}
        <div className="bg-white p-4 shadow-md rounded-lg mb-6">
          <h2 className="text-lg font-semibold">Portfolio Summary</h2>
          <p className="text-gray-700">Total Funds: ${portfolio.funds}</p>
          <p className="text-gray-700">Stocks Owned: {portfolio.stocks.length}</p>
        </div>
        
        {/* Market Overview */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold">Market Overview</h2>
          <p className="text-gray-700">Top Gainers/Losers Coming Soon...</p>
        </div>
      </main>
    </div>
  );
}
