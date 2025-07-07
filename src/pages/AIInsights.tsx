import React from 'react';
import { Header } from '@/components/Header';
import AIChat from '@/components/AIChat';
import MarketIdeasPopup from '@/components/MarketIdeasPopup';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, BookOpen, TrendingUp, MessageSquare, Lightbulb, Target } from 'lucide-react';
import { VortexBackground } from '@/components/VortexBackground';

const AIInsights = () => {
  const strategies = [
    {
      title: "Momentum Trading",
      description: "Capitalize on strong price movements and trend continuation",
      difficulty: "Intermediate",
      success_rate: "72%"
    },
    {
      title: "Mean Reversion",
      description: "Profit from price corrections back to historical averages",
      difficulty: "Advanced",
      success_rate: "68%"
    },
    {
      title: "Breakout Trading",
      description: "Enter trades when price breaks through support/resistance",
      difficulty: "Beginner",
      success_rate: "65%"
    },
    {
      title: "RSI Divergence",
      description: "Identify potential reversals using momentum indicators",
      difficulty: "Intermediate",
      success_rate: "74%"
    }
  ];

  const insights = [
    {
      title: "Market Outlook: Bullish Crypto Trend",
      description: "Bitcoin showing strong accumulation patterns with institutional buying",
      confidence: "High",
      timeframe: "1-2 weeks"
    },
    {
      title: "Tech Stocks: Correction Expected",
      description: "Overvalued tech stocks likely to see 5-10% pullback",
      confidence: "Medium", 
      timeframe: "3-5 days"
    },
    {
      title: "Gold: Safe Haven Demand Rising",
      description: "Geopolitical tensions driving precious metals higher",
      confidence: "High",
      timeframe: "1-3 weeks"
    }
  ];

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Intermediate': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Advanced': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[difficulty] || colors['Intermediate'];
  };

  const getConfidenceColor = (confidence) => {
    const colors = {
      'High': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Low': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[confidence] || colors['Medium'];
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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">AI Insights</h1>
                  <p className="text-white/70">
                    Get AI-powered market analysis, strategy explanations, and personalized trading insights
                  </p>
                </div>
                <MarketIdeasPopup />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* AI Chat Assistant */}
              <div className="lg:col-span-2">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Ask AI Assistant
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Get instant answers about market trends, asset analysis, and trading strategies
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-full">
                    <AIChat />
                  </CardContent>
                </Card>
              </div>

              {/* Quick Insights */}
              <div className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Market Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {insights.map((insight, index) => (
                      <div key={index} className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-white text-sm">{insight.title}</h4>
                          <Badge className={getConfidenceColor(insight.confidence)}>
                            {insight.confidence}
                          </Badge>
                        </div>
                        <p className="text-white/70 text-sm mb-2">{insight.description}</p>
                        <div className="flex items-center gap-2">
                          <Target className="w-3 h-3 text-white/50" />
                          <span className="text-xs text-white/50">{insight.timeframe}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      AI Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Questions Answered</span>
                      <span className="text-white font-semibold">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Accuracy Rate</span>
                      <span className="text-green-400 font-semibold">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Response Time</span>
                      <span className="text-blue-400 font-semibold">{'<'}2s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Active Users</span>
                      <span className="text-yellow-400 font-semibold">3,421</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Strategy Library */}
            <div className="mt-12">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Strategy Library
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Learn from proven trading strategies with AI-powered explanations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {strategies.map((strategy, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-white">{strategy.title}</h4>
                          <Badge className={getDifficultyColor(strategy.difficulty)}>
                            {strategy.difficulty}
                          </Badge>
                        </div>
                        <p className="text-white/70 text-sm mb-3">{strategy.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-green-400">{strategy.success_rate}</span>
                          </div>
                          <span className="text-xs text-white/50">Learn More</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
