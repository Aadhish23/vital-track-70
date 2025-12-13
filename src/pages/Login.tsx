import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Mail, Calendar, Loader2, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RoleSelector } from '@/components/shared/RoleSelector';
import { GoogleLoginButton } from '@/components/shared/GoogleLoginButton';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    login,
    loginWithGoogle,
    isLoading,
    error,
    isAuthenticated,
    user,
    clearError,
  } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'clinic' ? '/clinic' : '/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    clearError();
    setValidationError(null);
  }, [selectedRole, clearError]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateDOB = (dob: string) =>
    /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])\d{4}$/.test(dob);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!validateEmail(email)) {
      setValidationError('Please enter a valid email address');
      return;
    }

    if (!validateDOB(dob)) {
      setValidationError('Please enter DOB in ddmmyyyy format');
      return;
    }

    await login(selectedRole, { email, dob_raw: dob });
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle(selectedRole);
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-background pt-10 px-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-4">
            <Activity className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">BP Monitor</h1>
          <p className="text-muted-foreground">
            Blood Pressure Monitoring System
          </p>
        </div>

        {/* Card */}
        <Card variant="glass" className="w-full mx-auto">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <CardDescription>Select your role</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <RoleSelector
              selectedRole={selectedRole}
              onRoleChange={setSelectedRole}
            />

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Sign in with
                </span>
              </div>
            </div>

            {/* ================= ROLE CONTENT ================= */}
            {selectedRole === 'clinic' ? (
              /* 🔹 Compact clinic layout */
              <div className="flex justify-center py-4">
                <GoogleLoginButton
                  onClick={handleGoogleLogin}
                  isLoading={isLoading}
                />
              </div>
            ) : (
              <>
                {/* Email + DOB Form */}
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="text"
                        value={dob}
                        onChange={(e) =>
                          setDob(
                            e.target.value.replace(/\D/g, '').slice(0, 8)
                          )
                        }
                        className="pl-10"
                        placeholder="ddmmyyyy"
                        maxLength={8}
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Example: 15031990
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Signing in…
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>

                {/* OR */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-card px-4 text-muted-foreground">
                      OR
                    </span>
                  </div>
                </div>

                {/* Google */}
                <Button
                  variant="outline"
                  className="w-full py-6"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  Continue with Google
                </Button>
              </>
            )}

            {(error || validationError) && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <p className="text-sm text-destructive">
                  {validationError || error}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Protected by industry-standard encryption. Your health data is secure.
        </p>
      </div>
    </div>
  );
};

export default Login;
