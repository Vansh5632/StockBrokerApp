import React from "react";
import OrderItem from "./OrderItem";

interface Order {
    id: string;
    stock: string;
    symbol: string;
    type: string;
    quantity: number;
    price: number;
    profitLoss: number;
    date: string;
}

export default function OrderList({ orders }: { orders: Order[] }) {
    return (
        <div className="bg-gray-100 shadow-md rounded-lg overflow-x-auto">
            <table className="min-w-full leading-normal">
                <thead>
                    <tr className="bg-gray-300 text-gray-700 uppercase text-sm">
                        <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Stock</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Symbol</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Type</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Quantity</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Price</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Profit/Loss</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Date</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {orders.length > 0 ? (
                        orders.map((order: Order) => (
                            <OrderItem key={order.id} order={order} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="px-5 py-4 border-b border-gray-200 text-center text-gray-500">
                                No trades yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
