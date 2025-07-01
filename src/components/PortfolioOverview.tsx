
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';

interface PortfolioOverviewProps {
  isDemoMode: boolean;
}

export const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({ isDemoMode }) => {
  const portfolioData = {
    totalValue: 125467.89,
    dayChange: 2847.23,
    dayChangePercent: 2.32,
    totalGainLoss: 18234.67,
    totalGainLossPercent: 17.48
  };

  const holdings = [
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, value: 9361.50, change: 172.50, changePercent: 1.88 },
    { symbol: 'TSLA', name: 'Tesla Inc.', shares: 25, value: 5864.00, change: -223.00, changePercent: -3.67 },
    { symbol: 'BTC', name: 'Bitcoin', shares: 0.5, value: 21783.95, change: -617.28, changePercent: -2.75 },
    { symbol: 'GOOGL', name: 'Google', shares: 30, value: 4703.40, change: 70.20, changePercent: 1.52 },
    { symbol: 'MSFT', name: 'Microsoft', shares: 40, value: 15240.00, change: 456.80, changePercent: 3.09 },
  ];

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">
            {isDemoMode ? 'Demo Portfolio' : 'Portfolio Overview'}
          </h3>
          <Badge variant="outline" className="border-blue-500/50 text-blue-400">
            <PieChart className="w-3 h-3 mr-1" />
            Real-time
          </Badge>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-3xl font-bold text-white mb-1">
              ${portfolioData.totalValue.toLocaleString()}
            </div>
            <div className={`flex items-center space-x-2 ${
              portfolioData.dayChange >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {portfolioData.dayChange >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-medium">
                {portfolioData.dayChange >= 0 ? '+' : ''}${portfolioData.dayChange.toLocaleString()} 
                ({portfolioData.dayChangePercent.toFixed(2)}%) today
              </span>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Total Gain/Loss</span>
              <div className={`font-bold ${
                portfolioData.totalGainLoss >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {portfolioData.totalGainLoss >= 0 ? '+' : ''}${portfolioData.totalGainLoss.toLocaleString()} 
                ({portfolioData.totalGainLossPercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 mt-6">
          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600">
            <DollarSign className="w-4 h-4 mr-2" />
            Buy
          </Button>
          <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
            Sell
          </Button>
        </div>
      </Card>

      {/* Holdings */}
      <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Holdings</h4>
        <div className="space-y-3">
          {holdings.map((holding) => (
            <div key={holding.symbol} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-medium text-white">{holding.symbol}</div>
                  <div className="text-sm text-white/70">{holding.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-white">${holding.value.toLocaleString()}</div>
                  <div className={`text-sm ${
                    holding.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {holding.change >= 0 ? '+' : ''}${holding.change.toFixed(2)} 
                    ({holding.changePercent.toFixed(2)}%)
                  </div>
                </div>
              </div>
              <div className="text-xs text-white/50">
                {holding.shares} shares
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Quick Actions</h4>
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10">
            View Full Portfolio
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10">
            Rebalance Portfolio
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10">
            Performance Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10">
            Risk Assessment
          </Button>
        </div>
      </Card>
    </div>
  );
};
