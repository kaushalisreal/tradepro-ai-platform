import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, MessageCircle, Star, Clock, Target } from 'lucide-react';
import { VortexBackground } from '@/components/VortexBackground';

const SignalCenter = () => {
  const [selectedSignal, setSelectedSignal] = useState(null);

  const signals = [
    {
      id: 1,
      asset: 'BTC/USD',
      type: 'BUY',
      confidence: 87,
      time: '2 min ago',
      price: '$67,234',
      strategy: 'Momentum Breakout',
      market: 'Crypto',
      strength: 'Strong'
    },
    {
      id: 2,
      asset: 'AAPL',
      type: 'SELL',
      confidence: 72,
      time: '5 min ago',
      price: '$175.82',
      strategy: 'RSI Divergence',
      market: 'Stocks',
      strength: 'Medium'
    },
    {
      id: 3,
      asset: 'EUR/USD',
      type: 'BUY',
      confidence: 91,
      time: '8 min ago',
      price: '1.0923',
      strategy: 'MA Crossover',
      market: 'Forex',
      strength: 'Very Strong'
    },
    {
      id: 4,
      asset: 'GOLD',
      type: 'BUY',
      confidence: 68,
      time: '12 min ago',
      price: '$2,034.50',
      strategy: 'Support Bounce',
      market: 'Commodities',
      strength: 'Medium'
    },
    {
      id: 5,
      asset: 'ETH/USD',
      type: 'SELL',
      confidence: 79,
      time: '15 min ago',
      price: '$3,456.78',
      strategy: 'Double Top',
      market: 'Crypto',
      strength: 'Strong'
    }
  ];

  const getSignalColor = (type) => {
    return type === 'BUY' ? 'text-green-400' : 'text-red-400';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStrengthBadge = (strength) => {
    const variants = {
      'Very Strong': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Strong': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Weak': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return variants[strength] || variants['Medium'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Vortex animated background */}
      <VortexBackground />

      <div className="relative z-10">
        <Header />
        <div className="pt-20 px-4">
          <div className="container mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Signal Center</h1>
              <p className="text-white/70">
                Latest trading signals with AI-powered explanations and confidence scores
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Signals Table */}
              <div className="lg:col-span-2">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Recent Signals
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Real-time buy/sell signals across all markets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/10">
                            <TableHead className="text-white/70">Asset</TableHead>
                            <TableHead className="text-white/70">Signal</TableHead>
                            <TableHead className="text-white/70">Confidence</TableHead>
                            <TableHead className="text-white/70">Time</TableHead>
                            <TableHead className="text-white/70">Strategy</TableHead>
                            <TableHead className="text-white/70">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {signals.map((signal) => (
                            <TableRow key={signal.id} className="border-white/10 hover:bg-white/5">
                              <TableCell className="text-white font-medium">
                                <div>
                                  <div className="font-semibold">{signal.asset}</div>
                                  <div className="text-sm text-white/50">{signal.market}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className={`flex items-center gap-1 font-semibold ${getSignalColor(signal.type)}`}>
                                  {signal.type === 'BUY' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                  {signal.type}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <span className={`font-semibold ${getConfidenceColor(signal.confidence)}`}>
                                    {signal.confidence}%
                                  </span>
                                  <Badge className={getStrengthBadge(signal.strength)}>
                                    {signal.strength}
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell className="text-white/70 flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {signal.time}
                              </TableCell>
                              <TableCell className="text-white/70">{signal.strategy}</TableCell>
                              <TableCell>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-white/70 border-white/20 hover:bg-white/10 hover:text-white bg-white/5"
                                  onClick={() => setSelectedSignal(signal)}
                                >
                                  <MessageCircle className="w-4 h-4 mr-1" />
                                  Explain
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Signal Details */}
              <div className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Signal Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Total Signals Today</span>
                      <span className="text-white font-semibold">23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Success Rate</span>
                      <span className="text-green-400 font-semibold">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Avg. Confidence</span>
                      <span className="text-blue-400 font-semibold">82%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Active Signals</span>
                      <span className="text-yellow-400 font-semibold">12</span>
                    </div>
                  </CardContent>
                </Card>

                {selectedSignal && (
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        AI Signal Analysis
                      </CardTitle>
                      <CardDescription className="text-white/70">
                        {selectedSignal.asset} - {selectedSignal.type} Signal
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-lg">
                          <p className="text-white/80 text-sm leading-relaxed">
                            This {selectedSignal.type} signal for {selectedSignal.asset} is based on a {selectedSignal.strategy} 
                            pattern with {selectedSignal.confidence}% confidence. The signal strength is rated as {selectedSignal.strength.toLowerCase()} 
                            due to favorable market conditions and technical indicators alignment.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-white/70">Entry Price</label>
                            <p className="text-white font-semibold">{selectedSignal.price}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-white/70">Strategy</label>
                            <p className="text-white font-semibold">{selectedSignal.strategy}</p>
                          </div>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white">
                          Get Full Analysis
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalCenter;
