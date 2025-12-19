import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
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

interface SidebarProps {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
}

/* -------------------------
   Links
-------------------------- */

const patientFamilyLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/history', icon: History, label: 'History', end: true },
  { to: '/alerts', icon: Bell, label: 'Alerts', end: true },
  { to: '/device', icon: Smartphone, label: 'Device', end: true },
  { to: '/settings', icon: Settings, label: 'Settings', end: true },
];

const clinicLinks = [
  { to: '/clinic', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/clinic/add-patient', icon: UserPlus, label: 'Add Patient', end: true },
  { to: '/alerts', icon: Bell, label: 'Alerts', end: true },
  { to: '/settings', icon: Settings, label: 'Settings', end: true },
];

/* -------------------------
   Sidebar
-------------------------- */

export const Sidebar: React.FC<SidebarProps> = ({
  expanded,
  setExpanded,
}) => {
  const { user } = useAuth();
  const isClinic = user?.role === 'clinic';
  const links = isClinic ? clinicLinks : patientFamilyLinks;

  const sidebarRef = useRef<HTMLElement | null>(null);

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (!sidebarRef.current) return;

    // ✅ collapse ONLY if mouse truly left sidebar
    if (!sidebarRef.current.contains(e.relatedTarget as Node)) {
      setExpanded(false);
    }
  };

  return (
    <aside
      ref={sidebarRef}
      onPointerEnter={() => setExpanded(true)}   // hover → expand
      onPointerLeave={handlePointerLeave}        // real leave → collapse
      className={cn(
        'hidden lg:fixed lg:flex flex-col',
        'top-16 left-0 h-[calc(100vh-4rem)]',
        'bg-sidebar border-r border-sidebar-border z-40',
        'overflow-hidden',
        expanded ? 'w-64' : 'w-16',
        'transition-[width] duration-300 ease-in-out'
      )}
    >
      <nav className="flex-1 p-2 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setExpanded(true)}  // 🔥 KEEP MAXIMIZED ON PAGE CHANGE
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-3 rounded-lg font-medium',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                )
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {expanded && (
                <span className="whitespace-nowrap">
                  {link.label}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {!isClinic && expanded && (
        <div className="p-3 border-t border-sidebar-border">
          <div className="glass-card p-3">
            <div className="flex items-center gap-3">
              <Smartphone className="w-4 h-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Device Status</p>
                <p className="text-xs text-success">Connected</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
