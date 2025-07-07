import React from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { MarketTicker } from '@/components/MarketTicker';
import MarketIdeasPopup from '@/components/MarketIdeasPopup';
import { VortexBackground } from '@/components/VortexBackground';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Vortex animated background */}
      <VortexBackground />

      <div className="relative z-10">
        <Header />
        <MarketTicker />
        <HeroSection onDemoMode={() => {}} />
        
        {/* Market Ideas Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              🔥 Hot Market Opportunities
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Discover real-time trading ideas powered by AI analysis across all major markets
            </p>
            <MarketIdeasPopup />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
