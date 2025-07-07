
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { TradingDashboard } from '@/components/TradingDashboard';
import { MarketTicker } from '@/components/MarketTicker';
import { AIAssistant } from '@/components/AIAssistant';
import { VortexBackground } from '@/components/VortexBackground';

const Index = () => {
  const [isDemoMode, setIsDemoMode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Vortex animated background */}
      <VortexBackground />

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
