import React from 'react';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BPTrendChart } from '@/components/dashboard/BPTrendChart';
import { Calendar, Download, Filter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const historyData = [
  { id: 1, date: '2024-12-12 08:30', systolic: 128, diastolic: 82, heartRate: 72, status: 'elevated' },
  { id: 2, date: '2024-12-11 09:15', systolic: 122, diastolic: 78, heartRate: 68, status: 'normal' },
  { id: 3, date: '2024-12-10 08:45', systolic: 135, diastolic: 88, heartRate: 78, status: 'high' },
  { id: 4, date: '2024-12-09 09:00', systolic: 118, diastolic: 76, heartRate: 65, status: 'normal' },
  { id: 5, date: '2024-12-08 08:30', systolic: 125, diastolic: 80, heartRate: 70, status: 'normal' },
  { id: 6, date: '2024-12-07 09:30', systolic: 130, diastolic: 85, heartRate: 75, status: 'elevated' },
  { id: 7, date: '2024-12-06 08:15', systolic: 142, diastolic: 92, heartRate: 82, status: 'high' },
];

const trendData = historyData.map((h) => ({
  date: new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  systolic: h.systolic,
  diastolic: h.diastolic,
})).reverse();

const statusColors = {
  normal: 'text-success',
  elevated: 'text-warning',
  high: 'text-warning',
  critical: 'text-destructive',
};

export const History: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 fade-in">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reading History</h1>
            <p className="text-muted-foreground">View all your blood pressure readings</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="fade-in" style={{ animationDelay: '0.1s' }}>
          <BPTrendChart data={trendData} title="Blood Pressure Trends" />
        </div>

        <Card variant="glass" className="fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle>All Readings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Date & Time</TableHead>
                  <TableHead className="text-muted-foreground">Systolic</TableHead>
                  <TableHead className="text-muted-foreground">Diastolic</TableHead>
                  <TableHead className="text-muted-foreground">Heart Rate</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyData.map((reading) => (
                  <TableRow key={reading.id} className="border-border hover:bg-secondary/30">
                    <TableCell className="text-foreground">
                      {new Date(reading.date).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-mono text-foreground">{reading.systolic}</TableCell>
                    <TableCell className="font-mono text-foreground">{reading.diastolic}</TableCell>
                    <TableCell className="text-foreground">{reading.heartRate} BPM</TableCell>
                    <TableCell>
                      <span className={cn('capitalize', statusColors[reading.status as keyof typeof statusColors])}>
                        {reading.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default History;
