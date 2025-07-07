import React from 'react';
import { Header } from '@/components/Header';
import { TradingDashboard } from '@/components/TradingDashboard';
import { VortexBackground } from '@/components/VortexBackground';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Vortex animated background */}
      <VortexBackground />

      <div className="relative z-10">
        <Header />
        <div className="pt-20">
          <TradingDashboard isDemoMode={false} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
