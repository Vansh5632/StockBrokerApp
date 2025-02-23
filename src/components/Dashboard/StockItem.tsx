import React from "react";

interface StockItemProps {
  symbol: string;
  name: string;
  price: number;
  onRemove: (symbol: string) => void;
}

export default function StockItem({ symbol, name, price, onRemove }: StockItemProps) {
  return (
    <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
      <div>
        <h3 className="font-semibold">{name} ({symbol})</h3>
        <p className="text-green-600 font-bold">${price.toFixed(2)}</p>
      </div>
      <button
        onClick={() => onRemove(symbol)}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Remove
      </button>
    </li>
  );
}
