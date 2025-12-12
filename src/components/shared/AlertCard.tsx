import React from 'react';
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Alert } from '@/types/auth';

interface AlertCardProps {
  alert: Alert;
  onDismiss?: (id: string) => void;
}

const alertConfig = {
  warning: {
    icon: AlertTriangle,
    borderColor: 'border-l-warning',
    iconColor: 'text-warning',
    bgColor: 'bg-warning/5',
  },
  critical: {
    icon: AlertCircle,
    borderColor: 'border-l-destructive',
    iconColor: 'text-destructive',
    bgColor: 'bg-destructive/5',
  },
  info: {
    icon: Info,
    borderColor: 'border-l-primary',
    iconColor: 'text-primary',
    bgColor: 'bg-primary/5',
  },
};

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onDismiss }) => {
  const config = alertConfig[alert.type];
  const Icon = config.icon;

  return (
    <Card
      variant="status"
      className={cn(
        "p-4 flex items-start gap-3 transition-all duration-300",
        config.borderColor,
        config.bgColor
      )}
    >
      <div className={cn("mt-0.5", config.iconColor)}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">{alert.message}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date(alert.timestamp).toLocaleString()}
        </p>
      </div>
      {onDismiss && (
        <button
          onClick={() => onDismiss(alert.id)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </Card>
  );
};
