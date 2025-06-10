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

      // If no orders found with userEmail, get all orders for backward compatibility
      let allOrders = orders;
      if (allOrders.length === 0) {
        allOrders = await prisma.transaction.findMany({
          orderBy: {
            createdAt: 'desc'
          },
          take: 10 // Limit to recent orders for demo
        });
      }

      // Transform the transactions to match the Order interface
      const formattedOrders = allOrders.map(transaction => ({
        id: transaction.id,
        symbol: transaction.symbol,
        type: transaction.type,
        quantity: transaction.quantity,
        price: transaction.price,
        status: 'completed', // Default to completed since status field doesn't exist yet
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
          symbol,
          name: symbol, // Use symbol as name for now
          type,
          quantity: parseInt(quantity),
          price: parseFloat(price)
        }
      });

      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}