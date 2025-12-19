import React, { useState } from 'react';

/* Components */
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

/* Props Interface */
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Content below navbar */}
      <div className="flex pt-16">
        <Sidebar
          expanded={sidebarExpanded}
          setExpanded={setSidebarExpanded}
        />

        <main
          className={`
            flex-1
            p-6
            min-h-[calc(100vh-4rem)]
            overflow-y-auto
            transition-all duration-300
            ${sidebarExpanded ? 'ml-64' : 'ml-16'}
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
