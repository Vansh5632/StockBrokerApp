import { useState, useEffect } from 'react';

export default function MarketNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would normally fetch from a real API
    // For demonstration purposes, we're creating mock data
    const mockNews = [
      {
        id: 1,
        title: "Fed Signals Potential Rate Cut in Coming Months",
        source: "Financial Times",
        time: "2 hours ago",
        category: "Economy",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        id: 2,
        title: "NVIDIA Reports Record Quarterly Revenue, Exceeding Expectations",
        source: "CNBC",
        time: "5 hours ago",
        category: "Stocks",
        image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        id: 3,
        title: "Apple Unveils New AI Features for iOS 19",
        source: "TechCrunch",
        time: "8 hours ago",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1585184394271-4c0a47dc59c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        id: 4,
        title: "Oil Prices Fall as Global Demand Concerns Mount",
        source: "Reuters",
        time: "10 hours ago",
        category: "Commodities",
        image: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        id: 5,
        title: "Google Announces $10B Investment in Data Centers",
        source: "Wall Street Journal",
        time: "1 day ago",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      }
    ];

    // Simulate API delay
    setTimeout(() => {
      setNews(mockNews);
      setLoading(false);
    }, 1000);
  }, []);

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Economy':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';
      case 'Stocks':
        return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300';
      case 'Technology':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300';
      case 'Commodities':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-3 mb-4">
            <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <div key={item.id} className="flex gap-3 group">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {item.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(item.category)}`}>
                {item.category}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {item.source} • {item.time}
              </span>
            </div>
          </div>
        </div>
      ))}
      
      <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium py-2 transition-colors">
        View All News
      </button>
    </div>
  );
}