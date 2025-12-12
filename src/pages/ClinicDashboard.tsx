import React, { useState } from 'react';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PatientTable } from '@/components/clinic/PatientTable';
import { AlertCard } from '@/components/shared/AlertCard';
import { Search, Users, AlertTriangle, Activity, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Patient, Alert } from '@/types/auth';

// Mock data
const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    dob: '15031985',
    latestBP: { id: '1', timestamp: new Date(), systolic: 128, diastolic: 82, heartRate: 72, status: 'elevated' },
    alerts: 2,
    deviceStatus: { battery: 78, lastSync: new Date(), ppgStatus: 'active', imuStatus: 'active', isConnected: true },
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    dob: '22071990',
    latestBP: { id: '2', timestamp: new Date(), systolic: 118, diastolic: 76, heartRate: 68, status: 'normal' },
    alerts: 0,
    deviceStatus: { battery: 92, lastSync: new Date(), ppgStatus: 'active', imuStatus: 'active', isConnected: true },
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.j@email.com',
    dob: '08121978',
    latestBP: { id: '3', timestamp: new Date(), systolic: 145, diastolic: 95, heartRate: 85, status: 'high' },
    alerts: 3,
    deviceStatus: { battery: 45, lastSync: new Date(Date.now() - 7200000), ppgStatus: 'active', imuStatus: 'inactive', isConnected: false },
  },
  {
    id: '4',
    name: 'Emily Wilson',
    email: 'emily.w@email.com',
    dob: '30091995',
    latestBP: { id: '4', timestamp: new Date(), systolic: 165, diastolic: 105, heartRate: 92, status: 'critical' },
    alerts: 5,
    deviceStatus: { battery: 65, lastSync: new Date(), ppgStatus: 'active', imuStatus: 'active', isConnected: true },
  },
];

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    message: 'Emily Wilson has critically high BP readings - immediate attention required.',
    timestamp: new Date(Date.now() - 1800000),
    isRead: false,
  },
  {
    id: '2',
    type: 'warning',
    message: "Robert Johnson's device hasn't synced in 2 hours.",
    timestamp: new Date(Date.now() - 3600000),
    isRead: false,
  },
  {
    id: '3',
    type: 'warning',
    message: 'John Doe has shown elevated readings for 3 consecutive days.',
    timestamp: new Date(Date.now() - 7200000),
    isRead: false,
  },
];

export const ClinicDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: mockPatients.length,
    critical: mockPatients.filter((p) => p.latestBP?.status === 'critical').length,
    elevated: mockPatients.filter((p) => p.latestBP?.status === 'elevated' || p.latestBP?.status === 'high').length,
    normal: mockPatients.filter((p) => p.latestBP?.status === 'normal').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 fade-in">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Clinic Dashboard</h1>
            <p className="text-muted-foreground">Manage and monitor your patients</p>
          </div>
          <Button onClick={() => navigate('/clinic/add-patient')} className="w-fit">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Patient
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 fade-in" style={{ animationDelay: '0.1s' }}>
          <Card variant="glass">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total Patients</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-destructive">{stats.critical}</p>
                  <p className="text-xs text-muted-foreground">Critical</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-warning">{stats.elevated}</p>
                  <p className="text-xs text-muted-foreground">Elevated</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">{stats.normal}</p>
                  <p className="text-xs text-muted-foreground">Normal</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-4 fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <PatientTable patients={filteredPatients} />
          </div>

          <div className="space-y-4 fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-lg font-semibold text-foreground">Recent Alerts</h2>
            <div className="space-y-3">
              {mockAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onDismiss={(id) => console.log('Dismissing:', id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClinicDashboard;
