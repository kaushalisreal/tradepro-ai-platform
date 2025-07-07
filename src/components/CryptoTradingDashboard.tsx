import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CryptoMarketData } from './CryptoMarketData';
import { OrderBookComponent } from './OrderBook';
import { TradeTape } from './TradeTape';
import { AdvancedChart } from './AdvancedChart';
import { BarChart3, Activity, BookOpen, TrendingUp, AlertCircle, Volume2 } from 'lucide-react';

export const CryptoTradingDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Crypto Trading Dashboard</h1>
          <p className="text-white/70 mt-1">Real-time crypto market data powered by Binance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
            Live Data
          </Badge>
          <Badge variant="outline" className="border-blue-500/50 text-blue-400">
            Binance API
          </Badge>
        </div>
      </div>

      {/* Main Dashboard */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
          <TabsTrigger 
            value="overview"
            className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="charts"
            className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Charts
          </TabsTrigger>
          <TabsTrigger 
            value="orderbook"
            className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Order Book
          </TabsTrigger>
          <TabsTrigger 
            value="trades"
            className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
          >
            <Activity className="w-4 h-4 mr-2" />
            Trade Tape
          </TabsTrigger>
          <TabsTrigger 
            value="analysis"
            className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Analysis
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <CryptoMarketData />
        </TabsContent>

        {/* Charts Tab */}
        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <AdvancedChart />
            </div>
            <div className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Market Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">24h Volume</span>
                    <span className="text-white">$89.2B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Market Cap</span>
                    <span className="text-white">$1.67T</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">BTC Dominance</span>
                    <span className="text-white">42.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Active Pairs</span>
                    <span className="text-white">1,000+</span>
                  </div>
                </div>
              </Card>
              <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Top Gainers</h3>
                <div className="space-y-2">
                  {['AVAX', 'SOL', 'ADA', 'DOT'].map((symbol, index) => (
                    <div key={symbol} className="flex items-center justify-between">
                      <span className="text-white/70">{symbol}</span>
                      <span className="text-emerald-400">+{(Math.random() * 10 + 1).toFixed(2)}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Order Book Tab */}
        <TabsContent value="orderbook" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <OrderBookComponent />
            <div className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Order Book Analysis</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70">Bid/Ask Ratio</span>
                      <span className="text-emerald-400">1.45</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '59%' }}></div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70">Order Book Depth</span>
                      <span className="text-blue-400">Deep</span>
                    </div>
                    <div className="text-sm text-white/60">
                      Strong liquidity with tight spreads
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70">Market Pressure</span>
                      <span className="text-yellow-400">Neutral</span>
                    </div>
                    <div className="text-sm text-white/60">
                      Balanced buying and selling pressure
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Trades Tab */}
        <TabsContent value="trades" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <TradeTape />
            </div>
            <div className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Flow Analysis</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70">Buy Pressure</span>
                      <span className="text-emerald-400">67%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70">Large Trades</span>
                      <span className="text-orange-400">23</span>
                    </div>
                    <div className="text-sm text-white/60">
                      Trades &gt; $100K in last hour
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70">Avg Trade Size</span>
                      <span className="text-blue-400">$2.3K</span>
                    </div>
                    <div className="text-sm text-white/60">
                      Based on last 100 trades
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Volume Profile</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">POC (Point of Control)</span>
                  <span className="text-white">$43,567</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Value Area High</span>
                  <span className="text-white">$44,123</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Value Area Low</span>
                  <span className="text-white">$43,012</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Volume Imbalance</span>
                  <span className="text-emerald-400">+15.3%</span>
                </div>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Technical Indicators</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">RSI (14)</span>
                  <span className="text-yellow-400">58.3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">MACD</span>
                  <span className="text-emerald-400">Bullish</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">SMA (20)</span>
                  <span className="text-white">$43,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Bollinger Bands</span>
                  <span className="text-blue-400">Normal</span>
                </div>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Market Sentiment</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Fear & Greed Index</span>
                  <span className="text-emerald-400">67 (Greed)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Funding Rate</span>
                  <span className="text-white">0.0087%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Open Interest</span>
                  <span className="text-blue-400">$5.2B</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Long/Short Ratio</span>
                  <span className="text-emerald-400">1.34</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Alert Section */}
          <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Market Alerts</h3>
            <div className="space-y-3">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">BTC/USDT</span>
                  <span className="text-white/70">broke above resistance at $44,000</span>
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 font-medium">ETH/USDT</span>
                  <span className="text-white/70">volume spike detected - 150% above average</span>
                </div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">SOL/USDT</span>
                  <span className="text-white/70">RSI overbought condition - potential reversal</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
