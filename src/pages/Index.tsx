
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { TradingDashboard } from '@/components/TradingDashboard';
import { MarketTicker } from '@/components/MarketTicker';
import { AIAssistant } from '@/components/AIAssistant';

const Index = () => {
  const [isDemoMode, setIsDemoMode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      {/* Animated background gradient mesh */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        <Header />
        <MarketTicker />
        <HeroSection onDemoMode={() => setIsDemoMode(true)} />
        <TradingDashboard isDemoMode={isDemoMode} />
        <AIAssistant />
      </div>
    </div>
  );
};

export default Index;
