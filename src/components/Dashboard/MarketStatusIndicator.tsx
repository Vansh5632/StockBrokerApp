import React, { useState, useEffect } from 'react';
import { getSocket } from '../../utils/socketClient';

export default function MarketStatusIndicator() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const socket = await getSocket();
        setIsConnected(socket.connected);
        
        socket.on('connect', () => setIsConnected(true));
        socket.on('disconnect', () => setIsConnected(false));
        socket.on('marketUpdate', () => setLastUpdate(new Date()));
        socket.on('stockUpdate', () => setLastUpdate(new Date()));
        
        return () => {
          socket.off('connect');
          socket.off('disconnect');
          socket.off('marketUpdate');
          socket.off('stockUpdate');
        };
      } catch (error) {
        setIsConnected(false);
      }
    };
    
    checkConnection();
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
      <span className="text-gray-600 dark:text-gray-400">
        {isConnected ? 'Market Live' : 'Market Offline'}
      </span>
      {lastUpdate && (
        <span className="text-xs text-gray-500">
          • {lastUpdate.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}
