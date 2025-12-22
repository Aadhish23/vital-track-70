import React, { useState } from 'react';

/* Components */
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils';

/* Props Interface */
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Navbar */}
      <Navbar 
        onMobileMenuToggle={() => setMobileDrawerOpen(true)} 
      />

      {/* Content below navbar */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <Sidebar
          expanded={sidebarExpanded}
          setExpanded={setSidebarExpanded}
          mobileDrawerOpen={mobileDrawerOpen}
          setMobileDrawerOpen={setMobileDrawerOpen}
        />

        <main
          className={cn(
            'flex-1',
            'p-4 lg:p-6',
            'min-h-[calc(100vh-4rem)]',
            'overflow-y-auto',
            'transition-all duration-300',
            // No margin on mobile, responsive margin on desktop
            'ml-0',
            sidebarExpanded ? 'lg:ml-64' : 'lg:ml-16'
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};