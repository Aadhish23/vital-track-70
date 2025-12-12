import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BPReadingCard } from '@/components/dashboard/BPReadingCard';
import { HeartRateCard } from '@/components/dashboard/HeartRateCard';
import { DeviceStatusCard } from '@/components/dashboard/DeviceStatusCard';
import { BPTrendChart } from '@/components/dashboard/BPTrendChart';
import { AlertCard } from '@/components/shared/AlertCard';
import { ArrowLeft, User, Calendar, Mail, Phone } from 'lucide-react';
import { BPReading, DeviceStatus, Alert } from '@/types/auth';

// Mock patient data
const patientData = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  dob: '15/03/1985',
  joinDate: '01/01/2024',
  address: '123 Health St, Medical City, MC 12345',
};

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
    message: 'Blood pressure elevated for 3 consecutive readings.',
    timestamp: new Date(Date.now() - 7200000),
    isRead: false,
  },
  {
    id: '2',
    type: 'info',
    message: 'Device battery below 30% - charging recommended.',
    timestamp: new Date(Date.now() - 86400000),
    isRead: true,
  },
];

const trendData = [
  { date: 'Dec 1', systolic: 122, diastolic: 78 },
  { date: 'Dec 3', systolic: 128, diastolic: 82 },
  { date: 'Dec 5', systolic: 135, diastolic: 88 },
  { date: 'Dec 7', systolic: 130, diastolic: 84 },
  { date: 'Dec 9', systolic: 125, diastolic: 80 },
  { date: 'Dec 11', systolic: 128, diastolic: 82 },
  { date: 'Dec 12', systolic: 126, diastolic: 81 },
];

export const PatientDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4 fade-in">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Patient Details</h1>
            <p className="text-muted-foreground">Patient ID: {id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card variant="glass" className="fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Patient Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {patientData.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{patientData.name}</p>
                  <p className="text-sm text-muted-foreground">Active Patient</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{patientData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{patientData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">DOB: {patientData.dob}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">Member since {patientData.joinDate}</p>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="fade-in" style={{ animationDelay: '0.2s' }}>
              <BPReadingCard reading={currentReading} previousReading={previousReading} />
            </div>
            <div className="fade-in" style={{ animationDelay: '0.3s' }}>
              <HeartRateCard heartRate={currentReading.heartRate} status="normal" />
            </div>
          </div>
        </div>

        <div className="fade-in" style={{ animationDelay: '0.4s' }}>
          <BPTrendChart data={trendData} title="Blood Pressure History" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4 fade-in" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-lg font-semibold text-foreground">Alert History</h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>

          <div className="fade-in" style={{ animationDelay: '0.6s' }}>
            <DeviceStatusCard status={deviceStatus} onSync={() => console.log('Syncing...')} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDetails;
