// src/pages/api/server/placeOrder.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// This endpoint is intended for server-to-server communication
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // Simple API key authentication for server-to-server requests
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const token = authHeader.split(' ')[1];
  if (token !== (process.env.API_SECRET_KEY || 'dev-secret-key')) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  try {
    const { symbol, quantity, price, type, userId } = req.body;
    
    // Validation already happened in the trade.ts endpoint
    
    // Create a new order in the database
    const order = await prisma.order.create({
      data: {
        id: uuidv4(),
        userId,
        symbol,
        quantity,
        price,
        type,
        status: 'active',
      },
    });
    
    // Get the WebSocket server instance from Next.js
    // @ts-ignore - Next.js attaches socket.io to res.socket.server.io
    const io = res.socket?.server?.io;
    
    if (!io) {
      // If WebSocket server isn't available, return success but note that real-time updates won't happen
      console.warn('WebSocket server not found for real-time order processing');
      return res.status(200).json({ 
        success: true, 
        order,
        warning: 'Order placed but real-time processing not available' 
      });
    }
    
    // Emit the order to the market data system via WebSocket
    io.emit('serverPlaceOrder', {
      id: order.id,
      userId,
      symbol,
      quantity,
      price,
      type,
      created: new Date(),
    });
    
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Server place order error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}