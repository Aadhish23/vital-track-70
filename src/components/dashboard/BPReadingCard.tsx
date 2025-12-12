import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';
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
    <Card variant="glassHover" className={cn("relative overflow-hidden", config.border, "border-l-4")}>
      <div className={cn("absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20", config.bg)} />
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className={cn("w-5 h-5", config.color)} />
            Blood Pressure
          </CardTitle>
          <span className={cn("px-3 py-1 rounded-full text-xs font-medium", config.bg, config.color)}>
            {config.label}
          </span>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-end gap-2">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold text-foreground">{reading.systolic}</span>
            <span className="text-2xl text-muted-foreground">/</span>
            <span className="text-3xl font-semibold text-foreground">{reading.diastolic}</span>
          </div>
          <span className="text-sm text-muted-foreground mb-2">mmHg</span>
        </div>

        {previousReading && (
          <div className="flex gap-4 mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-1 text-sm">
              {systolicDiff > 0 ? (
                <TrendingUp className="w-4 h-4 text-destructive" />
              ) : (
                <TrendingDown className="w-4 h-4 text-success" />
              )}
              <span className={systolicDiff > 0 ? 'text-destructive' : 'text-success'}>
                {systolicDiff > 0 ? '+' : ''}{systolicDiff} sys
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              {diastolicDiff > 0 ? (
                <TrendingUp className="w-4 h-4 text-destructive" />
              ) : (
                <TrendingDown className="w-4 h-4 text-success" />
              )}
              <span className={diastolicDiff > 0 ? 'text-destructive' : 'text-success'}>
                {diastolicDiff > 0 ? '+' : ''}{diastolicDiff} dia
              </span>
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-3">
          Last reading: {new Date(reading.timestamp).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
};
