import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MarketScreenerPage from "./pages/MarketScreenerPage";
import SignalCenter from "./pages/SignalCenter";
import AIInsights from "./pages/AIInsights";
import Notifications from "./pages/Notifications";
import MyFiltersWatchlist from "./pages/MyFiltersWatchlist";
import LoginSignup from "./pages/LoginSignup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/market-screener" element={<MarketScreenerPage />} />
          <Route path="/signal-center" element={<SignalCenter />} />
          <Route path="/ai-insights" element={<AIInsights />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/watchlist" element={<MyFiltersWatchlist />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<LoginSignup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
