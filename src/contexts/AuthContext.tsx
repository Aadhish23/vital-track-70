import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole, AuthState, LoginCredentials } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (role: UserRole, credentials?: LoginCredentials) => Promise<void>;
  loginWithGoogle: (role: UserRole) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo
const mockUsers: Record<UserRole, User> = {
  clinic: {
    id: 'clinic-1',
    email: 'clinic@example.com',
    role: 'clinic',
    name: 'City Health Clinic',
  },
  patient: {
    id: 'patient-1',
    email: 'john.doe@email.com',
    role: 'patient',
    name: 'John Doe',
  },
  family: {
    id: 'family-1',
    email: 'jane.doe@email.com',
    role: 'family',
    name: 'Jane Doe',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const login = useCallback(async (role: UserRole, credentials?: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, send to backend:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: credentials?.email, dob_raw: credentials?.dob_raw }),
      // });
      
      const user = mockUsers[role];
      if (credentials) {
        user.email = credentials.email;
      }
      
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Login failed. Please check your credentials.',
      }));
    }
  }, []);

  const loginWithGoogle = useCallback(async (role: UserRole) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user = mockUsers[role];
      
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Google login failed. Please try again.',
      }));
    }
  }, []);

  const logout = useCallback(() => {
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, loginWithGoogle, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
