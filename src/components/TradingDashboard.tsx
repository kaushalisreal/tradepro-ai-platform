
import React, { useState } from 'react';
import { MarketIntelligence } from '@/components/MarketIntelligence';
import { AdvancedChart } from '@/components/AdvancedChart';
import { PortfolioOverview } from '@/components/PortfolioOverview';
import { MarketScreener } from '@/components/MarketScreener';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TradingDashboardProps {
  isDemoMode: boolean;
}

export const TradingDashboard: React.FC<TradingDashboardProps> = ({ isDemoMode }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <section id="dashboard" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isDemoMode ? 'Demo Trading Dashboard' : 'Your Trading Dashboard'}
          </h2>
          <p className="text-white/70">
            AI-powered insights and real-time market analysis at your fingertips
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-sm border border-white/10">
            <TabsTrigger 
              value="overview" 
              className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="analysis" 
              className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
            >
              Analysis
            </TabsTrigger>
            <TabsTrigger 
              value="portfolio" 
              className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
            >
              Portfolio
            </TabsTrigger>
            <TabsTrigger 
              value="markets" 
              className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
            >
              Markets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <MarketIntelligence />
                <AdvancedChart />
              </div>
              <div className="space-y-6">
                <PortfolioOverview isDemoMode={isDemoMode} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="mt-8">
            <AdvancedChart />
          </TabsContent>

          <TabsContent value="portfolio" className="mt-8">
            <PortfolioOverview isDemoMode={isDemoMode} />
          </TabsContent>

          <TabsContent value="markets" className="mt-8">
            <MarketScreener />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
