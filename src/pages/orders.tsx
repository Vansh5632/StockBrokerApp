import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import OrderList from "@/components/Orders/OrderList";
import {prisma} from "@/lib/prisma";

interface ExtendedUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  funds?: number;
}

interface Order {
  id: string;
  symbol: string;
  type: string;
  quantity: number;
  price: string | number;
  status?: string;
  createdAt: string | Date;
}

export default function OrdersPage({ initialOrders }) {
  const { data: session } = useSession();
  const [userName, setUserName] = useState("Trader");
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>(initialOrders || []);
  const [activeTab, setActiveTab] = useState("all");
  
  useEffect(() => {
    if (session?.user?.name) {
      const firstName = session.user.name.split(' ')[0];
      setUserName(firstName);
    }
    
    // Fetch orders data
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/orders");
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, [session]);
  
  // Filter orders by status - add null check for order.status
  const filteredOrders = activeTab === "all" 
    ? orders 
    : orders.filter(order => order.status && order.status.toLowerCase() === activeTab);
  
  // Get counts for each category - add null checks for order.status
  const pendingCount = orders.filter(order => order.status && order.status.toLowerCase() === "pending").length;
  const completedCount = orders.filter(order => order.status && order.status.toLowerCase() === "completed").length;
  const cancelledCount = orders.filter(order => order.status && order.status.toLowerCase() === "cancelled").length;
  
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
              <Link href="/orders" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium border-b-2 border-indigo-500">
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
        {/* Orders Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Order History
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Track and manage your trades
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link 
                href="/portfolio" 
                className="px-5 py-2.5 bg-secondary hover:bg-secondary/90 text-white rounded-lg font-medium transition-colors shadow-sm"
              >
                Place New Order
              </Link>
            </div>
          </div>
        </div>
        
        {/* Orders Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-4">
            <h2 className="text-lg font-semibold text-white">Orders Summary</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Total Orders</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{orders.length}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Pending</h3>
                <p className="text-2xl font-bold text-amber-500">{pendingCount}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Completed</h3>
                <p className="text-2xl font-bold text-green-500">{completedCount}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Cancelled</h3>
                <p className="text-2xl font-bold text-red-500">{cancelledCount}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Orders List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-100 dark:border-gray-700">
            <div className="flex overflow-x-auto">
              <button 
                onClick={() => setActiveTab("all")}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === "all" 
                    ? "bg-gray-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500"
                    : "text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                All Orders
              </button>
              <button 
                onClick={() => setActiveTab("pending")}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === "pending" 
                    ? "bg-gray-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500"
                    : "text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                Pending
              </button>
              <button 
                onClick={() => setActiveTab("completed")}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === "completed" 
                    ? "bg-gray-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500"
                    : "text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                Completed
              </button>
              <button 
                onClick={() => setActiveTab("cancelled")}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === "cancelled" 
                    ? "bg-gray-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500"
                    : "text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                Cancelled
              </button>
            </div>
          </div>
          
          <div className="p-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-indigo-500 rounded-full animate-spin"></div>
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Symbol</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">#{order.id.slice(0, 8)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{order.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            order.type === 'buy' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {order.type?.toUpperCase() || 'UNKNOWN'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{order.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${parseFloat(order.price).toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${(order.quantity * parseFloat(order.price)).toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                              : order.status === 'pending'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {order.status?.toUpperCase() || 'UNKNOWN'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {order.status === 'pending' && (
                            <button 
                              onClick={() => {
                                // Implement cancel order functionality here
                                console.log("Cancel order:", order.id);
                                // Update order status and refresh the list
                              }}
                              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 mb-2">No orders found</div>
                <Link 
                  href="/portfolio" 
                  className="mt-4 inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                >
                  Start Trading
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}

// Fetch trade history from PostgreSQL
export const getServerSideProps: GetServerSideProps = async () => {
  const orders = await prisma.transaction.findMany({
    orderBy: { createdAt: "desc" }, // Latest first
  });

  return {
    props: { initialOrders: JSON.parse(JSON.stringify(orders)) },
  };
};
