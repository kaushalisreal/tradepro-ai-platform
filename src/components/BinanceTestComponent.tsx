import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { binanceApi } from '@/services/binanceApi';

export const BinanceTestComponent = () => {
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    testConnection();
    return () => {
      binanceApi.disconnect();
    };
  }, []);

  const testConnection = () => {
    console.log('🔌 Testing Binance WebSocket connection...');
    
    // Test single stream
    const testStream = 'btcusdt@ticker';
    binanceApi.connectWebSocket([testStream]);
    
    binanceApi.subscribe(testStream, (data: any) => {
      console.log('📦 Received data:', data);
      setConnected(true);
      setLastMessage(data);
      setMessageCount(prev => prev + 1);
    });
  };

  const testAPICall = async () => {
    try {
      console.log('🚀 Testing Binance REST API...');
      const ticker = await binanceApi.get24hrTicker('BTCUSDT');
      console.log('✅ REST API response:', ticker);
    } catch (error) {
      console.error('❌ REST API error:', error);
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6 m-4">
      <h3 className="text-lg font-semibold text-white mb-4">Binance Connection Test</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Badge variant={connected ? 'default' : 'destructive'}>
            {connected ? 'Connected' : 'Disconnected'}
          </Badge>
          <span className="text-white/70">Messages: {messageCount}</span>
        </div>
        
        <div className="flex space-x-2">
          <Button onClick={testConnection} variant="outline" className="border-white/20 text-white">
            Test WebSocket
          </Button>
          <Button onClick={testAPICall} variant="outline" className="border-white/20 text-white">
            Test REST API
          </Button>
          <Button 
            onClick={() => binanceApi.testWebSocketConnection()} 
            variant="outline" 
            className="border-white/20 text-white"
          >
            Quick Test
          </Button>
        </div>
        
        {lastMessage && (
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-sm font-medium text-white mb-2">Last Message:</h4>
            <pre className="text-xs text-white/70 overflow-auto">
              {JSON.stringify(lastMessage, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </Card>
  );
};
