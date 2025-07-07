import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { VortexBackground } from '@/components/VortexBackground';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      {/* Vortex animated background */}
      <VortexBackground />
      
      <div className="relative z-10 text-center px-6">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-300 via-white to-emerald-300 bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-white/70 mb-8">Oops! Page not found</p>
        <Link to="/" className="inline-block bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
