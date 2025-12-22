import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, Bluetooth, Activity, Cpu, RefreshCw, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DeviceStatus } from '@/types/auth';
import { Button } from '@/components/ui/button';

interface DeviceStatusCardProps {
  status: DeviceStatus;
  onSync?: () => void;
}

export const DeviceStatusCard: React.FC<DeviceStatusCardProps> = ({ status, onSync }) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    await onSync?.();
    setTimeout(() => setIsSyncing(false), 1000);
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return '#10b981'; // emerald-500
    if (level > 20) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  const getTimeSinceSync = () => {
    const now = new Date();
    const lastSync = new Date(status.lastSync);
    const diffMs = now.getTime() - lastSync.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <Card className="bg-white border border-blue-400 rounded-lg shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 hover:border-blue-500/50 group">
      <CardHeader className="pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bluetooth className={cn(
                "w-6 h-6 transition-transform duration-300 group-hover:scale-110",
                status.isConnected ? "text-blue-500" : "text-gray-400"
              )} />
              {status.isConnected && (
                <Circle className="absolute -top-1 -right-1 w-3 h-3 text-blue-500 fill-blue-500 group-hover:animate-pulse" />
              )}
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-gray-900">Device Status</CardTitle>
              <p className="text-xs text-gray-500 mt-0.5">
                {status.isConnected ? 'Connected' : 'Disconnected'}
              </p>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSync}
            disabled={isSyncing}
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            <RefreshCw className={cn("w-4 h-4 mr-1", isSyncing && "animate-spin")} />
            Sync
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Battery Level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                <Battery className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">Battery Level</span>
            </div>
            <span className="text-sm font-bold" style={{ color: getBatteryColor(status.battery) }}>
              {status.battery}%
            </span>
          </div>
          
          <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${status.battery}%`,
                backgroundColor: getBatteryColor(status.battery)
              }}
            />
          </div>
        </div>

        {/* Sensor Status Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {/* PPG Sensor */}
          <div className="p-3 rounded-lg border border-gray-200 bg-white">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium text-gray-700">PPG Sensor</span>
            </div>
            <div className={cn(
              "inline-flex px-3 py-1.5 rounded-full text-xs font-medium",
              status.ppgStatus === 'active' && "bg-emerald-100 text-emerald-700",
              status.ppgStatus === 'inactive' && "bg-gray-100 text-gray-600",
              status.ppgStatus === 'error' && "bg-red-100 text-red-700"
            )}>
              {status.ppgStatus.charAt(0).toUpperCase() + status.ppgStatus.slice(1)}
            </div>
          </div>

          {/* IMU Sensor */}
          <div className="p-3 rounded-lg border border-gray-200 bg-white">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium text-gray-700">IMU Sensor</span>
            </div>
            <div className={cn(
              "inline-flex px-3 py-1.5 rounded-full text-xs font-medium",
              status.imuStatus === 'active' && "bg-emerald-100 text-emerald-700",
              status.imuStatus === 'inactive' && "bg-gray-100 text-gray-600",
              status.imuStatus === 'error' && "bg-red-100 text-red-700"
            )}>
              {status.imuStatus.charAt(0).toUpperCase() + status.imuStatus.slice(1)}
            </div>
          </div>
        </div>

        {/* Last Sync Info */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Circle className="w-2 h-2 text-blue-500 fill-blue-500" />
            <span className="text-xs text-gray-500 font-medium">Last sync</span>
          </div>
          <span className="text-xs font-semibold text-gray-900">
            {getTimeSinceSync()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};