
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export const AdvancedChart = () => {
  const [selectedAsset, setSelectedAsset] = useState('AAPL');
  const [timeframe, setTimeframe] = useState('1D');
  const [chartData, setChartData] = useState<any[]>([]);

  const assets = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 187.23, change: 3.45, changePercent: 1.88 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 234.56, change: -8.92, changePercent: -3.67 },
    { symbol: 'BTC', name: 'Bitcoin', price: 43567.89, change: -1234.56, changePercent: -2.75 },
    { symbol: 'ETH', name: 'Ethereum', price: 2456.78, change: 67.89, changePercent: 2.84 },
  ];

  const timeframes = ['1M', '5M', '1H', '1D', '1W', '1M'];

  // Generate mock candlestick data
  useEffect(() => {
    const generateMockData = () => {
      const data = [];
      const basePrice = assets.find(a => a.symbol === selectedAsset)?.price || 100;
      
      for (let i = 0; i < 50; i++) {
        const variation = (Math.random() - 0.5) * 10;
        const open = basePrice + variation;
        const close = open + (Math.random() - 0.5) * 5;
        const high = Math.max(open, close) + Math.random() * 3;
        const low = Math.min(open, close) - Math.random() * 3;
        
        data.push({ open, high, low, close, volume: Math.random() * 1000000 });
      }
      return data;
    };

    setChartData(generateMockData());
  }, [selectedAsset]);

  const currentAsset = assets.find(a => a.symbol === selectedAsset);

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Advanced Chart Analysis</h3>
          {currentAsset && (
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-white">
                ${currentAsset.price.toFixed(2)}
              </span>
              <div className={`flex items-center space-x-1 ${
                currentAsset.change >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {currentAsset.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="font-medium">
                  {currentAsset.change >= 0 ? '+' : ''}{currentAsset.change.toFixed(2)} 
                  ({currentAsset.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeframe(tf)}
              className={`${
                timeframe === tf 
                  ? 'bg-blue-500 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>

      <Tabs value={selectedAsset} onValueChange={setSelectedAsset} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
          {assets.map((asset) => (
            <TabsTrigger 
              key={asset.symbol}
              value={asset.symbol}
              className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
            >
              {asset.symbol}
            </TabsTrigger>
          ))}
        </TabsList>

        {assets.map((asset) => (
          <TabsContent key={asset.symbol} value={asset.symbol}>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between text-sm text-white/70 mb-2">
                <span>O: {chartData[0]?.open.toFixed(2)}</span>
                <span>H: {Math.max(...chartData.map(d => d.high)).toFixed(2)}</span>
                <span>L: {Math.min(...chartData.map(d => d.low)).toFixed(2)}</span>
                <span>C: {chartData[chartData.length - 1]?.close.toFixed(2)}</span>
                <span>Vol: {(chartData.reduce((sum, d) => sum + d.volume, 0) / 1000000).toFixed(1)}M</span>
              </div>
            </div>
            
            {/* Mock Chart Visualization */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 h-80 flex items-end justify-between">
              {chartData.slice(0, 20).map((candle, index) => (
                <div key={index} className="flex flex-col items-center space-y-1">
                  {/* Candlestick representation */}
                  <div 
                    className={`w-2 rounded-sm ${
                      candle.close >= candle.open ? 'bg-emerald-400' : 'bg-red-400'
                    }`}
                    style={{ 
                      height: `${Math.abs(candle.close - candle.open) * 5 + 20}px` 
                    }}
                  ></div>
                  {/* Volume bar */}
                  <div 
                    className="w-2 bg-white/20 rounded-sm"
                    style={{ 
                      height: `${(candle.volume / 1000000) * 20 + 5}px` 
                    }}
                  ></div>
                </div>
              ))}
            </div>
            
            {/* Technical Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-white/70 text-sm">RSI</div>
                <div className="text-yellow-400 font-bold">67.8</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-white/70 text-sm">MACD</div>
                <div className="text-emerald-400 font-bold">+2.45</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-white/70 text-sm">MA(20)</div>
                <div className="text-blue-400 font-bold">{(asset.price * 0.98).toFixed(2)}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-white/70 text-sm">Volume</div>
                <div className="text-purple-400 font-bold">2.4M</div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};
