import React from 'react';
import { NavLink } from '@/components/NavLink';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  History,
  Bell,
  Smartphone,
  Settings,
  UserPlus,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

/* -------------------------
   Sidebar Links
-------------------------- */

// Patient + Family (same sidebar)
const patientFamilyLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/history', icon: History, label: 'History' },
  { to: '/alerts', icon: Bell, label: 'Alerts' },
  { to: '/device', icon: Smartphone, label: 'Device' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

// Clinic (separate sidebar)
const clinicLinks = [
  { to: '/clinic', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/clinic/add-patient', icon: UserPlus, label: 'Add Patient' },
  { to: '/alerts', icon: Bell, label: 'Alerts' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

/* -------------------------
   Sidebar Component
-------------------------- */

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const isClinic = user?.role === 'clinic';
  const links = isClinic ? clinicLinks : patientFamilyLinks;

  return (
    <aside
      className={cn(
        'hidden lg:fixed lg:flex flex-col',
        'w-64 top-16 left-0',
        'h-[calc(100vh-4rem)]',
        'bg-sidebar border-r border-sidebar-border',
        'z-40'
      )}
    >
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg',
                'text-sidebar-foreground font-medium',
                'transition-all duration-200',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
              activeClassName="bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
            >
              <Icon className="w-5 h-5" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Device Status (Only for Patient & Family) */}
      {!isClinic && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Device Status
                </p>
                <p className="text-xs text-success">Connected</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
