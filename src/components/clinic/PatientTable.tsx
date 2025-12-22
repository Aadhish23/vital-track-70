import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  ChevronRight,
  Activity,
  Wifi,
  WifiOff,
  Battery,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Patient } from "@/types/auth";

interface PatientTableProps {
  patients: Patient[];
}

const statusConfig = {
  normal: {
    icon: CheckCircle,
    label: "Normal",
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-200",
  },
  elevated: {
    icon: AlertTriangle,
    label: "Elevated",
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
  },
  high: {
    icon: AlertTriangle,
    label: "High",
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-200",
  },
  critical: {
    icon: AlertCircle,
    label: "Critical",
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
  },
};

export const PatientTable: React.FC<PatientTableProps> = ({ patients }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-3">
        {patients.map((patient) => {
          const status = patient.latestBP?.status || "normal";
          const StatusIcon = statusConfig[status].icon;

          return (
            <div
              key={patient.id}
              onClick={() => navigate(`/clinic/patient/${patient.id}`)}
              className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm active:bg-blue-50 transition-colors cursor-pointer"
            >
              {/* Header: Patient info + Status */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center font-bold text-blue-700 text-sm shadow-sm flex-shrink-0">
                    {patient.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">
                      {patient.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {patient.email}
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    "px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-semibold flex-shrink-0",
                    statusConfig[status].bg,
                    statusConfig[status].text
                  )}
                >
                  <StatusIcon className="h-3 w-3" />
                  {statusConfig[status].label}
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-4 flex-wrap">
                {/* BP Reading */}
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-sm font-mono font-semibold text-gray-900">
                    {patient.latestBP?.systolic}/{patient.latestBP?.diastolic}
                  </span>
                </div>

                {/* Alerts */}
                {patient.alerts > 0 ? (
                  <Badge 
                    className={cn(
                      "h-6 px-2 text-[10px] text-white font-semibold",
                      patient.alerts >= 3 
                        ? "bg-red-600 hover:bg-red-600" 
                        : patient.alerts === 2 
                        ? "bg-orange-600 hover:bg-orange-600" 
                        : "bg-blue-600 hover:bg-blue-600"
                    )}
                  >
                    {patient.alerts} alerts
                  </Badge>
                ) : (
                  <Badge className="h-6 px-2 text-[10px] bg-gray-100 text-gray-500 font-medium hover:bg-gray-100">
                    No alerts
                  </Badge>
                )}

                {/* Device Status */}
                <div className="flex items-center gap-1.5 ml-auto">
                  {patient.deviceStatus.isConnected ? (
                    <Wifi className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <WifiOff className="h-3.5 w-3.5 text-gray-400" />
                  )}
                  <Battery className="h-3.5 w-3.5 text-gray-500" />
                  <span className="text-xs font-medium text-gray-600">
                    {patient.deviceStatus.battery}%
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400 ml-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden lg:block rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-hidden rounded-xl">
          <Table>
            {/* ---------- HEADER ---------- */}
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-b border-gray-200">
                <TableHead className="font-semibold text-gray-700">Patient</TableHead>
                <TableHead className="font-semibold text-gray-700">Latest BP</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700">Alerts</TableHead>
                <TableHead className="font-semibold text-gray-700">Device</TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>

            {/* ---------- BODY ---------- */}
            <TableBody>
              {patients.map((patient) => {
                const status = patient.latestBP?.status || "normal";
                const StatusIcon = statusConfig[status].icon;

                return (
                  <TableRow
                    key={patient.id}
                    onClick={() => navigate(`/clinic/patient/${patient.id}`)}
                    className="cursor-pointer transition-colors hover:bg-blue-50"
                  >
                    {/* Patient */}
                    <TableCell>
                      <div className="flex items-center gap-3 min-h-[72px]">
                        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center font-bold text-blue-700 text-base shadow-sm">
                          {patient.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {patient.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {patient.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* BP */}
                    <TableCell>
                      <div className="min-h-[72px] flex items-center">
                        <span className="h-9 px-4 flex items-center rounded-lg border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white font-mono font-semibold shadow-sm">
                          {patient.latestBP?.systolic}/
                          {patient.latestBP?.diastolic}
                        </span>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <div className="min-h-[72px] flex items-center">
                        <div
                          className={cn(
                            "h-9 px-4 rounded-lg flex items-center gap-2 border-2 font-semibold text-sm shadow-sm",
                            statusConfig[status].bg,
                            statusConfig[status].text,
                            statusConfig[status].border
                          )}
                        >
                          <StatusIcon className="h-4 w-4" />
                          {statusConfig[status].label}
                        </div>
                      </div>
                    </TableCell>

                    {/* Alerts */}
                    <TableCell>
                      <div className="min-h-[72px] flex items-center">
                        {patient.alerts > 0 ? (
                          <Badge 
                            className={cn(
                              "h-9 px-4 text-white font-semibold shadow-sm hover:opacity-100",
                              patient.alerts >= 3 
                                ? "bg-red-600 hover:bg-red-600" 
                                : patient.alerts === 2 
                                ? "bg-orange-600 hover:bg-orange-600" 
                                : "bg-blue-600 hover:bg-blue-600"
                            )}
                          >
                            {patient.alerts} {patient.alerts === 1 ? 'alert' : 'alerts'}
                          </Badge>
                        ) : (
                          <Badge className="h-9 px-4 bg-gray-100 text-gray-600 font-medium hover:bg-gray-100">
                            None
                          </Badge>
                        )}
                      </div>
                    </TableCell>

                    {/* Device */}
                    <TableCell>
                      <div className="min-h-[72px] flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {patient.deviceStatus.isConnected ? (
                            <Wifi className="h-4 w-4 text-green-500" />
                          ) : (
                            <WifiOff className="h-4 w-4 text-gray-400" />
                          )}
                          <span
                            className={cn(
                              "h-3 w-3 rounded-full",
                              patient.deviceStatus.isConnected
                                ? "bg-green-500"
                                : "bg-gray-400"
                            )}
                          />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Battery className="h-4 w-4 text-gray-600" />
                          <span className="font-medium">
                            {patient.deviceStatus.battery}%
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="min-h-[72px] flex items-center justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/clinic/patient/${patient.id}`);
                          }}
                          className="h-9 px-5 rounded-lg border border-blue-300 bg-blue-50 text-blue-600 font-semibold transition-all shadow-sm"
                        >
                          View <ChevronRight className="inline ml-1 h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};