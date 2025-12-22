import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BPReading } from '@/types/auth';

interface BPReadingCardProps {
  reading: BPReading;
  previousReading?: BPReading;
}

const statusConfig = {
  normal: { label: 'Normal', color: 'text-success', bg: 'bg-success/10', border: 'border-success/30' },
  elevated: { label: 'Elevated', color: 'text-bp-elevated', bg: 'bg-warning/10', border: 'border-warning/30' },
  high: { label: 'High', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
  critical: { label: 'Critical', color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30' },
};

export const BPReadingCard: React.FC<BPReadingCardProps> = ({ reading, previousReading }) => {
  const config = statusConfig[reading.status];
  
  const systolicDiff = previousReading ? reading.systolic - previousReading.systolic : 0;
  const diastolicDiff = previousReading ? reading.diastolic - previousReading.diastolic : 0;

  return (
    <Card 
      variant="glassHover" 
      className="relative overflow-hidden transition-all duration-300 hover:shadow-2xl group border border-yellow-400"
    >
      {/* Subtle animated background glow */}
      <div className={cn("absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-15 animate-pulse", config.bg)} />
      <div className={cn("absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl opacity-10", config.bg)} />
      
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-3">
            <div className={cn("p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3", config.bg)}>
              <Activity className={cn("w-5 h-5", config.color)} />
            </div>
            <span className="font-semibold text-foreground">Blood Pressure</span>
          </CardTitle>
          <span className={cn(
            "px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide",
            "transition-all duration-300 group-hover:scale-105 shadow-sm",
            config.bg, 
            config.color
          )}>
            {config.label}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        {/* Main reading display with enhanced typography */}
        <div className="flex items-end gap-3 mb-2">
          <div className="flex items-baseline gap-2">
            <span className="text-7xl font-bold text-foreground tracking-tight leading-none transition-all duration-300 group-hover:scale-105">
              {reading.systolic}
            </span>
            <span className="text-3xl text-muted-foreground/70 font-light">/</span>
            <span className="text-5xl font-semibold text-foreground tracking-tight transition-all duration-300 group-hover:scale-105">
              {reading.diastolic}
            </span>
          </div>
          <span className="text-sm text-muted-foreground mb-3 font-medium tracking-wide">mmHg</span>
        </div>

        {/* Heart rate if available */}
        {reading.heartRate && (
          <div className="flex items-center gap-2 mt-3 mb-4">
            <div className="relative">
              <Activity className="w-4 h-4 text-muted-foreground animate-pulse" />
              <div className="absolute inset-0 w-4 h-4 bg-current opacity-20 rounded-full animate-ping" />
            </div>
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground text-base">{reading.heartRate}</span> bpm
            </span>
          </div>
        )}

        {/* Trend indicators with enhanced design */}
        {previousReading && (
          <div className="flex gap-3 mt-5 pt-4 border-t border-border/50">
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105",
              systolicDiff > 0 
                ? 'bg-destructive/10 hover:bg-destructive/15 shadow-sm' 
                : systolicDiff < 0 
                ? 'bg-success/10 hover:bg-success/15 shadow-sm'
                : 'bg-muted/30'
            )}>
              {systolicDiff > 0 ? (
                <TrendingUp className="w-4 h-4 text-destructive" />
              ) : systolicDiff < 0 ? (
                <TrendingDown className="w-4 h-4 text-success" />
              ) : (
                <div className="w-4 h-0.5 bg-muted-foreground/50 rounded" />
              )}
              <span className={cn(
                "font-semibold",
                systolicDiff > 0 ? 'text-destructive' : systolicDiff < 0 ? 'text-success' : 'text-muted-foreground'
              )}>
                {systolicDiff > 0 ? '+' : ''}{systolicDiff}
              </span>
              <span className="text-xs text-muted-foreground font-normal">systolic</span>
            </div>
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105",
              diastolicDiff > 0 
                ? 'bg-destructive/10 hover:bg-destructive/15 shadow-sm' 
                : diastolicDiff < 0 
                ? 'bg-success/10 hover:bg-success/15 shadow-sm'
                : 'bg-muted/30'
            )}>
              {diastolicDiff > 0 ? (
                <TrendingUp className="w-4 h-4 text-destructive" />
              ) : diastolicDiff < 0 ? (
                <TrendingDown className="w-4 h-4 text-success" />
              ) : (
                <div className="w-4 h-0.5 bg-muted-foreground/50 rounded" />
              )}
              <span className={cn(
                "font-semibold",
                diastolicDiff > 0 ? 'text-destructive' : diastolicDiff < 0 ? 'text-success' : 'text-muted-foreground'
              )}>
                {diastolicDiff > 0 ? '+' : ''}{diastolicDiff}
              </span>
              <span className="text-xs text-muted-foreground font-normal">diastolic</span>
            </div>
          </div>
        )}

        {/* Timestamp with icon */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-border/30">
          <Clock className="w-3.5 h-3.5 text-muted-foreground/70" />
          <p className="text-xs text-muted-foreground font-medium">
            {new Date(reading.timestamp).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};