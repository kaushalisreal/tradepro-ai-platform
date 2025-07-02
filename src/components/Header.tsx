
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Settings, User, Menu, X, TrendingUp } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/[0.08]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Clean and Simple */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TradePro</span>
            <span className="text-xs font-medium px-2 py-0.5 bg-blue-500/20 rounded-full text-blue-300 border border-blue-500/30">
              AI
            </span>
          </div>

          {/* Desktop Navigation - Clean Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Dashboard', href: '#dashboard' },
              { name: 'Markets', href: '#markets' },
              { name: 'Analysis', href: '#analysis' },
              { name: 'Portfolio', href: '#portfolio' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Right Side - Clean Actions */}
          <div className="flex items-center space-x-3">
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-9 h-9 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <Bell className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-9 h-9 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <Settings className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-9 h-9 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <User className="w-4 h-4" />
              </Button>
            </div>

            {/* Clean CTA Button */}
            <Button className="bg-white text-black hover:bg-white/90 font-medium px-4 py-2 h-9 rounded-lg transition-all duration-200 hover:scale-105">
              Sign In
            </Button>
            
            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden w-9 h-9 p-0 text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu - Slide Down */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}>
          <div className="pt-4 border-t border-white/[0.08]">
            <nav className="flex flex-col space-y-3">
              {[
                { name: 'Dashboard', href: '#dashboard' },
                { name: 'Markets', href: '#markets' },
                { name: 'Analysis', href: '#analysis' },
                { name: 'Portfolio', href: '#portfolio' }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white/70 hover:text-white transition-colors duration-200 py-2 px-2 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            
            {/* Mobile Action Buttons */}
            <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-white/[0.08]">
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
