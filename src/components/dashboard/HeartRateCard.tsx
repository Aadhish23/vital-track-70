import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeartRateCardProps {
  heartRate: number;
  status?: 'normal' | 'elevated' | 'low';
}

export const HeartRateCard: React.FC<HeartRateCardProps> = ({ heartRate, status = 'normal' }) => {
  const statusColors = {
    normal: 'text-success',
    elevated: 'text-warning',
    low: 'text-primary',
  };

  return (
    <Card variant="glassHover" className="transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/50 border border-red-400">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 group">
          <Heart className="w-5 h-5 text-destructive heartbeat group-hover:scale-110 transition-transform duration-300" />
          Heart Rate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2">
          <span className={cn("text-5xl font-bold", statusColors[status])}>{heartRate}</span>
          <span className="text-sm text-muted-foreground mb-2">BPM</span>
        </div>
        <div className="mt-4 flex gap-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-8 bg-primary/20 rounded-sm relative overflow-hidden"
            >
              <div
                className="absolute bottom-0 w-full bg-primary transition-all duration-300"
                style={{
                  height: `${Math.random() * 60 + 20}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">Live monitoring active</p>
      </CardContent>
    </Card>
  );
};
