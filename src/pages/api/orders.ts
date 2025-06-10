import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const session = await getServerSession(req, res, authOptions);
      
      if (!session?.user?.email) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Get all transactions for the user (these represent orders)
      const orders = await prisma.transaction.findMany({
        where: {
          userEmail: session.user.email
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      // Transform the transactions to match the Order interface
      const formattedOrders = orders.map(transaction => ({
        id: transaction.id,
        symbol: transaction.symbol,
        type: transaction.type,
        quantity: transaction.quantity,
        price: transaction.price,
        status: transaction.status || 'completed', // Default to completed if no status
        createdAt: transaction.createdAt
      }));

      res.status(200).json(formattedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  } else if (req.method === 'POST') {
    try {
      const session = await getServerSession(req, res, authOptions);
      
      if (!session?.user?.email) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { symbol, type, quantity, price } = req.body;

      if (!symbol || !type || !quantity || !price) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Create a new order (transaction)
      const order = await prisma.transaction.create({
        data: {
          userEmail: session.user.email,
          symbol,
          type,
          quantity: parseInt(quantity),
          price: parseFloat(price),
          status: 'pending'
        }
      });

      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const session = await getServerSession(req, res, authOptions);
      
      if (!session?.user?.email) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { orderId, status } = req.body;

      if (!orderId || !status) {
        return res.status(400).json({ error: 'Missing orderId or status' });
      }

      // Update order status
      const updatedOrder = await prisma.transaction.update({
        where: {
          id: orderId,
          userEmail: session.user.email // Ensure user can only update their own orders
        },
        data: {
          status
        }
      });

      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Failed to update order' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}