import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { Patient } from '@/types/auth';
import { cn } from '@/lib/utils';

interface PatientTableProps {
  patients: Patient[];
}

const statusConfig = {
  normal: { icon: CheckCircle, color: 'text-success', label: 'Normal' },
  elevated: { icon: AlertTriangle, color: 'text-warning', label: 'Elevated' },
  high: { icon: AlertTriangle, color: 'text-warning', label: 'High' },
  critical: { icon: AlertCircle, color: 'text-destructive', label: 'Critical' },
};

export const PatientTable: React.FC<PatientTableProps> = ({ patients }) => {
  const navigate = useNavigate();

  return (
    <div className="glass-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Patient</TableHead>
            <TableHead className="text-muted-foreground">Latest BP</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Alerts</TableHead>
            <TableHead className="text-muted-foreground">Device</TableHead>
            <TableHead className="text-muted-foreground text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => {
            const status = patient.latestBP?.status || 'normal';
            const StatusIcon = statusConfig[status].icon;
            
            return (
              <TableRow
                key={patient.id}
                className="border-border hover:bg-secondary/30 cursor-pointer transition-colors"
                onClick={() => navigate(`/clinic/patient/${patient.id}`)}
              >
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {patient.latestBP ? (
                    <span className="font-mono text-foreground">
                      {patient.latestBP.systolic}/{patient.latestBP.diastolic}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className={cn("flex items-center gap-2", statusConfig[status].color)}>
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-sm">{statusConfig[status].label}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {patient.alerts > 0 ? (
                    <Badge variant="destructive" className="text-xs">
                      {patient.alerts} alerts
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">None</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        patient.deviceStatus.isConnected ? "bg-success" : "bg-muted-foreground"
                      )}
                    />
                    <span className="text-sm text-muted-foreground">
                      {patient.deviceStatus.battery}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/clinic/patient/${patient.id}`);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
