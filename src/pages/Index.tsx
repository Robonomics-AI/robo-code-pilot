
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Folder, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-neutral-offwhite)] font-inter">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-[var(--color-primary-core)] tracking-tight">
              RoboCode Platform
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)] opacity-80">
              AI-First SDLC Orchestration Platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-soft border border-[var(--color-neutral-light)] transition-all duration-200 hover:shadow-md">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent-cyan)]/10 flex items-center justify-center">
                  <Folder className="w-8 h-8 text-[var(--color-accent-cyan)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-neutral-dark)]">Document Manager</h3>
                <p className="text-[var(--color-neutral-dark)]/70 text-center mb-4">
                  Organize and manage project documentation for efficient access.
                </p>
                <Button asChild className="bg-[var(--color-primary-core)] hover:bg-[#00254D] text-white transition-colors duration-200 gap-2">
                  <Link to="/documents">
                    <span>Access Documents</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-soft border border-[var(--color-neutral-light)] transition-all duration-200 hover:shadow-md opacity-75">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent-green)]/10 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-[var(--color-accent-green)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-neutral-dark)]">Development Workspace</h3>
                <p className="text-[var(--color-neutral-dark)]/70 text-center mb-4">
                  Coming soon - Collaborative workspace for development activities.
                </p>
                <Button disabled className="bg-[var(--color-neutral-mid)] text-white gap-2 cursor-not-allowed">
                  <span>Coming Soon</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 border-t border-[var(--color-neutral-light)]">
        <div className="container text-center text-sm text-[var(--color-neutral-dark)]/60">
          Robonomics AI &copy; {new Date().getFullYear()} - RoboCode Platform
        </div>
      </footer>
    </div>
  );
};

export default Index;
