
import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const Header: React.FC = () => {
  return (
    <header 
      className="bg-[#202020] border-b border-[#333333] text-[var(--color-neutral-offwhite)] p-4 md:p-6 shadow-md sticky top-0 z-50 backdrop-blur-sm bg-opacity-90"
    >
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-3 md:gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/411ab4ed-6ae1-4704-b5b2-0b6910940aa6.png" 
              alt="Robonomics AI Logo" 
              className="h-8 md:h-10"
            />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-[var(--color-accent-cyan)] tracking-tight">
            RoboCode <span className="text-base md:text-lg font-medium opacity-80 text-[var(--color-neutral-offwhite)]">Platform</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center gap-2 text-sm md:text-base text-[var(--color-neutral-offwhite)]">
            <div className="w-8 h-8 rounded-full bg-[var(--color-accent-cyan)]/20 flex items-center justify-center">
              <span className="text-sm font-medium">SS</span>
            </div>
            <span className="font-medium hidden sm:block">Samir Sinha</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
