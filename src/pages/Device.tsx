import React from 'react';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Bluetooth,
  Battery,
  Activity,
  Cpu,
  RefreshCw,
  Wifi,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const deviceInfo = {
  name: 'BP Monitor Pro',
  model: 'BPM-2024',
  serialNumber: 'SN-123456789',
  firmware: 'v2.1.3',
  battery: 78,
  lastSync: new Date(Date.now() - 3600000),
  isConnected: true,
  ppgStatus: 'active' as const,
  imuStatus: 'active' as const,
  signalStrength: 85,
};

const statusColors = {
  active: 'text-success bg-success/10',
  inactive: 'text-muted-foreground bg-muted',
  error: 'text-destructive bg-destructive/10',
};

export const Device: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="fade-in">
          <h1 className="text-2xl font-bold text-foreground">Device Management</h1>
          <p className="text-muted-foreground">Monitor and configure your BP device</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card variant="glass" className="fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bluetooth className={cn("w-5 h-5", deviceInfo.isConnected ? "text-primary" : "text-muted-foreground")} />
                  Device Status
                </CardTitle>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  deviceInfo.isConnected ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                )}>
                  {deviceInfo.isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{deviceInfo.name}</p>
                  <p className="text-sm text-muted-foreground">Model: {deviceInfo.model}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Battery className={cn(
                      "w-5 h-5",
                      deviceInfo.battery > 50 ? "text-success" : deviceInfo.battery > 20 ? "text-warning" : "text-destructive"
                    )} />
                    <span className="text-sm text-foreground">Battery Level</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{deviceInfo.battery}%</span>
                </div>
                <Progress value={deviceInfo.battery} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">Signal Strength</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{deviceInfo.signalStrength}%</span>
                </div>
                <Progress value={deviceInfo.signalStrength} className="h-2" />
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Last synced: {deviceInfo.lastSync.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass" className="fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle>Sensor Status</CardTitle>
              <CardDescription>Real-time sensor monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">PPG Sensor</p>
                    <p className="text-xs text-muted-foreground">Photoplethysmography</p>
                  </div>
                </div>
                <span className={cn("px-3 py-1 rounded-full text-xs font-medium", statusColors[deviceInfo.ppgStatus])}>
                  {deviceInfo.ppgStatus.charAt(0).toUpperCase() + deviceInfo.ppgStatus.slice(1)}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-accent" />
                  <div>
                    <p className="font-medium text-foreground">IMU Sensor</p>
                    <p className="text-xs text-muted-foreground">Motion Detection</p>
                  </div>
                </div>
                <span className={cn("px-3 py-1 rounded-full text-xs font-medium", statusColors[deviceInfo.imuStatus])}>
                  {deviceInfo.imuStatus.charAt(0).toUpperCase() + deviceInfo.imuStatus.slice(1)}
                </span>
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Calibrate Sensors
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass" className="fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle>Device Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Serial Number</span>
                <span className="font-mono text-foreground">{deviceInfo.serialNumber}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Firmware Version</span>
                <span className="text-foreground">{deviceInfo.firmware}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Model</span>
                <span className="text-foreground">{deviceInfo.model}</span>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  Check for Updates
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass" className="fade-in" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <RefreshCw className="w-4 h-4 mr-3" />
                Sync Data Now
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-3" />
                Device Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bluetooth className="w-4 h-4 mr-3" />
                Reconnect Device
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="w-4 h-4 mr-3" />
                Troubleshooting Guide
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Device;
