export type UserRole = 'clinic' | 'patient' | 'family';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  dob_raw: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface BPReading {
  id: string;
  timestamp: Date;
  systolic: number;
  diastolic: number;
  heartRate: number;
  status: 'normal' | 'elevated' | 'high' | 'critical';
}

export interface DeviceStatus {
  battery: number;
  lastSync: Date;
  ppgStatus: 'active' | 'inactive' | 'error';
  imuStatus: 'active' | 'inactive' | 'error';
  isConnected: boolean;
}

export interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  dob: string;
  latestBP?: BPReading;
  alerts: number;
  deviceStatus: DeviceStatus;
}
