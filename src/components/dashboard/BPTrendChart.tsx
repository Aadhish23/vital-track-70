import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface BPDataPoint {
  date: string;
  systolic: number;
  diastolic: number;
}

interface BPTrendChartProps {
  data: BPDataPoint[];
  title?: string;
}

export const BPTrendChart: React.FC<BPTrendChartProps> = ({ data, title = "BP Trends" }) => {
  return (
    <Card variant="glassHover" className="col-span-full bg-white border border-red-400 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 hover:border-blue-300 group">
      <CardHeader className="pb-2 px-4 lg:px-6 pt-4 lg:pt-6">
        <CardTitle className="text-base lg:text-lg flex items-center gap-2 text-red-600 group-hover:text-red-700 group-hover:font-bold transition-all duration-300">
          <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-red-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 lg:px-6 pb-4 lg:pb-6">
        {/* Responsive chart height */}
        <div className="h-[200px] lg:h-[300px] w-full bg-white">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
              <XAxis
                dataKey="date"
                stroke="#475569"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#475569"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                domain={[60, 180]}
                width={35}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #BFDBFE',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
                  fontSize: '12px',
                }}
                labelStyle={{ color: '#1E3A8A' }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '11px' }}
                iconSize={8}
              />
              <defs>
                <linearGradient id="colorSystolic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="colorDiastolic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="systolic"
                stroke="#2563EB"
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 1, r: 3, stroke: '#ffffff' }}
                activeDot={{ r: 5, fill: '#2563EB', stroke: '#ffffff', strokeWidth: 2 }}
                name="Systolic"
                fill="url(#colorSystolic)"
              />
              <Line
                type="monotone"
                dataKey="diastolic"
                stroke="#60A5FA"
                strokeWidth={2}
                dot={{ fill: '#93C5FD', strokeWidth: 1, r: 3, stroke: '#ffffff' }}
                activeDot={{ r: 5, fill: '#60A5FA', stroke: '#ffffff', strokeWidth: 2 }}
                name="Diastolic"
                fill="url(#colorDiastolic)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Reference ranges - scrollable on mobile */}
        <div className="flex justify-center gap-3 lg:gap-6 mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-blue-100 overflow-x-auto">
          <div className="text-center flex-shrink-0">
            <p className="text-[10px] lg:text-xs text-slate-600">Normal</p>
            <p className="text-[10px] lg:text-sm font-medium text-green-600">&lt;120/80</p>
          </div>
          <div className="text-center flex-shrink-0">
            <p className="text-[10px] lg:text-xs text-slate-600">Elevated</p>
            <p className="text-[10px] lg:text-sm font-medium text-amber-600">120-129</p>
          </div>
          <div className="text-center flex-shrink-0">
            <p className="text-[10px] lg:text-xs text-slate-600">High</p>
            <p className="text-[10px] lg:text-sm font-medium text-red-600">&gt;130/80</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};