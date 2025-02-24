import React, { useEffect, useState } from "react";

interface Transaction {
  id: string;
  symbol: string;
  name: string;
  price: number;
  quantity: number;
  type: string;
  createdAt: string;
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">📜 Trade History</h2>
      <div className="max-h-96 overflow-y-auto scrollbar-hide">
        {transactions.length > 0 ? (
          <ul className="space-y-4">
            {transactions.map((tx) => (
              <li key={tx.id} className="p-4 border rounded-md bg-gray-100">
                <p className="font-semibold">{tx.name} ({tx.symbol})</p>
                <p className="text-gray-600">
                  {tx.type === "buy" ? "🟢 Bought" : "🔴 Sold"} {tx.quantity} shares at ${tx.price.toFixed(2)}
                </p>
                <p className="text-gray-500 text-sm">{new Date(tx.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No trades yet.</p>
        )}
      </div>
    </div>
  );
}
