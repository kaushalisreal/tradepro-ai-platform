
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, X, Send, Brain, TrendingUp } from 'lucide-react';

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      message: "Hello! I'm your AI trading assistant. I can help you with market analysis, trading strategies, and portfolio optimization. What would you like to know?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickActions = [
    "Analyze my portfolio risk",
    "What's the market sentiment today?",
    "Show me trending stocks",
    "Explain technical indicators"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      type: 'user',
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        message: generateAIResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputMessage('');
  };

  const generateAIResponse = (userMessage: string) => {
    const responses = [
      "Based on current market conditions, I recommend a diversified approach with 60% stocks, 30% bonds, and 10% alternative investments.",
      "The market sentiment is currently bullish with a 72% confidence score. Tech stocks are showing strong momentum.",
      "I've identified several high-potential opportunities in the renewable energy sector. Would you like me to provide detailed analysis?",
      "Your portfolio's risk-adjusted returns look solid. Consider rebalancing your tech exposure to reduce concentration risk."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
  };

  return (
    <>
      {/* Floating AI Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 shadow-2xl"
      >
        <Brain className="w-6 h-6 text-white" />
      </Button>

      {/* AI Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
          <Card className="w-full max-w-md h-96 bg-black/90 backdrop-blur-md border-white/10 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">AI Trading Assistant</h3>
                  <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 text-xs">
                    Online
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-lg p-3 ${
                      msg.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t border-white/10">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action)}
                    className="text-xs border-white/20 text-white/70 hover:text-white hover:bg-white/10"
                  >
                    {action}
                  </Button>
                ))}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about trading..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 text-sm focus:outline-none focus:border-blue-500"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};
