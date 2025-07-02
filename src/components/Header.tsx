
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, TrendingUp } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TradePro</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#help" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Help Center
            </a>
            <a href="#discord" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Discord
            </a>
            <a href="#pricing" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Pricing
            </a>
            <a href="#login" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Login
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Sign Up Button */}
            <Button className="hidden md:inline-flex bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
              Sign Up Free
            </Button>
            
            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden w-9 h-9 p-0 text-white hover:bg-white/10 rounded-lg"
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

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
        }`}>
          <div className="pt-4 border-t border-white/[0.08]">
            <nav className="flex flex-col space-y-4">
              <a
                href="#help"
                className="text-white/80 hover:text-white transition-colors py-2 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Help Center
              </a>
              <a
                href="#discord"
                className="text-white/80 hover:text-white transition-colors py-2 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Discord
              </a>
              <a
                href="#pricing"
                className="text-white/80 hover:text-white transition-colors py-2 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#login"
                className="text-white/80 hover:text-white transition-colors py-2 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </a>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium w-fit mt-2">
                Sign Up Free
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
