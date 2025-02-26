import React from "react";
import { GetServerSideProps } from "next";
import OrderList from "@/components/Orders/OrderList";
import {prisma} from "@/lib/prisma";

export default function OrdersPage({ orders }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-white">📜 Order History</h1>
      <OrderList orders={orders} />
    </div>
  );
}

// Fetch trade history from PostgreSQL
export const getServerSideProps: GetServerSideProps = async () => {
  const orders = await prisma.transaction.findMany({
    orderBy: { createdAt: "desc" }, // Latest first
  });

  return {
    props: { orders: JSON.parse(JSON.stringify(orders)) },
  };
};
