import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true); // 🔥 start maximized

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex">
        <Sidebar
          expanded={sidebarExpanded}
          setExpanded={setSidebarExpanded}
        />

        <main
          className={`
            flex-1
            p-6
            overflow-auto
            scrollbar-thin
            transition-[margin] duration-300 ease-in-out
            ${sidebarExpanded ? 'ml-64' : 'ml-16'}
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
