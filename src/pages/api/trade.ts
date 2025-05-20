import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get user session
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { symbol, quantity, price, type } = req.body;
    
    // Basic validation
    if (!symbol || !quantity || !price || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (type !== 'buy' && type !== 'sell') {
      return res.status(400).json({ error: 'Invalid order type' });
    }
    
    if (quantity <= 0) {
      return res.status(400).json({ error: 'Quantity must be positive' });
    }
    
    if (price <= 0) {
      return res.status(400).json({ error: 'Price must be positive' });
    }
    
    // Get user ID
    const userId = session.user?.id;
    if (!userId) {
      return res.status(400).json({ error: 'User ID not found in session' });
    }
    
    // Create a server-side socket.io-client instance (for server-to-server communication)
    // Note: In a production environment, you would use a more direct method
    // like a message queue or internal API call
    
    // Instead, we'll use the REST API as a bridge to the WebSocket server
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/server/placeOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_SECRET_KEY || 'dev-secret-key'}`
      },
      body: JSON.stringify({
        symbol,
        quantity,
        price,
        type,
        userId
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json(error);
    }
    
    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    console.error('Trade error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
