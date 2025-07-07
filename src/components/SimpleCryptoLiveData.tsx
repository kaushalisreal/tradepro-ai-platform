import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface SimpleCryptoData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  connected: boolean;
  lastUpdate: number;
}

export const SimpleCryptoLiveData = () => {
  const [cryptoData, setCryptoData] = useState<SimpleCryptoData[]>([]);
  const [connections, setConnections] = useState<Map<string, WebSocket>>(new Map());

  const symbols = ['BTCUSDT', 'ETHUSDT', 'ADAUSDT', 'SOLUSDT'];

  useEffect(() => {
    console.log('🚀 Starting simple crypto live data connections...');
    connectToAllSymbols();
    
    return () => {
      console.log('🔌 Cleaning up WebSocket connections...');
      disconnectAll();
    };
  }, []);

  const connectToSymbol = (symbol: string) => {
    const wsUrl = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`;
    console.log(`🔌 Connecting to ${symbol}:`, wsUrl);
    
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log(`✅ ${symbol} WebSocket connected`);
      setConnections(prev => new Map(prev).set(symbol, ws));
      
      // Update connection status
      setCryptoData(prev => prev.map(item => 
        item.symbol === symbol ? { ...item, connected: true } : item
      ));
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(`📨 ${symbol} price update:`, data.c);
        
        setCryptoData(prev => {
          const existing = prev.find(item => item.symbol === symbol);
          const newItem: SimpleCryptoData = {
            symbol,
            price: parseFloat(data.c),
            change: parseFloat(data.p),
            changePercent: parseFloat(data.P),
            connected: true,
            lastUpdate: Date.now()
          };
          
          if (existing) {
            return prev.map(item => item.symbol === symbol ? newItem : item);
          } else {
            return [...prev, newItem];
          }
        });
      } catch (error) {
        console.error(`❌ Error parsing ${symbol} data:`, error);
      }
    };
    
    ws.onclose = (event) => {
      console.log(`🔌 ${symbol} WebSocket closed:`, event.code, event.reason);
      setConnections(prev => {
        const newMap = new Map(prev);
        newMap.delete(symbol);
        return newMap;
      });
      
      // Update connection status
      setCryptoData(prev => prev.map(item => 
        item.symbol === symbol ? { ...item, connected: false } : item
      ));
      
      // Attempt to reconnect after 3 seconds
      setTimeout(() => {
        console.log(`🔄 Reconnecting to ${symbol}...`);
        connectToSymbol(symbol);
      }, 3000);
    };
    
    ws.onerror = (error) => {
      console.error(`❌ ${symbol} WebSocket error:`, error);
    };
  };

  const connectToAllSymbols = () => {
    symbols.forEach(symbol => {
      connectToSymbol(symbol);
    });
  };

  const disconnectAll = () => {
    connections.forEach((ws, symbol) => {
      console.log(`🔌 Disconnecting ${symbol}`);
      ws.close();
    });
    setConnections(new Map());
  };

  const reconnectAll = () => {
    disconnectAll();
    setTimeout(() => {
      connectToAllSymbols();
    }, 1000);
  };

  const formatPrice = (price: number): string => {
    if (price >= 1000) return `$${price.toFixed(2)}`;
    if (price >= 1) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(8)}`;
  };

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6 m-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Simple Live Crypto Data</h3>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
            {connections.size}/{symbols.length} Connected
          </Badge>
          <Button
            onClick={reconnectAll}
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reconnect All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cryptoData.map((crypto) => (
          <Card key={crypto.symbol} className="bg-white/5 border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {crypto.symbol.replace('USDT', '')}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-white">{crypto.symbol.replace('USDT', '')}</div>
                  <div className={`text-xs flex items-center space-x-1 ${
                    crypto.connected ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      crypto.connected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                    }`}></div>
                    <span>{crypto.connected ? 'Live' : 'Disconnected'}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-medium text-white">
                  {formatPrice(crypto.price)}
                </div>
                <div className={`text-sm flex items-center space-x-1 ${
                  crypto.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {crypto.changePercent >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>
                    {crypto.changePercent >= 0 ? '+' : ''}{crypto.changePercent.toFixed(2)}%
                  </span>
                </div>
                {crypto.lastUpdate > 0 && (
                  <div className="text-xs text-white/50">
                    {new Date(crypto.lastUpdate).toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
