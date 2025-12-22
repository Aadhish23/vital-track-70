import React from 'react';
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Alert } from '@/types/auth';

interface AlertCardProps {
  alert: Alert;
  onDismiss?: (id: string) => void;
  className?: string;
  showTimestamp?: boolean;
  animateIn?: boolean;
  compact?: boolean;
  interactive?: boolean;
  autoDismiss?: number;
  onAlertClick?: (alert: Alert) => void;
}

const alertConfig = {
  warning: {
    icon: AlertTriangle,
    borderColor: 'border-l-warning',
    iconColor: 'text-warning',
    bgColor: 'bg-warning/5',
    hoverBg: 'hover:bg-warning/10',
    glowColor: 'shadow-warning/20',
    accentColor: 'bg-warning',
  },
  critical: {
    icon: AlertCircle,
    borderColor: 'border-l-destructive',
    iconColor: 'text-destructive',
    bgColor: 'bg-destructive/5',
    hoverBg: 'hover:bg-destructive/10',
    glowColor: 'shadow-destructive/20',
    accentColor: 'bg-destructive',
  },
  info: {
    icon: Info,
    borderColor: 'border-l-primary',
    iconColor: 'text-primary',
    bgColor: 'bg-primary/5',
    hoverBg: 'hover:bg-primary/10',
    glowColor: 'shadow-primary/20',
    accentColor: 'bg-primary',
  },
};

export const AlertCard: React.FC<AlertCardProps> = ({ 
  alert, 
  onDismiss,
  className,
  showTimestamp = true,
  animateIn = true,
  compact = false,
  interactive = false,
  autoDismiss,
  onAlertClick,
}) => {
  const config = alertConfig[alert.type];
  const Icon = config.icon;
  const [isVisible, setIsVisible] = React.useState(false);
  const [isExiting, setIsExiting] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [progress, setProgress] = React.useState(100);
  const dismissTimerRef = React.useRef<NodeJS.Timeout>();
  const progressTimerRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (animateIn) {
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [animateIn]);

  React.useEffect(() => {
    if (autoDismiss && onDismiss && !isHovered) {
      const startTime = Date.now();
      const duration = autoDismiss;

      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);

        if (remaining > 0) {
          progressTimerRef.current = setTimeout(updateProgress, 50);
        }
      };

      updateProgress();

      dismissTimerRef.current = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => {
        if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
        if (progressTimerRef.current) clearTimeout(progressTimerRef.current);
      };
    }
  }, [autoDismiss, onDismiss, isHovered]);

  const handleDismiss = () => {
    if (onDismiss) {
      setIsExiting(true);
      setTimeout(() => {
        onDismiss(alert.id);
      }, 300);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
    }
    if (progressTimerRef.current) {
      clearTimeout(progressTimerRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    if (interactive && onAlertClick) {
      onAlertClick(alert);
    }
  };

  const formatTimestamp = (timestamp: string | Date) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const getPriorityIndicator = () => {
    if (alert.type === 'critical') {
      return (
        <span className="flex items-center gap-1 text-xs font-semibold text-destructive uppercase tracking-wide">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
          </span>
          Urgent
        </span>
      );
    }
    return null;
  };

  return (
    <Card
      variant="status"
      role="alert"
      aria-live={alert.type === 'critical' ? 'assertive' : 'polite'}
      aria-atomic="true"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden border-l-4 transition-all duration-300",
        compact ? "p-3" : "p-4",
        "flex items-start gap-3",
        config.borderColor,
        config.bgColor,
        config.hoverBg,
        animateIn && (isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"),
        isExiting && "opacity-0 translate-x-4 scale-95",
        interactive && "cursor-pointer hover:shadow-md active:scale-[0.99]",
        isHovered && "shadow-lg",
        alert.type === 'critical' && "shadow-sm",
        className
      )}
    >
      {/* Auto-dismiss progress bar */}
      {autoDismiss && (
        <div 
          className="absolute bottom-0 left-0 h-1 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        >
          <div className={cn("h-full", config.accentColor, "opacity-60")} />
        </div>
      )}

      {/* Icon with pulse animation for critical alerts */}
      <div 
        className={cn(
          "mt-0.5 transition-all duration-200 flex-shrink-0",
          config.iconColor,
          isHovered && "scale-110",
          alert.type === 'critical' && "animate-pulse"
        )}
        aria-hidden="true"
      >
        <div className="relative">
          {alert.type === 'critical' && (
            <span className={cn(
              "absolute inset-0 rounded-full blur-md opacity-50",
              config.accentColor
            )} />
          )}
          <Icon className={cn(
            "relative",
            compact ? "w-4 h-4" : "w-5 h-5"
          )} />
        </div>
      </div>
      
      <div className="flex-1 min-w-0 space-y-1">
        {/* Priority indicator for critical alerts */}
        {alert.type === 'critical' && !compact && getPriorityIndicator()}
        
        {/* Message */}
        <p className={cn(
          "text-foreground leading-relaxed break-words",
          compact ? "text-xs" : "text-sm font-medium",
          interactive && "group-hover:text-foreground/80"
        )}>
          {alert.message}
        </p>
        
        {/* Timestamp */}
        {showTimestamp && (
          <div className="flex items-center gap-2 flex-wrap">
            <p className={cn(
              "text-muted-foreground flex items-center gap-1",
              compact ? "text-[10px]" : "text-xs"
            )}>
              <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground/40" aria-hidden="true" />
              <time dateTime={new Date(alert.timestamp).toISOString()}>
                {formatTimestamp(alert.timestamp)}
              </time>
            </p>
          </div>
        )}
      </div>
      
      {/* Dismiss button */}
      {onDismiss && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          aria-label="Dismiss alert"
          className={cn(
            "flex-shrink-0 text-muted-foreground hover:text-foreground transition-all duration-200",
            "hover:bg-background/50 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50",
            compact ? "p-0.5 -mr-0.5 -mt-0.5" : "p-1 -mr-1 -mt-1",
            "hover:rotate-90 active:scale-90"
          )}
        >
          <X className={cn(compact ? "w-3.5 h-3.5" : "w-4 h-4")} />
        </button>
      )}

      {/* Decorative gradient overlay for interactive cards */}
      {interactive && isHovered && (
        <div 
          className={cn(
            "absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300",
            isHovered && "opacity-100",
            "bg-gradient-to-r from-transparent via-background/5 to-transparent"
          )}
        />
      )}
    </Card>
  );
};