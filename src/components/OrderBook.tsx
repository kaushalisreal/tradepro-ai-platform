import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Activity, RefreshCw } from 'lucide-react';
import { binanceApi, BinanceOrderBook, BinanceWebSocketDepth } from '@/services/binanceApi';

interface OrderBookLevel {
  price: number;
  quantity: number;
  total: number;
  percentage: number;
}

interface OrderBookData {
  symbol: string;
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  spread: number;
  spreadPercent: number;
  lastUpdateId: number;
}

export const OrderBookComponent = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');
  const [orderBook, setOrderBook] = useState<OrderBookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [depth, setDepth] = useState<'10' | '20' | '50' | '100'>('20');
  const [isConnected, setIsConnected] = useState(false);

  const symbolOptions = [
    { value: 'BTCUSDT', label: 'BTC/USDT' },
    { value: 'ETHUSDT', label: 'ETH/USDT' },
    { value: 'ADAUSDT', label: 'ADA/USDT' },
    { value: 'SOLUSDT', label: 'SOL/USDT' },
    { value: 'AVAXUSDT', label: 'AVAX/USDT' },
    { value: 'DOTUSDT', label: 'DOT/USDT' },
    { value: 'MATICUSDT', label: 'MATIC/USDT' },
    { value: 'LINKUSDT', label: 'LINK/USDT' },
  ];

  const fetchOrderBook = useCallback(async (symbol: string) => {
    try {
      setLoading(true);
      const data = await binanceApi.getOrderBook(symbol, parseInt(depth));
      
      // Process bids (highest to lowest)
      const bids = data.bids.slice(0, parseInt(depth)).map(([price, quantity]) => ({
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        total: 0,
        percentage: 0
      }));

      // Process asks (lowest to highest)
      const asks = data.asks.slice(0, parseInt(depth)).map(([price, quantity]) => ({
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        total: 0,
        percentage: 0
      })).reverse();

      // Calculate totals and percentages
      let bidTotal = 0;
      const maxBidQuantity = Math.max(...bids.map(b => b.quantity));
      bids.forEach(bid => {
        bidTotal += bid.quantity;
        bid.total = bidTotal;
        bid.percentage = (bid.quantity / maxBidQuantity) * 100;
      });

      let askTotal = 0;
      const maxAskQuantity = Math.max(...asks.map(a => a.quantity));
      asks.forEach(ask => {
        askTotal += ask.quantity;
        ask.total = askTotal;
        ask.percentage = (ask.quantity / maxAskQuantity) * 100;
      });

      // Calculate spread
      const bestBid = bids[0]?.price || 0;
      const bestAsk = asks[asks.length - 1]?.price || 0;
      const spread = bestAsk - bestBid;
      const spreadPercent = (spread / bestBid) * 100;

      setOrderBook({
        symbol,
        bids,
        asks,
        spread,
        spreadPercent,
        lastUpdateId: data.lastUpdateId
      });
    } catch (error) {
      console.error('Error fetching order book:', error);
    } finally {
      setLoading(false);
    }
  }, [depth]);

  useEffect(() => {
    fetchOrderBook(selectedSymbol);
    setupWebSocketConnection(selectedSymbol);

    return () => {
      binanceApi.disconnect();
    };
  }, [selectedSymbol, fetchOrderBook]);

  const setupWebSocketConnection = (symbol: string) => {
    const stream = `${symbol.toLowerCase()}@depth`;
    
    binanceApi.connectWebSocket([stream]);
    setIsConnected(true);

    binanceApi.subscribe(stream, (data: BinanceWebSocketDepth) => {
      setOrderBook(prev => {
        if (!prev) return null;

        const newOrderBook = { ...prev };
        
        // Update bids
        data.b.forEach(([price, quantity]) => {
          const priceNum = parseFloat(price);
          const quantityNum = parseFloat(quantity);
          
          if (quantityNum === 0) {
            // Remove level
            newOrderBook.bids = newOrderBook.bids.filter(bid => bid.price !== priceNum);
          } else {
            // Update or add level
            const existingIndex = newOrderBook.bids.findIndex(bid => bid.price === priceNum);
            if (existingIndex >= 0) {
              newOrderBook.bids[existingIndex].quantity = quantityNum;
            } else {
              newOrderBook.bids.push({
                price: priceNum,
                quantity: quantityNum,
                total: 0,
                percentage: 0
              });
            }
          }
        });

        // Update asks
        data.a.forEach(([price, quantity]) => {
          const priceNum = parseFloat(price);
          const quantityNum = parseFloat(quantity);
          
          if (quantityNum === 0) {
            // Remove level
            newOrderBook.asks = newOrderBook.asks.filter(ask => ask.price !== priceNum);
          } else {
            // Update or add level
            const existingIndex = newOrderBook.asks.findIndex(ask => ask.price === priceNum);
            if (existingIndex >= 0) {
              newOrderBook.asks[existingIndex].quantity = quantityNum;
            } else {
              newOrderBook.asks.push({
                price: priceNum,
                quantity: quantityNum,
                total: 0,
                percentage: 0
              });
            }
          }
        });

        // Sort and recalculate
        newOrderBook.bids.sort((a, b) => b.price - a.price);
        newOrderBook.asks.sort((a, b) => a.price - b.price);

        // Recalculate totals and percentages
        const maxBidQuantity = Math.max(...newOrderBook.bids.map(b => b.quantity));
        let bidTotal = 0;
        newOrderBook.bids.forEach(bid => {
          bidTotal += bid.quantity;
          bid.total = bidTotal;
          bid.percentage = (bid.quantity / maxBidQuantity) * 100;
        });

        const maxAskQuantity = Math.max(...newOrderBook.asks.map(a => a.quantity));
        let askTotal = 0;
        newOrderBook.asks.forEach(ask => {
          askTotal += ask.quantity;
          ask.total = askTotal;
          ask.percentage = (ask.quantity / maxAskQuantity) * 100;
        });

        // Recalculate spread
        const bestBid = newOrderBook.bids[0]?.price || 0;
        const bestAsk = newOrderBook.asks[0]?.price || 0;
        newOrderBook.spread = bestAsk - bestBid;
        newOrderBook.spreadPercent = (newOrderBook.spread / bestBid) * 100;

        return newOrderBook;
      });
    });
  };

  const formatPrice = (price: number): string => {
    if (price >= 1000) return price.toFixed(2);
    if (price >= 1) return price.toFixed(4);
    return price.toFixed(8);
  };

  const formatQuantity = (quantity: number): string => {
    if (quantity >= 1000) return `${(quantity / 1000).toFixed(2)}K`;
    if (quantity >= 1) return quantity.toFixed(4);
    return quantity.toFixed(8);
  };

  if (loading) {
    return (
      <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-white/10 rounded mb-4"></div>
          <div className="space-y-2">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-4 bg-white/10 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-xl font-semibold text-white">Order Book</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></div>
            <span className="text-sm text-white/70">{isConnected ? 'Live' : 'Disconnected'}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
            <SelectTrigger className="w-32 bg-white/5 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {symbolOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={depth} onValueChange={(value: any) => setDepth(value)}>
            <SelectTrigger className="w-20 bg-white/5 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => fetchOrderBook(selectedSymbol)}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {orderBook && (
        <div className="space-y-4">
          {/* Spread Information */}
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Spread:</span>
              <span className="text-white font-medium">
                {formatPrice(orderBook.spread)} ({orderBook.spreadPercent.toFixed(4)}%)
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-white/70">Best Bid:</span>
              <span className="text-emerald-400 font-medium">
                {formatPrice(orderBook.bids[0]?.price || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-white/70">Best Ask:</span>
              <span className="text-red-400 font-medium">
                {formatPrice(orderBook.asks[orderBook.asks.length - 1]?.price || 0)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Asks (Sell Orders) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-white/70">Asks (Sell)</h4>
                <TrendingUp className="w-4 h-4 text-red-400" />
              </div>
              <div className="space-y-1">
                <div className="grid grid-cols-3 gap-2 text-xs text-white/50 pb-2 border-b border-white/10">
                  <div>Price</div>
                  <div className="text-right">Quantity</div>
                  <div className="text-right">Total</div>
                </div>
                {orderBook.asks.slice().reverse().map((ask, index) => (
                  <div key={index} className="relative">
                    <div 
                      className="absolute inset-0 bg-red-500/10 rounded"
                      style={{ width: `${ask.percentage}%` }}
                    />
                    <div className="relative grid grid-cols-3 gap-2 text-xs py-1 px-2 hover:bg-white/5 rounded">
                      <div className="text-red-400 font-medium">{formatPrice(ask.price)}</div>
                      <div className="text-right text-white/70">{formatQuantity(ask.quantity)}</div>
                      <div className="text-right text-white/70">{formatQuantity(ask.total)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bids (Buy Orders) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-white/70">Bids (Buy)</h4>
                <TrendingDown className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <div className="grid grid-cols-3 gap-2 text-xs text-white/50 pb-2 border-b border-white/10">
                  <div>Price</div>
                  <div className="text-right">Quantity</div>
                  <div className="text-right">Total</div>
                </div>
                {orderBook.bids.map((bid, index) => (
                  <div key={index} className="relative">
                    <div 
                      className="absolute inset-0 bg-emerald-500/10 rounded"
                      style={{ width: `${bid.percentage}%` }}
                    />
                    <div className="relative grid grid-cols-3 gap-2 text-xs py-1 px-2 hover:bg-white/5 rounded">
                      <div className="text-emerald-400 font-medium">{formatPrice(bid.price)}</div>
                      <div className="text-right text-white/70">{formatQuantity(bid.quantity)}</div>
                      <div className="text-right text-white/70">{formatQuantity(bid.total)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
