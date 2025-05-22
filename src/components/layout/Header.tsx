
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="bg-[#202020] border-b border-[#333333] text-[var(--color-neutral-offwhite)] p-4 sticky top-0 z-40 backdrop-blur-sm bg-opacity-90">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="h-9 w-9 text-[var(--color-neutral-offwhite)]" />
          <h1 className="text-xl md:text-2xl font-bold text-[var(--color-accent-cyan)] tracking-tight">
            RoboCode <span className="text-base md:text-lg font-medium text-[var(--color-neutral-offwhite)]">Platform</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--color-accent-cyan)] rounded-full"></span>
          </Button>
          
          <Button variant="ghost" size="icon" aria-label="Help">
            <HelpCircle className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2 text-sm md:text-base text-[var(--color-neutral-offwhite)]">
            <div className="w-8 h-8 rounded-full bg-[var(--color-accent-cyan)]/20 flex items-center justify-center">
              <span className="text-sm font-medium text-[var(--color-neutral-offwhite)]">SS</span>
            </div>
            <span className="font-medium hidden sm:block text-[var(--color-neutral-offwhite)]">Samir Sinha</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
