
import React, { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  History,
  Bell,
  Smartphone,
  Settings,
  UserPlus,
  X,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  mobileDrawerOpen?: boolean;
  setMobileDrawerOpen?: (value: boolean) => void;
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
   Sidebar Content (shared)
-------------------------- */

interface SidebarContentProps {
  links: typeof patientFamilyLinks;
  isClinic: boolean;
  expanded: boolean;
  onNavClick?: () => void;
  onLogout: () => void;
}

const SidebarNavContent: React.FC<SidebarContentProps> = ({
  links,
  isClinic,
  expanded,
  onNavClick,
  onLogout,
}) => (
  <>
    <nav className="flex-1 p-2 space-y-2 overflow-y-auto">
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={onNavClick}
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

    {/* Device Status - for non-clinic users */}
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

    {/* Logout Button - Fixed at bottom */}
    <div className="p-3 border-t border-sidebar-border mt-auto">
      <Button
        variant="ghost"
        onClick={onLogout}
        className={cn(
          'w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium group',
          'bg-red-50 border border-red-300 text-sidebar-foreground',
          'hover:bg-red-600 hover:border-red-600 hover:text-white',
          'transition-all duration-200',
          !expanded && 'justify-center'
        )}
      >
        <LogOut className="w-5 h-5 shrink-0 text-red-600 group-hover:text-white transition-colors duration-200" />
        {expanded && (
          <span className="whitespace-nowrap">
            Logout
          </span>
        )}
      </Button>
    </div>
  </>
);

/* -------------------------
   Sidebar
-------------------------- */

export const Sidebar: React.FC<SidebarProps> = ({
  expanded,
  setExpanded,
  mobileDrawerOpen = false,
  setMobileDrawerOpen,
}) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
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

  const closeMobileDrawer = () => {
    setMobileDrawerOpen?.(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileDrawer();
    navigate('/', { replace: true });
  };

  return (
    <>
      {/* Desktop Sidebar - hidden on mobile */}
      <aside
        ref={sidebarRef}
        onPointerEnter={() => setExpanded(true)}
        onPointerLeave={handlePointerLeave}
        className={cn(
          'fixed flex-col',
          'top-16 left-0 h-[calc(100vh-4rem)]',
          'bg-sidebar border-r border-sidebar-border z-40',
          expanded ? 'w-64' : 'w-16',
          'transition-[width] duration-300 ease-in-out',
          'hidden lg:flex' // Hide on mobile, show on lg+
        )}
      >
        <SidebarNavContent
          links={links}
          isClinic={isClinic}
          expanded={expanded}
          onNavClick={() => setExpanded(true)}
          onLogout={handleLogout}
        />
      </aside>

      {/* Mobile Drawer */}
      <Sheet open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
        <SheetContent 
          side="left" 
          className="w-72 p-0 bg-sidebar border-r border-sidebar-border"
        >
          <div className="flex flex-col h-full">
            {/* Header - Mobile only */}
            <div className="flex items-center justify-between p-4 border-b border-sidebar-border lg:hidden">
              <span className="font-semibold text-sidebar-foreground">Menu</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={closeMobileDrawer}
                className="text-sidebar-foreground"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Navigation */}
            <SidebarNavContent
              links={links}
              isClinic={isClinic}
              expanded={true}
              onNavClick={closeMobileDrawer}
              onLogout={handleLogout}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
