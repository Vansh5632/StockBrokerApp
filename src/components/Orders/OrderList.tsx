import React from "react";
import OrderItem from "./OrderItem";
import { Order } from "../../types/order.type";

export default function OrderList({ orders }: { orders: Order[] }) {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
            <table className="min-w-full leading-normal">
                <thead>
                    <tr className="bg-blue-500 text-white uppercase text-sm">
                        <th className="px-5 py-3 border-b-2 border-blue-600 text-left">Stock</th>
                        <th className="px-5 py-3 border-b-2 border-blue-600 text-left">Symbol</th>
                        <th className="px-5 py-3 border-b-2 border-blue-600 text-left">Type</th>
                        <th className="px-5 py-3 border-b-2 border-blue-600 text-left">Quantity</th>
                        <th className="px-5 py-3 border-b-2 border-blue-600 text-left">Price</th>

                        <th className="px-5 py-3 border-b-2 border-blue-600 text-left">Date</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {orders.length > 0 ? (
                        orders.map((order: Order, index: number) => (
                            <OrderItem 
                                key={order.id} 
                                order={order} 
                                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                            />
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
