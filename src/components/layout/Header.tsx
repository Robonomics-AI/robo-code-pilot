
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header 
      className="header-gradient text-[var(--color-neutral-offwhite)] p-6 shadow-md"
    >
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/411ab4ed-6ae1-4704-b5b2-0b6910940aa6.png" 
              alt="Robonomics AI Logo" 
              className="h-10"
            />
          </Link>
          <h1 className="text-[2rem] font-bold text-[var(--color-neutral-offwhite)] tracking-tight">
            RoboCode <span className="text-[1.25rem] font-medium opacity-80">Platform</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-[0.875rem] text-[var(--color-neutral-offwhite)]">
          <div className="w-8 h-8 rounded-full bg-[var(--color-neutral-offwhite)]/20 flex items-center justify-center">
            <span className="text-sm font-medium">SS</span>
          </div>
          <span className="font-medium">Samir Sinha</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
