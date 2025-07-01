
import React, { useState, useEffect } from 'react';

const marketData = [
  { symbol: 'SPY', name: 'S&P 500', price: 428.67, change: 2.45, changePercent: 0.57 },
  { symbol: 'BTC', name: 'Bitcoin', price: 43567.89, change: -1234.56, changePercent: -2.75 },
  { symbol: 'AAPL', name: 'Apple', price: 187.23, change: 3.45, changePercent: 1.88 },
  { symbol: 'TSLA', name: 'Tesla', price: 234.56, change: -8.92, changePercent: -3.67 },
  { symbol: 'GOOGL', name: 'Google', price: 156.78, change: 2.34, changePercent: 1.52 },
  { symbol: 'ETH', name: 'Ethereum', price: 2456.78, change: 67.89, changePercent: 2.84 },
];

export const MarketTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % marketData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-black/30 backdrop-blur-sm border-b border-white/5 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-8 overflow-hidden">
          {marketData.map((item, index) => (
            <div 
              key={item.symbol}
              className={`flex items-center space-x-2 transition-all duration-500 ${
                index === currentIndex ? 'opacity-100 scale-105' : 'opacity-60 scale-95'
              }`}
            >
              <span className="text-white/90 font-medium">{item.symbol}</span>
              <span className="text-white/70 text-sm">${item.price.toLocaleString()}</span>
              <span className={`text-sm font-medium ${
                item.change >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
