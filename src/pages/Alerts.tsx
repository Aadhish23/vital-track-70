import React, { useState } from 'react';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCard } from '@/components/shared/AlertCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, CheckCheck, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { Alert } from '@/types/auth';

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    message: 'Blood pressure reading of 165/105 detected. Please consult your healthcare provider immediately.',
    timestamp: new Date(Date.now() - 1800000),
    isRead: false,
  },
  {
    id: '2',
    type: 'warning',
    message: 'Your blood pressure has been elevated for 3 consecutive readings.',
    timestamp: new Date(Date.now() - 7200000),
    isRead: false,
  },
  {
    id: '3',
    type: 'warning',
    message: 'Device battery is below 20%. Please charge your monitor.',
    timestamp: new Date(Date.now() - 14400000),
    isRead: false,
  },
  {
    id: '4',
    type: 'info',
    message: 'Your weekly health report is ready to view.',
    timestamp: new Date(Date.now() - 86400000),
    isRead: true,
  },
  {
    id: '5',
    type: 'info',
    message: 'Remember to take your evening medication.',
    timestamp: new Date(Date.now() - 172800000),
    isRead: true,
  },
];

export const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState(mockAlerts);

  const handleDismiss = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const handleMarkAllRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, isRead: true })));
  };

  const unreadAlerts = alerts.filter((a) => !a.isRead);
  const criticalAlerts = alerts.filter((a) => a.type === 'critical');
  const warningAlerts = alerts.filter((a) => a.type === 'warning');
  const infoAlerts = alerts.filter((a) => a.type === 'info');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 fade-in">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Alerts</h1>
            <p className="text-muted-foreground">
              {unreadAlerts.length} unread alert{unreadAlerts.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button variant="outline" onClick={handleMarkAllRead} disabled={unreadAlerts.length === 0}>
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark All as Read
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 fade-in" style={{ animationDelay: '0.1s' }}>
          <Card variant="glass" className="border-l-4 border-l-destructive">
            <CardContent className="p-4 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold text-foreground">{criticalAlerts.length}</p>
                <p className="text-sm text-muted-foreground">Critical</p>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass" className="border-l-4 border-l-warning">
            <CardContent className="p-4 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-foreground">{warningAlerts.length}</p>
                <p className="text-sm text-muted-foreground">Warnings</p>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass" className="border-l-4 border-l-primary">
            <CardContent className="p-4 flex items-center gap-3">
              <Info className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{infoAlerts.length}</p>
                <p className="text-sm text-muted-foreground">Info</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card variant="glass" className="fade-in" style={{ animationDelay: '0.2s' }}>
          <Tabs defaultValue="all">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Alert Center
                </CardTitle>
                <TabsList className="bg-secondary">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="critical">Critical</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <TabsContent value="all" className="space-y-3 mt-0">
                {alerts.length > 0 ? (
                  alerts.map((alert) => (
                    <AlertCard key={alert.id} alert={alert} onDismiss={handleDismiss} />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No alerts</p>
                )}
              </TabsContent>
              <TabsContent value="unread" className="space-y-3 mt-0">
                {unreadAlerts.length > 0 ? (
                  unreadAlerts.map((alert) => (
                    <AlertCard key={alert.id} alert={alert} onDismiss={handleDismiss} />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No unread alerts</p>
                )}
              </TabsContent>
              <TabsContent value="critical" className="space-y-3 mt-0">
                {criticalAlerts.length > 0 ? (
                  criticalAlerts.map((alert) => (
                    <AlertCard key={alert.id} alert={alert} onDismiss={handleDismiss} />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No critical alerts</p>
                )}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
