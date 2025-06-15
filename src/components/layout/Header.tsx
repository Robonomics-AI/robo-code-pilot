
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, HelpCircle, Info, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Header: React.FC = () => {
  return (
    <header className="bg-[#202020] border-b border-[#333333] text-[var(--color-neutral-offwhite)] p-4 sticky top-0 z-40 backdrop-blur-sm bg-opacity-90">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarTrigger className="h-9 w-9 text-[var(--color-neutral-offwhite)]" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Navigation (Ctrl+B)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <h1 className="text-xl md:text-2xl font-bold text-[var(--color-accent-cyan)] tracking-tight">
            RoboCode <span className="text-base md:text-lg font-medium text-[var(--color-neutral-offwhite)]">Platform</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] rounded-lg cursor-pointer hover:border-[var(--color-accent-cyan)] transition-colors">
                  <span className="text-sm text-[var(--color-neutral-mid)]">Project:</span>
                  <span className="text-sm font-semibold text-[var(--color-accent-cyan)]">RoboCode Internal Build</span>
                  <ChevronDown className="h-4 w-4 text-[var(--color-neutral-mid)]" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Switch Projects (Future feature)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-accent-cyan)] rounded-full border-2 border-[#202020]"></span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Help">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Help & Support</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="flex items-center gap-2 text-sm md:text-base text-[var(--color-neutral-offwhite)]">
            <div className="w-8 h-8 rounded-full bg-[var(--color-accent-cyan)]/20 flex items-center justify-center" title="User profile: Samir Sinha - Founder & CEO">
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
