import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import PatientDashboard from "./pages/PatientDashboard";
import ClinicDashboard from "./pages/ClinicDashboard";
import PatientDetails from "./pages/PatientDetails";
import AddPatient from "./pages/AddPatient";
import Settings from "./pages/Settings";
import History from "./pages/History";
import Alerts from "./pages/Alerts";
import Device from "./pages/Device";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      
      {/* Patient/Family Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['patient', 'family']}>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute allowedRoles={['patient', 'family']}>
            <History />
          </ProtectedRoute>
        }
      />
      <Route
        path="/device"
        element={
          <ProtectedRoute allowedRoles={['patient', 'family']}>
            <Device />
          </ProtectedRoute>
        }
      />

      {/* Clinic Routes */}
      <Route
        path="/clinic"
        element={
          <ProtectedRoute allowedRoles={['clinic']}>
            <ClinicDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/clinic/patients"
        element={
          <ProtectedRoute allowedRoles={['clinic']}>
            <ClinicDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/clinic/patient/:id"
        element={
          <ProtectedRoute allowedRoles={['clinic']}>
            <PatientDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/clinic/add-patient"
        element={
          <ProtectedRoute allowedRoles={['clinic']}>
            <AddPatient />
          </ProtectedRoute>
        }
      />

      {/* Shared Routes */}
      <Route
        path="/alerts"
        element={
          <ProtectedRoute>
            <Alerts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
