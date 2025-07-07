
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Settings, User, Menu, X, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-xl border-b border-white/5">
      {/* Enhanced glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-emerald-500/5"></div>
      
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Modern Logo Design */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              {/* Logo container with enhanced glass effect */}
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400/10 to-emerald-400/10 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center shadow-lg">
                <img src="/chronobi-logo.svg" alt="Chronobi" className="w-7 h-7" />
              </div>
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-emerald-400/30 rounded-xl blur-sm animate-pulse opacity-50"></div>
            </div>
            
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-300 via-white to-emerald-300 bg-clip-text text-transparent tracking-tight">
                Chronobi
              </h1>
            </div>
            
            {/* Live status indicator */}
            <div className="flex items-center space-x-1 ml-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
              <span className="text-xs text-emerald-300 font-medium">Live</span>
            </div>
          </Link>

          {/* Modern Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { name: 'Home', href: '/' },
              { name: 'Dashboard', href: '/dashboard' },
              { name: 'Market Screener', href: '/market-screener' },
              { name: 'Signal Center', href: '/signal-center' },
              { name: 'AI Insights', href: '/ai-insights' },
              { name: 'Notifications', href: '/notifications' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
                  isActive(item.href) 
                    ? 'text-white bg-white/10 backdrop-blur-sm rounded-lg border border-white/10' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {/* Hover background effect */}
                {!isActive(item.href) && (
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-lg border border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
                )}
                {/* Active indicator line */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 transition-all duration-300 ${
                  isActive(item.href) ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                }`}></div>
              </Link>
            ))}
          </nav>

          {/* Modern User Area */}
          <div className="flex items-center space-x-3">
            {/* Notification bell with modern styling */}
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative w-10 h-10 p-0 text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/5 rounded-xl transition-all duration-300"
              >
                <Bell className="w-4 h-4" />
                {/* Notification dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-400 to-orange-400 rounded-full border-2 border-black/50 animate-pulse"></div>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-10 h-10 p-0 text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/5 rounded-xl transition-all duration-300"
              >
                <Settings className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-10 h-10 p-0 text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/5 rounded-xl transition-all duration-300"
              >
                <User className="w-4 h-4" />
              </Button>
            </div>

            {/* Modern Sign In Button */}
            <Link to="/login">
              <Button className="relative bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white border-0 px-6 py-2 rounded-xl font-medium shadow-lg transition-all duration-300 hover:shadow-blue-500/25 hover:scale-105">
                <span className="relative z-10 flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Sign In</span>
                </span>
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-emerald-400/50 rounded-xl blur opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
            
            {/* Modern Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden w-10 h-10 p-0 text-white hover:bg-white/10 backdrop-blur-sm border border-white/5 rounded-xl transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-5 h-5">
                <Menu className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                <X className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
              </div>
            </Button>
          </div>
        </div>

        {/* Modern Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="mt-4 pb-4 border-t border-white/10">
            <nav className="flex flex-col space-y-2 mt-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Dashboard', href: '/dashboard' },
                { name: 'Market Screener', href: '/market-screener' },
                { name: 'Signal Center', href: '/signal-center' },
                { name: 'AI Insights', href: '/ai-insights' },
                { name: 'Notifications', href: '/notifications' }
              ].map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-3 transition-all duration-300 rounded-xl backdrop-blur-sm border group ${
                    isActive(item.href) 
                      ? 'text-white bg-white/10 border-white/10' 
                      : 'text-white/80 hover:text-white hover:bg-white/5 border-transparent hover:border-white/10'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.name}</span>
                    <div className={`w-2 h-2 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full transition-opacity duration-300 ${
                      isActive(item.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}></div>
                  </div>
                </Link>
              ))}
          </nav>
            
            {/* Mobile action buttons */}
            <div className="flex items-center justify-center space-x-3 mt-6 pt-4 border-t border-white/5">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/5 rounded-xl">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/5 rounded-xl">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/5 rounded-xl">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
