
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Star, Search } from 'lucide-react';

export const MarketScreener = () => {
  const [selectedCategory, setSelectedCategory] = useState('stocks');

  const stockData = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 187.23, change: 3.45, changePercent: 1.88, volume: '45.2M', marketCap: '2.89T' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 381.00, change: 11.70, changePercent: 3.17, volume: '28.1M', marketCap: '2.83T' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 156.78, change: 2.34, changePercent: 1.52, volume: '22.7M', marketCap: '1.97T' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 145.67, change: -2.89, changePercent: -1.94, volume: '31.4M', marketCap: '1.51T' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 234.56, change: -8.92, changePercent: -3.67, volume: '87.3M', marketCap: '746B' },
  ];

  const cryptoData = [
    { symbol: 'BTC', name: 'Bitcoin', price: 43567.89, change: -1234.56, changePercent: -2.75, volume: '$23.4B', marketCap: '$853B' },
    { symbol: 'ETH', name: 'Ethereum', price: 2456.78, change: 67.89, changePercent: 2.84, volume: '$12.1B', marketCap: '$295B' },
    { symbol: 'ADA', name: 'Cardano', price: 0.4789, change: 0.0234, changePercent: 5.14, volume: '$456M', marketCap: '$16.8B' },
    { symbol: 'SOL', name: 'Solana', price: 98.45, change: -3.21, changePercent: -3.16, volume: '$1.2B', marketCap: '$42.1B' },
    { symbol: 'AVAX', name: 'Avalanche', price: 34.67, change: 1.89, changePercent: 5.77, volume: '$234M', marketCap: '$12.7B' },
  ];

  const topMovers = [
    { symbol: 'NVDA', change: 8.45, changePercent: 12.34 },
    { symbol: 'AMD', change: -5.67, changePercent: -8.92 },
    { symbol: 'META', change: 15.23, changePercent: 6.78 },
    { symbol: 'NFLX', change: -12.34, changePercent: -4.56 },
  ];

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 backdrop-blur-md border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">S&P 500</p>
              <p className="text-white font-bold text-lg">4,287.50</p>
            </div>
            <div className="text-right">
              <p className="text-emerald-400 text-sm">+0.85%</p>
              <p className="text-emerald-400 text-xs">+36.42</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">NASDAQ</p>
              <p className="text-white font-bold text-lg">13,456.78</p>
            </div>
            <div className="text-right">
              <p className="text-red-400 text-sm">-0.34%</p>
              <p className="text-red-400 text-xs">-45.67</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Crypto Market</p>
              <p className="text-white font-bold text-lg">$1.67T</p>
            </div>
            <div className="text-right">
              <p className="text-emerald-400 text-sm">+2.15%</p>
              <p className="text-emerald-400 text-xs">+$35.2B</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">VIX</p>
              <p className="text-white font-bold text-lg">18.45</p>
            </div>
            <div className="text-right">
              <p className="text-yellow-400 text-sm">-3.45%</p>
              <p className="text-yellow-400 text-xs">-0.66</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Movers */}
      <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Top Movers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topMovers.map((mover) => (
            <div key={mover.symbol} className="bg-white/5 rounded-lg p-3 text-center">
              <div className="font-medium text-white mb-1">{mover.symbol}</div>
              <div className={`flex items-center justify-center space-x-1 ${
                mover.change >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {mover.change >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span className="text-sm font-medium">
                  {mover.changePercent >= 0 ? '+' : ''}{mover.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Market Screener */}
      <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Market Screener</h3>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Search className="w-4 h-4 mr-2" />
            Advanced Filter
          </Button>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
            <TabsTrigger 
              value="stocks"
              className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
            >
              Stocks
            </TabsTrigger>
            <TabsTrigger 
              value="crypto"
              className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
            >
              Crypto
            </TabsTrigger>
            <TabsTrigger 
              value="forex"
              className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
            >
              Forex
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stocks">
            <div className="space-y-3">
              {stockData.map((stock) => (
                <div key={stock.symbol} className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-medium text-white">{stock.symbol}</div>
                      <div className="text-sm text-white/70">{stock.name}</div>
                    </div>
                    <Badge variant="outline" className="border-white/20 text-white/70">
                      {stock.marketCap}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="font-medium text-white">${stock.price}</div>
                      <div className="text-sm text-white/70">{stock.volume}</div>
                    </div>
                    <div className={`text-right ${
                      stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      <div className="font-medium">
                        {stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}
                      </div>
                      <div className="text-sm">
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="crypto">
            <div className="space-y-3">
              {cryptoData.map((crypto) => (
                <div key={crypto.symbol} className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
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
                      <div className="font-medium text-white">${crypto.price.toLocaleString()}</div>
                      <div className="text-sm text-white/70">{crypto.volume}</div>
                    </div>
                    <div className={`text-right ${
                      crypto.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      <div className="font-medium">
                        {crypto.change >= 0 ? '+' : ''}${crypto.change.toFixed(2)}
                      </div>
                      <div className="text-sm">
                        {crypto.changePercent >= 0 ? '+' : ''}{crypto.changePercent.toFixed(2)}%
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="forex">
            <div className="text-center py-8 text-white/70">
              <p>Forex pairs coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
