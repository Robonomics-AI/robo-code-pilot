
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-neutral-offwhite)] font-inter">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 text-[var(--color-primary-core)]">RoboCode Platform</h1>
        <p className="text-xl text-[var(--color-neutral-dark)] mb-8">AI-First SDLC Orchestration Platform</p>
        <div className="flex gap-4 justify-center">
          <Button asChild className="bg-[var(--color-primary-core)] hover:bg-[#0059b3] text-white transition-colors duration-200">
            <Link to="/documents">Document Manager</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
