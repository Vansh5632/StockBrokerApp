import React from "react";

interface Order {
    type: "buy" | "sell";
    price: number;
    buyPrice: number;
    quantity: number;
    name: string;
    symbol: string;
    createdAt: string;
}

export default function OrderItem({ order }: { order: Order }) {
    const profitOrLoss = order.type === "sell" ? (order.price - order.buyPrice) * order.quantity : (order.price - order.buyPrice) * order.quantity;
    const profitLossClass = profitOrLoss > 0 ? "text-green-400" : profitOrLoss < 0 ? "text-red-400" : "text-gray-400";

    return (
        <tr className="border-b border-gray-700 transition-colors duration-200 hover:bg-gray-800/50">
            <td className="p-3 text-black font-medium">{order.name}</td>
            <td className="p-3 text-gray-400">
                <span className="bg-gray-700/50 text-black rounded-md px-2 py-1 text-sm">
                    {order.symbol}
                </span>
            </td>
            <td className={`p-3 font-bold ${order.type === "buy" ? "text-blue-400" : "text-red-400"}`}>
                <span className={`${order.type === "buy" ? "bg-blue-400/10" : "bg-red-400/10"} rounded-full px-3 py-1`}>
                    {order.type.toUpperCase()}
                </span>
            </td>
            <td className="p-3 text-black font-medium">{order.quantity}</td>
            <td className="p-3 text-black font-medium">
                <span className="font-mono">${order.price.toFixed(2)}</span>
            </td>
            <td className="p-3 text-gray-200 font-medium">
                <span className={`${profitOrLoss > 0 ? "bg-green-400/10" : profitOrLoss < 0 ? "bg-red-400/10" : ""} rounded-lg px-2 py-1`}>
                    {profitOrLoss !== 0 ? `$${profitOrLoss.toFixed(2)}` : "-"}
                </span>
            </td>
            <td className="p-3 text-gray-400 text-sm">
                {new Date(order.createdAt).toLocaleDateString()}
            </td>
        </tr>
    );
}
