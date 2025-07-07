import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Activity, Clock, Volume2, Filter } from 'lucide-react';
import { binanceApi, BinanceTrade, BinanceWebSocketTrade } from '@/services/binanceApi';

interface TradeData {
  id: number;
  price: number;
  quantity: number;
  quoteQuantity: number;
  time: number;
  isBuyerMaker: boolean;
  side: 'BUY' | 'SELL';
  value: number;
}

interface TradeSummary {
  totalVolume: number;
  totalValue: number;
  buyVolume: number;
  sellVolume: number;
  buyValue: number;
  sellValue: number;
  buyTrades: number;
  sellTrades: number;
  delta: number;
  deltaPercent: number;
  avgPrice: number;
  highPrice: number;
  lowPrice: number;
}

export const TradeTape = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');
  const [trades, setTrades] = useState<TradeData[]>([]);
  const [summary, setSummary] = useState<TradeSummary | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [maxTrades, setMaxTrades] = useState(50);
  const [minTradeSize, setMinTradeSize] = useState(0);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

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

  const fetchRecentTrades = useCallback(async (symbol: string) => {
    try {
      const data = await binanceApi.getRecentTrades(symbol, 100);
      const formattedTrades: TradeData[] = data.map(trade => ({
        id: trade.id,
        price: parseFloat(trade.price),
        quantity: parseFloat(trade.qty),
        quoteQuantity: parseFloat(trade.quoteQty),
        time: trade.time,
        isBuyerMaker: trade.isBuyerMaker,
        side: trade.isBuyerMaker ? 'SELL' : 'BUY',
        value: parseFloat(trade.price) * parseFloat(trade.qty)
      }));

      setTrades(formattedTrades.slice(-maxTrades));
      calculateSummary(formattedTrades);
    } catch (error) {
      console.error('Error fetching recent trades:', error);
    }
  }, [maxTrades]);

  const calculateSummary = useCallback((tradesData: TradeData[]) => {
    if (tradesData.length === 0) return;

    const summary: TradeSummary = {
      totalVolume: 0,
      totalValue: 0,
      buyVolume: 0,
      sellVolume: 0,
      buyValue: 0,
      sellValue: 0,
      buyTrades: 0,
      sellTrades: 0,
      delta: 0,
      deltaPercent: 0,
      avgPrice: 0,
      highPrice: 0,
      lowPrice: Infinity
    };

    tradesData.forEach(trade => {
      summary.totalVolume += trade.quantity;
      summary.totalValue += trade.value;
      
      if (trade.price > summary.highPrice) summary.highPrice = trade.price;
      if (trade.price < summary.lowPrice) summary.lowPrice = trade.price;

      if (trade.side === 'BUY') {
        summary.buyVolume += trade.quantity;
        summary.buyValue += trade.value;
        summary.buyTrades++;
      } else {
        summary.sellVolume += trade.quantity;
        summary.sellValue += trade.value;
        summary.sellTrades++;
      }
    });

    summary.avgPrice = summary.totalValue / summary.totalVolume;
    summary.delta = summary.buyVolume - summary.sellVolume;
    summary.deltaPercent = (summary.delta / summary.totalVolume) * 100;

    setSummary(summary);
  }, []);

  useEffect(() => {
    fetchRecentTrades(selectedSymbol);
    setupWebSocketConnection(selectedSymbol);

    return () => {
      binanceApi.disconnect();
    };
  }, [selectedSymbol, fetchRecentTrades]);

  const setupWebSocketConnection = (symbol: string) => {
    const stream = `${symbol.toLowerCase()}@trade`;
    
    binanceApi.connectWebSocket([stream]);
    setIsConnected(true);

    binanceApi.subscribe(stream, (data: BinanceWebSocketTrade) => {
      const newTrade: TradeData = {
        id: data.t,
        price: parseFloat(data.p),
        quantity: parseFloat(data.q),
        quoteQuantity: parseFloat(data.p) * parseFloat(data.q),
        time: data.T,
        isBuyerMaker: data.m,
        side: data.m ? 'SELL' : 'BUY',
        value: parseFloat(data.p) * parseFloat(data.q)
      };

      // Apply minimum trade size filter
      if (newTrade.value < minTradeSize) return;

      setTrades(prevTrades => {
        const updatedTrades = [...prevTrades, newTrade];
        const limitedTrades = updatedTrades.slice(-maxTrades);
        calculateSummary(limitedTrades);
        return limitedTrades;
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

  const formatValue = (value: number): string => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  const getTradeColor = (side: 'BUY' | 'SELL') => {
    return side === 'BUY' ? 'text-emerald-400' : 'text-red-400';
  };

  const getTradeIcon = (side: 'BUY' | 'SELL') => {
    return side === 'BUY' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />;
  };

  const getTradeSize = (value: number): string => {
    if (value >= 100000) return 'XL';
    if (value >= 50000) return 'L';
    if (value >= 10000) return 'M';
    if (value >= 1000) return 'S';
    return 'XS';
  };

  const getTradeBackground = (side: 'BUY' | 'SELL') => {
    return side === 'BUY' ? 'bg-emerald-500/10' : 'bg-red-500/10';
  };

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-xl font-semibold text-white">Trade Tape</h3>
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
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsAutoScroll(!isAutoScroll)}
            className={`border-white/20 text-white hover:bg-white/10 ${isAutoScroll ? 'bg-white/10' : ''}`}
          >
            <Activity className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Trade Summary */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-white/70 mb-1">Total Volume</div>
            <div className="text-white font-medium">{formatQuantity(summary.totalVolume)}</div>
            <div className="text-xs text-white/50">{formatValue(summary.totalValue)}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-white/70 mb-1">Buy/Sell Delta</div>
            <div className={`font-medium ${summary.delta >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {summary.delta >= 0 ? '+' : ''}{formatQuantity(summary.delta)}
            </div>
            <div className="text-xs text-white/50">{summary.deltaPercent.toFixed(2)}%</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-white/70 mb-1">Avg Price</div>
            <div className="text-white font-medium">{formatPrice(summary.avgPrice)}</div>
            <div className="text-xs text-white/50">{summary.buyTrades + summary.sellTrades} trades</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-white/70 mb-1">High/Low</div>
            <div className="text-white font-medium text-xs">
              {formatPrice(summary.highPrice)} / {formatPrice(summary.lowPrice)}
            </div>
          </div>
        </div>
      )}

      {/* Trade List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-white/70" />
            <span className="text-sm text-white/70">Recent Trades</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTrades([])}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Clear
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 text-xs text-white/50 pb-2 border-b border-white/10">
          <div>Time</div>
          <div className="text-right">Price</div>
          <div className="text-right">Quantity</div>
          <div className="text-right">Value</div>
          <div className="text-center">Side</div>
        </div>

        <div className="max-h-96 overflow-y-auto space-y-1">
          {trades.slice().reverse().map((trade, index) => (
            <div 
              key={`${trade.id}-${index}`}
              className={`grid grid-cols-5 gap-2 text-xs py-2 px-2 rounded hover:bg-white/5 transition-colors ${getTradeBackground(trade.side)}`}
            >
              <div className="text-white/70 flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{new Date(trade.time).toLocaleTimeString()}</span>
              </div>
              <div className={`text-right font-medium ${getTradeColor(trade.side)}`}>
                {formatPrice(trade.price)}
              </div>
              <div className="text-right text-white/70">
                {formatQuantity(trade.quantity)}
              </div>
              <div className="text-right text-white/70">
                {formatValue(trade.value)}
              </div>
              <div className="text-center">
                <div className={`inline-flex items-center space-x-1 ${getTradeColor(trade.side)}`}>
                  {getTradeIcon(trade.side)}
                  <span className="text-xs">{trade.side}</span>
                  <Badge variant="outline" className="text-xs px-1 py-0 border-white/20">
                    {getTradeSize(trade.value)}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
