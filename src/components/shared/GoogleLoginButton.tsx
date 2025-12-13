import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoogleLoginButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  role?: 'clinic' | 'patient' | 'family';
}

const roleRing = {
  clinic: 'hover:ring-blue-400',
  patient: 'hover:ring-cyan-400',
  family: 'hover:ring-emerald-400',
};

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onClick,
  isLoading = false,
  disabled = false,
  role = 'patient',
}) => {
  return (
    <Button
      type="button"
      size="lg"
      onClick={onClick}
      disabled={isLoading || disabled}
      className={cn(
        'w-full bg-white text-gray-800 border border-gray-300',
        'hover:bg-gray-50 ring-1 ring-transparent transition-all',
        'font-medium shadow-sm',
        roleRing[role]
      )}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
      ) : (
        <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.69 1.23 9.19 3.26l6.85-6.85C35.9 1.86 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.41 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.5 24c0-1.64-.15-3.21-.43-4.73H24v9.01h12.7c-.55 2.96-2.18 5.47-4.63 7.18l7.12 5.53C43.73 36.71 46.5 30.9 46.5 24z"/>
          <path fill="#FBBC05" d="M10.54 28.41c-.48-1.45-.76-2.99-.76-4.41s.27-2.96.76-4.41l-7.98-6.19C.92 16.07 0 19.94 0 24s.92 7.93 2.56 11.6l7.98-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.14 15.91-5.82l-7.12-5.53c-1.97 1.32-4.5 2.1-8.79 2.1-6.26 0-11.57-3.91-13.46-9.31l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
      )}

      {isLoading ? 'Signing in…' : 'Sign in with Google'}
    </Button>
  );
};
