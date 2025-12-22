import React from 'react';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { BPReadingCard } from '@/components/dashboard/BPReadingCard';
import { HeartRateCard } from '@/components/dashboard/HeartRateCard';
import { DeviceStatusCard } from '@/components/dashboard/DeviceStatusCard';
import { BPTrendChart } from '@/components/dashboard/BPTrendChart';
import { AlertCard } from '@/components/shared/AlertCard';
import { useAuth } from '@/contexts/AuthContext';
import { BPReading, DeviceStatus, Alert } from '@/types/auth';

// Mock data
const currentReading: BPReading = {
  id: '1',
  timestamp: new Date(),
  systolic: 128,
  diastolic: 82,
  heartRate: 72,
  status: 'elevated',
};

const previousReading: BPReading = {
  id: '2',
  timestamp: new Date(Date.now() - 86400000),
  systolic: 135,
  diastolic: 88,
  heartRate: 78,
  status: 'high',
};

const deviceStatus: DeviceStatus = {
  battery: 78,
  lastSync: new Date(Date.now() - 3600000),
  ppgStatus: 'active',
  imuStatus: 'active',
  isConnected: true,
};

const alerts: Alert[] = [
  {
    id: '1',
    type: 'warning',
    message: 'Your blood pressure has been slightly elevated for the past 3 readings.',
    timestamp: new Date(Date.now() - 7200000),
    isRead: false,
  },
  {
    id: '2',
    type: 'info',
    message: 'Remember to take your medication at 8:00 PM.',
    timestamp: new Date(Date.now() - 14400000),
    isRead: false,
  },
];

const trendData = [
  { date: 'Mon', systolic: 122, diastolic: 78 },
  { date: 'Tue', systolic: 128, diastolic: 82 },
  { date: 'Wed', systolic: 135, diastolic: 88 },
  { date: 'Thu', systolic: 130, diastolic: 84 },
  { date: 'Fri', systolic: 125, diastolic: 80 },
  { date: 'Sat', systolic: 128, diastolic: 82 },
  { date: 'Sun', systolic: 126, diastolic: 81 },
];

export const PatientDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-4 lg:space-y-6">
        {/* Header - larger touch-friendly text on mobile */}
        <div className="fade-in">
          <h1 className="text-xl lg:text-2xl font-bold text-foreground">
            Welcome back, {user?.name?.split(' ')[0] || 'Patient'}
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground mt-1">
            Here's your health summary for today
          </p>
        </div>

        {/* Key Metrics Grid - BP Reading is primary, shown first on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* Primary: BP Reading - always visible above the fold */}
          <div className="fade-in md:col-span-2 xl:col-span-1" style={{ animationDelay: '0.1s' }}>
            <BPReadingCard reading={currentReading} previousReading={previousReading} />
          </div>
          
          {/* Secondary metrics - stacked on mobile */}
          <div className="fade-in" style={{ animationDelay: '0.2s' }}>
            <HeartRateCard heartRate={currentReading.heartRate} status="normal" />
          </div>
          
          <div className="fade-in" style={{ animationDelay: '0.3s' }}>
            <DeviceStatusCard status={deviceStatus} onSync={() => console.log('Syncing...')} />
          </div>
        </div>

        {/* Trend Chart - reduced height on mobile */}
        <div className="fade-in" style={{ animationDelay: '0.4s' }}>
          <BPTrendChart data={trendData} title="Weekly BP Trends" />
        </div>

        {/* Alerts Section */}
        <div className="fade-in" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-base lg:text-lg font-semibold text-foreground mb-3 lg:mb-4">
            Recent Alerts
          </h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onDismiss={(id) => console.log('Dismissing alert:', id)}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
