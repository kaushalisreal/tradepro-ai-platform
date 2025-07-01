
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Brain, AlertTriangle } from 'lucide-react';

export const MarketIntelligence = () => {
  const [sentiment, setSentiment] = useState(72);
  const [fearGreedIndex, setFearGreedIndex] = useState(45);

  const getSentimentColor = (value: number) => {
    if (value >= 70) return 'text-emerald-400';
    if (value >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const aiInsights = [
    {
      type: 'bullish',
      confidence: 78,
      message: 'TSLA showing bullish divergence pattern',
      timeframe: '4h'
    },
    {
      type: 'bearish',
      confidence: 65,
      message: 'Market volatility expected ahead of FOMC',
      timeframe: '1d'
    },
    {
      type: 'opportunity',
      confidence: 82,
      message: 'Tech sector oversold, potential bounce',
      timeframe: '1h'
    }
  ];

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">AI Market Intelligence</h3>
        <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
          <Brain className="w-3 h-3 mr-1" />
          Live Analysis
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Market Sentiment */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70">Market Sentiment</span>
            <span className={`font-bold ${getSentimentColor(sentiment)}`}>
              {sentiment}%
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${sentiment}%` }}
            ></div>
          </div>
          <p className="text-xs text-white/50 mt-2">Based on news, social media, and trading volume</p>
        </div>

        {/* Fear & Greed Index */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70">Fear & Greed Index</span>
            <span className={`font-bold ${getSentimentColor(fearGreedIndex)}`}>
              {fearGreedIndex}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${fearGreedIndex}%` }}
            ></div>
          </div>
          <p className="text-xs text-white/50 mt-2">Neutral - Balanced market conditions</p>
        </div>
      </div>

      {/* AI Insights */}
      <div>
        <h4 className="text-lg font-medium text-white mb-4">AI-Generated Insights</h4>
        <div className="space-y-3">
          {aiInsights.map((insight, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-3 flex items-start space-x-3">
              <div className={`p-1 rounded ${
                insight.type === 'bullish' ? 'bg-emerald-500/20' :
                insight.type === 'bearish' ? 'bg-red-500/20' : 'bg-blue-500/20'
              }`}>
                {insight.type === 'bullish' ? (
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                ) : insight.type === 'bearish' ? (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-blue-400" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">{insight.message}</p>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-xs text-white/50">{insight.timeframe}</span>
                  <Badge variant="secondary" className="text-xs bg-white/10 text-white/70">
                    {insight.confidence}% confidence
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
