
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Shield, Clock, Users } from 'lucide-react';

interface HeroSectionProps {
  onDemoMode: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onDemoMode }) => {
  const [userCount, setUserCount] = useState(2000000);
  const [totalTrades, setTotalTrades] = useState(45876234);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 3));
      setTotalTrades(prev => prev + Math.floor(Math.random() * 50));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-32 pb-16 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headlines */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-emerald-200 bg-clip-text text-transparent leading-tight">
            AI-Powered Trading
            <br />
            Intelligence for Every Market
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Make smarter decisions with real-time analysis across stocks, crypto, forex, and commodities. 
            Join {userCount.toLocaleString()}+ traders using AI-driven insights.
          </p>

          {/* Social Proof Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-2xl font-bold text-white">{userCount.toLocaleString()}+</span>
              </div>
              <p className="text-white/60 text-sm">Active Traders</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                <span className="text-2xl font-bold text-white">{totalTrades.toLocaleString()}</span>
              </div>
              <p className="text-white/60 text-sm">Total Trades</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="text-2xl font-bold text-white">94.7%</span>
              </div>
              <p className="text-white/60 text-sm">AI Accuracy</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white border-0 px-8 py-6 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            >
              Start Trading Now
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm"
              onClick={onDemoMode}
            >
              Try Demo Mode
            </Button>
            
            <Button 
              size="lg" 
              variant="ghost" 
              className="text-white/80 hover:text-white hover:bg-white/5 px-8 py-6 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch 2-Min Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Bank-level Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>24/7 AI Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
