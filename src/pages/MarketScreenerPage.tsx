import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { MarketScreener } from '@/components/MarketScreener';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { VortexBackground } from '@/components/VortexBackground';

const MarketScreenerPage = () => {
  const [activeMarket, setActiveMarket] = useState('all');

  const marketTypes = [
    { id: 'all', label: 'All Markets', icon: Activity },
    { id: 'crypto', label: 'Crypto', icon: TrendingUp },
    { id: 'stocks', label: 'Stocks', icon: TrendingUp },
    { id: 'forex', label: 'Forex', icon: TrendingDown },
    { id: 'commodities', label: 'Commodities', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Vortex animated background */}
      <VortexBackground />

      <div className="relative z-10">
        <Header />
        <div className="pt-20 px-4">
          <div className="container mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Market Screener</h1>
              <p className="text-white/70">
                Filter assets by market and set custom criteria to find the best trading opportunities
              </p>
            </div>

            <Tabs value={activeMarket} onValueChange={setActiveMarket} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
                {marketTypes.map((market) => {
                  const Icon = market.icon;
                  return (
                    <TabsTrigger
                      key={market.id}
                      value={market.id}
                      className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10 flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {market.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Filters Panel */}
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Filter className="w-5 h-5" />
                      Custom Filters
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Set your criteria for asset screening
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Price Change %</label>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-white/70 border-white/20">
                          {'>'}5%
                        </Badge>
                        <Badge variant="outline" className="text-white/70 border-white/20">
                          {'>'}10%
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Volume</label>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-white/70 border-white/20">
                          High
                        </Badge>
                        <Badge variant="outline" className="text-white/70 border-white/20">
                          Above Average
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">RSI</label>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-white/70 border-white/20">
                          Oversold
                        </Badge>
                        <Badge variant="outline" className="text-white/70 border-white/20">
                          Overbought
                        </Badge>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white">
                      Apply Filters
                    </Button>
                  </CardContent>
                </Card>

                {/* Market Data */}
                <div className="lg:col-span-3">
                  <TabsContent value="all" className="mt-0">
                    <MarketScreener />
                  </TabsContent>
                  <TabsContent value="crypto" className="mt-0">
                    <MarketScreener />
                  </TabsContent>
                  <TabsContent value="stocks" className="mt-0">
                    <MarketScreener />
                  </TabsContent>
                  <TabsContent value="forex" className="mt-0">
                    <MarketScreener />
                  </TabsContent>
                  <TabsContent value="commodities" className="mt-0">
                    <MarketScreener />
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketScreenerPage;
