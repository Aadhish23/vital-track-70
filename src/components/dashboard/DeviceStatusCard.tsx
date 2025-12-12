import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, Bluetooth, Activity, Cpu, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DeviceStatus } from '@/types/auth';
import { Button } from '@/components/ui/button';

interface DeviceStatusCardProps {
  status: DeviceStatus;
  onSync?: () => void;
}

export const DeviceStatusCard: React.FC<DeviceStatusCardProps> = ({ status, onSync }) => {
  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-success';
    if (level > 20) return 'text-warning';
    return 'text-destructive';
  };

  const getStatusColor = (s: 'active' | 'inactive' | 'error') => {
    switch (s) {
      case 'active': return 'text-success bg-success/10';
      case 'inactive': return 'text-muted-foreground bg-muted';
      case 'error': return 'text-destructive bg-destructive/10';
    }
  };

  return (
    <Card variant="glassHover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bluetooth className={cn("w-5 h-5", status.isConnected ? "text-primary" : "text-muted-foreground")} />
            Device Status
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onSync}>
            <RefreshCw className="w-4 h-4 mr-1" />
            Sync
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Battery className={cn("w-5 h-5", getBatteryColor(status.battery))} />
            <span className="text-sm">Battery</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all", 
                  status.battery > 50 ? "bg-success" : status.battery > 20 ? "bg-warning" : "bg-destructive"
                )}
                style={{ width: `${status.battery}%` }}
              />
            </div>
            <span className="text-sm font-medium">{status.battery}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <span className="text-sm">PPG Sensor</span>
          </div>
          <span className={cn("px-2 py-1 rounded text-xs font-medium", getStatusColor(status.ppgStatus))}>
            {status.ppgStatus.charAt(0).toUpperCase() + status.ppgStatus.slice(1)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-accent" />
            <span className="text-sm">IMU Sensor</span>
          </div>
          <span className={cn("px-2 py-1 rounded text-xs font-medium", getStatusColor(status.imuStatus))}>
            {status.imuStatus.charAt(0).toUpperCase() + status.imuStatus.slice(1)}
          </span>
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Last sync: {new Date(status.lastSync).toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
