import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Star, Search, Activity, BarChart3, Clock } from 'lucide-react';
import { binanceApi, BinanceTicker, BinanceWebSocketTicker } from '@/services/binanceApi';

interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  high24h: number;
  low24h: number;
  lastUpdated: number;
}

export const CryptoMarketData = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [liveUpdates, setLiveUpdates] = useState<Map<string, BinanceWebSocketTicker>>(new Map());

  // Top crypto symbols to track
  const topCryptoSymbols = [
    'BTCUSDT', 'ETHUSDT', 'ADAUSDT', 'SOLUSDT', 'AVAXUSDT', 
    'DOTUSDT', 'MATICUSDT', 'LINKUSDT', 'UNIUSDT', 'LTCUSDT'
  ];

  const cryptoNames: Record<string, string> = {
    'BTCUSDT': 'Bitcoin',
    'ETHUSDT': 'Ethereum',
    'ADAUSDT': 'Cardano',
    'SOLUSDT': 'Solana',
    'AVAXUSDT': 'Avalanche',
    'DOTUSDT': 'Polkadot',
    'MATICUSDT': 'Polygon',
    'LINKUSDT': 'Chainlink',
    'UNIUSDT': 'Uniswap',
    'LTCUSDT': 'Litecoin'
  };

  useEffect(() => {
    fetchInitialData();
    setupWebSocketConnection();

    return () => {
      binanceApi.disconnect();
    };
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const tickers = await binanceApi.get24hrTicker() as BinanceTicker[];
      
      const filteredTickers = tickers.filter(ticker => 
        topCryptoSymbols.includes(ticker.symbol)
      );

      const formattedData: CryptoData[] = filteredTickers.map(ticker => ({
        symbol: ticker.symbol.replace('USDT', ''),
        name: cryptoNames[ticker.symbol] || ticker.symbol,
        price: parseFloat(ticker.lastPrice),
        change: parseFloat(ticker.priceChange),
        changePercent: parseFloat(ticker.priceChangePercent),
        volume: binanceApi.formatVolume(parseFloat(ticker.volume)),
        marketCap: binanceApi.formatMarketCap(parseFloat(ticker.lastPrice) * parseFloat(ticker.volume)),
        high24h: parseFloat(ticker.highPrice),
        low24h: parseFloat(ticker.lowPrice),
        lastUpdated: Date.now()
      }));

      setCryptoData(formattedData);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupWebSocketConnection = () => {
    const streams = topCryptoSymbols.map(symbol => `${symbol.toLowerCase()}@ticker`);
    
    binanceApi.connectWebSocket(streams);

    // Subscribe to ticker updates
    topCryptoSymbols.forEach(symbol => {
      const stream = `${symbol.toLowerCase()}@ticker`;
      binanceApi.subscribe(stream, (data: BinanceWebSocketTicker) => {
        setLiveUpdates(prev => {
          const newMap = new Map(prev);
          newMap.set(symbol, data);
          return newMap;
        });

        // Update crypto data with live prices
        setCryptoData(prevData => 
          prevData.map(crypto => {
            if (crypto.symbol === symbol.replace('USDT', '')) {
              return {
                ...crypto,
                price: parseFloat(data.c),
                change: parseFloat(data.p),
                changePercent: parseFloat(data.P),
                high24h: parseFloat(data.h),
                low24h: parseFloat(data.l),
                volume: binanceApi.formatVolume(parseFloat(data.v)),
                lastUpdated: Date.now()
              };
            }
            return crypto;
          })
        );
      });
    });
  };

  const formatPrice = (price: number): string => {
    if (price >= 1) {
      return `$${price.toFixed(2)}`;
    } else if (price >= 0.01) {
      return `$${price.toFixed(4)}`;
    } else {
      return `$${price.toFixed(8)}`;
    }
  };

  const getPriceColor = (changePercent: number): string => {
    if (changePercent > 0) return 'text-emerald-400';
    if (changePercent < 0) return 'text-red-400';
    return 'text-white/70';
  };

  const getChangeIcon = (changePercent: number) => {
    if (changePercent > 0) return <TrendingUp className="w-3 h-3" />;
    if (changePercent < 0) return <TrendingDown className="w-3 h-3" />;
    return <Activity className="w-3 h-3" />;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-white/5 backdrop-blur-md border-white/10 p-4 animate-pulse">
              <div className="h-16 bg-white/10 rounded"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Crypto Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/5 backdrop-blur-md border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total Market Cap</p>
              <p className="text-white font-bold text-lg">$1.67T</p>
            </div>
            <div className="text-right">
              <p className="text-emerald-400 text-sm">+2.15%</p>
              <p className="text-emerald-400 text-xs">24h</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">24h Volume</p>
              <p className="text-white font-bold text-lg">$89.2B</p>
            </div>
            <div className="text-right">
              <p className="text-yellow-400 text-sm">-1.23%</p>
              <p className="text-yellow-400 text-xs">24h</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">BTC Dominance</p>
              <p className="text-white font-bold text-lg">42.3%</p>
            </div>
            <div className="text-right">
              <p className="text-emerald-400 text-sm">+0.5%</p>
              <p className="text-emerald-400 text-xs">24h</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Fear & Greed</p>
              <p className="text-white font-bold text-lg">67</p>
            </div>
            <div className="text-right">
              <p className="text-emerald-400 text-sm">Greed</p>
              <p className="text-emerald-400 text-xs">Index</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Crypto Prices */}
      <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Live Crypto Prices</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-emerald-400">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Live</span>
            </div>
            <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {cryptoData.map((crypto) => (
            <div 
              key={crypto.symbol} 
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => setSelectedSymbol(selectedSymbol === crypto.symbol ? null : crypto.symbol)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{crypto.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">{crypto.symbol}</div>
                    <div className="text-sm text-white/70">{crypto.name}</div>
                  </div>
                  <Badge variant="outline" className="border-white/20 text-white/70">
                    {crypto.marketCap}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="font-medium text-white">{formatPrice(crypto.price)}</div>
                    <div className="text-sm text-white/70">{crypto.volume} vol</div>
                  </div>
                  <div className={`text-right ${getPriceColor(crypto.changePercent)}`}>
                    <div className="flex items-center space-x-1">
                      {getChangeIcon(crypto.changePercent)}
                      <span className="font-medium">
                        {crypto.changePercent >= 0 ? '+' : ''}{crypto.changePercent.toFixed(2)}%
                      </span>
                    </div>
                    <div className="text-sm">
                      {crypto.change >= 0 ? '+' : ''}${crypto.change.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-right text-white/70">
                    <div className="text-sm">H: {formatPrice(crypto.high24h)}</div>
                    <div className="text-sm">L: {formatPrice(crypto.low24h)}</div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {selectedSymbol === crypto.symbol && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-white/70">24h High:</span>
                      <div className="text-white font-medium">{formatPrice(crypto.high24h)}</div>
                    </div>
                    <div>
                      <span className="text-white/70">24h Low:</span>
                      <div className="text-white font-medium">{formatPrice(crypto.low24h)}</div>
                    </div>
                    <div>
                      <span className="text-white/70">24h Volume:</span>
                      <div className="text-white font-medium">{crypto.volume}</div>
                    </div>
                    <div>
                      <span className="text-white/70">Market Cap:</span>
                      <div className="text-white font-medium">{crypto.marketCap}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-white/70">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Last updated: {new Date(crypto.lastUpdated).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Chart
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        Trade
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
