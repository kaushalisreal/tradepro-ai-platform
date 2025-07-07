import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrendingUp, TrendingDown, Activity, Clock, Target, AlertCircle } from 'lucide-react';

const MarketIdeasPopup = () => {
  const [selectedIdea, setSelectedIdea] = useState(null);

  const marketIdeas = [
    {
      id: 1,
      title: "Bitcoin Breakout Alert",
      description: "BTC showing strong momentum above $65,000 resistance",
      type: "BUY",
      asset: "BTC/USD",
      confidence: 89,
      timeframe: "24-48 hours",
      reason: "Strong volume breakout with institutional backing",
      targetPrice: "$72,000",
      riskLevel: "Medium",
      category: "Crypto"
    },
    {
      id: 2,
      title: "Tech Stock Pullback",
      description: "NASDAQ showing overbought conditions",
      type: "SELL",
      asset: "QQQ",
      confidence: 76,
      timeframe: "3-5 days",
      reason: "RSI divergence and profit-taking pressure",
      targetPrice: "$380",
      riskLevel: "Low",
      category: "Stocks"
    },
    {
      id: 3,
      title: "Gold Safe Haven Play",
      description: "Precious metals gaining momentum",
      type: "BUY",
      asset: "GOLD",
      confidence: 82,
      timeframe: "1-2 weeks",
      reason: "Geopolitical tensions and inflation hedge",
      targetPrice: "$2,150",
      riskLevel: "Low",
      category: "Commodities"
    },
    {
      id: 4,
      title: "EUR/USD Reversal",
      description: "Euro showing strength against dollar",
      type: "BUY",
      asset: "EUR/USD",
      confidence: 71,
      timeframe: "5-7 days",
      reason: "ECB policy divergence and technical support",
      targetPrice: "1.1200",
      riskLevel: "Medium",
      category: "Forex"
    },
    {
      id: 5,
      title: "Oil Supply Concerns",
      description: "Crude oil momentum building",
      type: "BUY",
      asset: "WTI",
      confidence: 85,
      timeframe: "2-3 weeks",
      reason: "Supply disruptions and demand recovery",
      targetPrice: "$95",
      riskLevel: "High",
      category: "Commodities"
    },
    {
      id: 6,
      title: "AI Stocks Correction",
      description: "Overvalued AI stocks due for pullback",
      type: "SELL",
      asset: "NVDA",
      confidence: 78,
      timeframe: "1-2 weeks",
      reason: "Excessive valuation and profit-taking",
      targetPrice: "$850",
      riskLevel: "Medium",
      category: "Stocks"
    }
  ];

  const getSignalColor = (type) => {
    return type === 'BUY' ? 'text-green-400' : 'text-red-400';
  };

  const getSignalBg = (type) => {
    return type === 'BUY' ? 'bg-green-500/20 border-green-500/30' : 'bg-red-500/20 border-red-500/30';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskColor = (risk) => {
    const colors = {
      'Low': 'text-green-400',
      'Medium': 'text-yellow-400',
      'High': 'text-red-400'
    };
    return colors[risk] || 'text-gray-400';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Crypto': return <TrendingUp className="w-4 h-4" />;
      case 'Stocks': return <Activity className="w-4 h-4" />;
      case 'Forex': return <TrendingDown className="w-4 h-4" />;
      case 'Commodities': return <Target className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg">
          <AlertCircle className="w-4 h-4 mr-2" />
          Current Market Ideas
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-slate-950 border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white mb-2">
            🚨 Current Market Ideas
          </DialogTitle>
          <DialogDescription className="text-white/70">
            AI-powered trading opportunities updated in real-time
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {marketIdeas.map((idea) => (
            <Card key={idea.id} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(idea.category)}
                    <CardTitle className="text-white text-lg">{idea.title}</CardTitle>
                  </div>
                  <Badge className={`${getSignalBg(idea.type)} ${getSignalColor(idea.type)}`}>
                    {idea.type}
                  </Badge>
                </div>
                <CardDescription className="text-white/70">
                  {idea.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/80">Asset:</span>
                  <span className="text-white font-semibold">{idea.asset}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/80">Confidence:</span>
                  <span className={`font-semibold ${getConfidenceColor(idea.confidence)}`}>
                    {idea.confidence}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/80">Timeframe:</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-white/50" />
                    <span className="text-white/70 text-sm">{idea.timeframe}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/80">Target:</span>
                  <span className="text-white font-semibold">{idea.targetPrice}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/80">Risk Level:</span>
                  <span className={`font-semibold ${getRiskColor(idea.riskLevel)}`}>
                    {idea.riskLevel}
                  </span>
                </div>
                
                <div className="pt-2 border-t border-white/10">
                  <p className="text-sm text-white/60 italic">
                    "{idea.reason}"
                  </p>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white"
                  >
                    Get Analysis
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-white/70 border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    Add to Watchlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <h4 className="font-semibold text-white">Disclaimer</h4>
          </div>
          <p className="text-sm text-white/70">
            These are AI-generated market ideas based on technical analysis and market data. 
            Not financial advice. Always do your own research and consider your risk tolerance.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MarketIdeasPopup;
