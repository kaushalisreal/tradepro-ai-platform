import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bell, Mail, MessageSquare, Smartphone, History, Settings } from 'lucide-react';
import { VortexBackground } from '@/components/VortexBackground';

const Notifications = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [telegramNotifications, setTelegramNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const alertHistory = [
    {
      id: 1,
      type: 'Signal',
      asset: 'BTC/USD',
      message: 'Strong BUY signal detected - 89% confidence',
      time: '2 hours ago',
      status: 'Delivered'
    },
    {
      id: 2,
      type: 'Market Alert',
      asset: 'AAPL',
      message: 'Price crossed above $180 resistance',
      time: '4 hours ago',
      status: 'Delivered'
    },
    {
      id: 3,
      type: 'Signal',
      asset: 'EUR/USD',
      message: 'SELL signal triggered - RSI divergence',
      time: '6 hours ago',
      status: 'Delivered'
    },
    {
      id: 4,
      type: 'Portfolio',
      asset: 'Portfolio',
      message: 'Daily P&L update: +$234.56',
      time: '1 day ago',
      status: 'Delivered'
    }
  ];

  const getTypeColor = (type) => {
    const colors = {
      'Signal': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Market Alert': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Portfolio': 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return colors[type] || colors['Signal'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Vortex animated background */}
      <VortexBackground />

      <div className="relative z-10">
        <Header />
        <div className="pt-20 px-4">
          <div className="container mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
              <p className="text-white/70">
                Manage your alert preferences and view notification history
              </p>
            </div>

            <Tabs defaultValue="settings" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
                <TabsTrigger value="settings" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="history" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10">
                  <History className="w-4 h-4 mr-2" />
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="settings" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Notification Methods */}
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        Notification Methods
                      </CardTitle>
                      <CardDescription className="text-white/70">
                        Choose how you want to receive alerts
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-white/70" />
                          <div>
                            <p className="text-white font-medium">Email</p>
                            <p className="text-sm text-white/50">Get alerts via email</p>
                          </div>
                        </div>
                        <Switch
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <MessageSquare className="w-5 h-5 text-white/70" />
                          <div>
                            <p className="text-white font-medium">Telegram</p>
                            <p className="text-sm text-white/50">Instant messaging alerts</p>
                          </div>
                        </div>
                        <Switch
                          checked={telegramNotifications}
                          onCheckedChange={setTelegramNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Smartphone className="w-5 h-5 text-white/70" />
                          <div>
                            <p className="text-white font-medium">SMS</p>
                            <p className="text-sm text-white/50">Text message alerts</p>
                          </div>
                        </div>
                        <Switch
                          checked={smsNotifications}
                          onCheckedChange={setSmsNotifications}
                        />
                      </div>

                      {telegramNotifications && (
                        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <p className="text-sm text-blue-300 mb-2">Connect your Telegram account:</p>
                          <Button size="sm" variant="outline" className="text-blue-300 border-blue-500/30">
                            Connect Telegram
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Alert Types */}
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Alert Types</CardTitle>
                      <CardDescription className="text-white/70">
                        Select which types of alerts you want to receive
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white">Trading Signals</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">Market Alerts</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">Portfolio Updates</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">Price Movements</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">AI Insights</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">System Updates</span>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Alert Frequency</CardTitle>
                    <CardDescription className="text-white/70">
                      Control how often you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-medium text-white mb-2">Real-time</h4>
                        <p className="text-sm text-white/70">Instant notifications</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-medium text-white mb-2">Hourly</h4>
                        <p className="text-sm text-white/70">Batched every hour</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-medium text-white mb-2">Daily</h4>
                        <p className="text-sm text-white/70">Daily summary</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <History className="w-5 h-5" />
                      Alert History
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      View your recent notifications and their delivery status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/10">
                            <TableHead className="text-white/70">Type</TableHead>
                            <TableHead className="text-white/70">Asset</TableHead>
                            <TableHead className="text-white/70">Message</TableHead>
                            <TableHead className="text-white/70">Time</TableHead>
                            <TableHead className="text-white/70">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {alertHistory.map((alert) => (
                            <TableRow key={alert.id} className="border-white/10">
                              <TableCell>
                                <Badge className={getTypeColor(alert.type)}>
                                  {alert.type}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-white font-medium">
                                {alert.asset}
                              </TableCell>
                              <TableCell className="text-white/70">
                                {alert.message}
                              </TableCell>
                              <TableCell className="text-white/70">
                                {alert.time}
                              </TableCell>
                              <TableCell>
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                  {alert.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
