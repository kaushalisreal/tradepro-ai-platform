import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Plus, Search, Filter, TrendingUp, TrendingDown, Star, Trash2 } from 'lucide-react';
import { VortexBackground } from '@/components/VortexBackground';

const MyFiltersWatchlist = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const watchlistItems = [
    {
      id: 1,
      symbol: 'BTC/USD',
      name: 'Bitcoin',
      price: '$67,234.50',
      change: '+2.34%',
      changeValue: '+$1,543.21',
      market: 'Crypto',
      volume: '$42.5B',
      isPositive: true
    },
    {
      id: 2,
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: '$175.82',
      change: '-1.23%',
      changeValue: '-$2.18',
      market: 'Stocks',
      volume: '$85.2M',
      isPositive: false
    },
    {
      id: 3,
      symbol: 'EUR/USD',
      name: 'Euro Dollar',
      price: '1.0923',
      change: '+0.45%',
      changeValue: '+0.0049',
      market: 'Forex',
      volume: '$125.4M',
      isPositive: true
    },
    {
      id: 4,
      symbol: 'GOLD',
      name: 'Gold Futures',
      price: '$2,034.50',
      change: '+0.87%',
      changeValue: '+$17.65',
      market: 'Commodities',
      volume: '$15.8M',
      isPositive: true
    }
  ];

  const customFilters = [
    {
      id: 1,
      name: 'High Momentum Crypto',
      description: 'RSI > 70, Volume > 1M, Price Change > 5%',
      assets: 12,
      lastUpdated: '2 min ago'
    },
    {
      id: 2,
      name: 'Oversold Tech Stocks',
      description: 'RSI < 30, P/E < 25, Market Cap > 1B',
      assets: 8,
      lastUpdated: '5 min ago'
    },
    {
      id: 3,
      name: 'Forex Breakouts',
      description: 'MA Cross, ATR > 50, Volume > Average',
      assets: 15,
      lastUpdated: '1 min ago'
    },
    {
      id: 4,
      name: 'Commodity Trends',
      description: 'EMA 20 > EMA 50, MACD Positive',
      assets: 6,
      lastUpdated: '3 min ago'
    }
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
              <h1 className="text-3xl font-bold text-white mb-2">My Filters & Watchlist</h1>
              <p className="text-white/70">
                Manage your saved asset filters and track your favorite instruments
              </p>
            </div>

            <Tabs defaultValue="watchlist" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
                <TabsTrigger value="watchlist" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10">
                  <Heart className="w-4 h-4 mr-2" />
                  Watchlist
                </TabsTrigger>
                <TabsTrigger value="filters" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10">
                  <Filter className="w-4 h-4 mr-2" />
                  Custom Filters
                </TabsTrigger>
              </TabsList>

              <TabsContent value="watchlist" className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                    <Input
                      placeholder="Search assets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder-white/50"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Asset
                  </Button>
                </div>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Your Watchlist
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Track your favorite assets and get real-time updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/10">
                            <TableHead className="text-white/70">Asset</TableHead>
                            <TableHead className="text-white/70">Price</TableHead>
                            <TableHead className="text-white/70">Change</TableHead>
                            <TableHead className="text-white/70">Volume</TableHead>
                            <TableHead className="text-white/70">Market</TableHead>
                            <TableHead className="text-white/70">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {watchlistItems.map((item) => (
                            <TableRow key={item.id} className="border-white/10 hover:bg-white/5">
                              <TableCell className="text-white">
                                <div>
                                  <div className="font-semibold">{item.symbol}</div>
                                  <div className="text-sm text-white/50">{item.name}</div>
                                </div>
                              </TableCell>
                              <TableCell className="text-white font-medium">
                                {item.price}
                              </TableCell>
                              <TableCell>
                                <div className={`flex items-center gap-1 ${item.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                  {item.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                  <span className="font-semibold">{item.change}</span>
                                </div>
                                <div className="text-sm text-white/50">{item.changeValue}</div>
                              </TableCell>
                              <TableCell className="text-white/70">{item.volume}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-white/70 border-white/20">
                                  {item.market}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="filters" className="space-y-6">
                <div className="flex justify-end mb-6">
                  <Button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Filter
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {customFilters.map((filter) => (
                    <Card key={filter.id} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-white text-lg">{filter.name}</CardTitle>
                          <Badge variant="outline" className="text-white/70 border-white/20">
                            {filter.assets} assets
                          </Badge>
                        </div>
                        <CardDescription className="text-white/70">
                          {filter.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/50">Last updated: {filter.lastUpdated}</span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-white/70 border-white/20 hover:bg-white/10 hover:text-white bg-white/5">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="text-white/70 border-white/20 hover:bg-white/10 hover:text-white bg-white/5">
                              Run
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFiltersWatchlist;
