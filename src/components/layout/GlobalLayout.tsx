
import React from 'react';
import Header from './Header';
import NavDrawer from './NavDrawer';
import { SidebarProvider } from '@/components/ui/sidebar';

interface GlobalLayoutProps {
  children: React.ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <NavDrawer />
        <div className="flex flex-col w-full overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto p-6 bg-[#121212]">
            {children}
          </main>
          <footer className="p-4 bg-background text-xs text-muted-foreground border-t border-border">
            <div className="container flex justify-between items-center">
              <span>© 2025 Robonomics AI</span>
              <div className="flex gap-4">
                <button 
                  className="hover:text-accent transition-colors" 
                  title="Get contextual help for the current page and its features"
                  onClick={() => console.log(`[ROBOCODE][Help]: Context help requested`)}
                >
                  Help for this Page
                </button>
                <a href="#" className="hover:text-accent" title="Access comprehensive platform documentation">Documentation</a>
                <a href="#" className="hover:text-accent" title="View privacy policy and data handling practices">Privacy Policy</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default GlobalLayout;

// NOTE: This file has gotten long in the past but with this refactor,
// primary navigation is now moved to NavDrawer. If you wish to further
// modularize content areas, ask to refactor again!
