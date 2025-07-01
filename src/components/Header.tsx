
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Settings, User, Menu, X } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              TradePro AI
            </h1>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#dashboard" className="text-white/80 hover:text-white transition-colors">Dashboard</a>
            <a href="#markets" className="text-white/80 hover:text-white transition-colors">Markets</a>
            <a href="#analysis" className="text-white/80 hover:text-white transition-colors">Analysis</a>
            <a href="#portfolio" className="text-white/80 hover:text-white transition-colors">Portfolio</a>
          </nav>

          {/* User Area */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                <User className="w-4 h-4" />
              </Button>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white border-0">
              Sign In
            </Button>
            
            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <nav className="flex flex-col space-y-3">
              <a href="#dashboard" className="text-white/80 hover:text-white transition-colors">Dashboard</a>
              <a href="#markets" className="text-white/80 hover:text-white transition-colors">Markets</a>
              <a href="#analysis" className="text-white/80 hover:text-white transition-colors">Analysis</a>
              <a href="#portfolio" className="text-white/80 hover:text-white transition-colors">Portfolio</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
