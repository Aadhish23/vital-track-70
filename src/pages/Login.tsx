import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Mail, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RoleSelector } from '@/components/shared/RoleSelector';
import { GoogleLoginButton } from '@/components/shared/GoogleLoginButton';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle, isLoading, error, isAuthenticated, user, clearError } = useAuth();
  
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'clinic') {
        navigate('/clinic');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    clearError();
    setValidationError(null);
  }, [selectedRole, clearError]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateDOB = (dob: string): boolean => {
    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])\d{4}$/;
    return dobRegex.test(dob);
  };

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

  const showEmailLogin = selectedRole !== 'clinic';

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-4 pulse-glow">
            <Activity className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">BP Monitor</h1>
          <p className="text-muted-foreground">Blood Pressure Monitoring System</p>
        </div>

        <Card variant="glass" className="fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <CardDescription>Select your role</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <RoleSelector selectedRole={selectedRole} onRoleChange={setSelectedRole} />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Sign in with</span>
              </div>
            </div>

            {selectedRole === 'clinic' ? (
              <GoogleLoginButton onClick={handleGoogleLogin} isLoading={isLoading} />
            ) : (
              <>
                {/* Email + DOB Form */}
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob" className="text-foreground">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="dob"
                        type="text"
                        placeholder="ddmmyyyy (e.g., 15031990)"
                        value={dob}
                        onChange={(e) => setDob(e.target.value.replace(/\D/g, '').slice(0, 8))}
                        className="pl-10"
                        maxLength={8}
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Format: day month year (e.g., 15031990)</p>
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
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>

                {/* OR Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-card px-4 text-muted-foreground font-medium">OR</span>
                  </div>
                </div>

                {/* Google Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-white text-gray-900 hover:bg-gray-100 border-gray-300 rounded-lg py-6 text-base font-medium"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </>
            )}

            {(error || validationError) && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive">{validationError || error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6 fade-in" style={{ animationDelay: '0.2s' }}>
          Protected by industry-standard encryption. Your health data is secure.
        </p>
      </div>
    </div>
  );
};

export default Login;
