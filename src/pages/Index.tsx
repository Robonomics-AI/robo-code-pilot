
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Folder, ArrowRight, Code, CheckSquare, HelpCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background font-inter">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-8">
        <div className="max-w-4xl w-full text-center space-y-8 fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              RoboCode Platform
            </h1>
            <p className="text-xl text-muted-foreground">
              AI-First SDLC Orchestration Platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card className="hover-lift flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex flex-col items-center gap-4 h-full">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-accent-cyan)]/10 flex items-center justify-center mt-4 dark:bg-accent/20">
                    <Folder className="w-8 h-8 text-[var(--color-accent-cyan)] dark:text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">Document Manager</h3>
                  <p className="text-muted-foreground text-center mb-4 flex-grow">
                    Organize and manage project documentation for efficient access.
                  </p>
                  <Button asChild variant="default" className="w-full">
                    <Link to="/documents">
                      <span>Access Documents</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex flex-col items-center gap-4 h-full">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-accent-green)]/10 flex items-center justify-center mt-4 dark:bg-[var(--color-accent-green)]/20">
                    <Code className="w-8 h-8 text-[var(--color-accent-green)]" />
                  </div>
                  <h3 className="text-xl font-semibold">Develop RoboCode</h3>
                  <p className="text-muted-foreground text-center mb-4 flex-grow">
                    Start a new RoboCode module with the correct code from GitHub.
                  </p>
                  <Button asChild variant="accent" className="w-full">
                    <Link to="/develop">
                      <span>Start New Module</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex flex-col items-center gap-4 h-full">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-accent-purple)]/10 flex items-center justify-center mt-4 dark:bg-[var(--color-accent-purple)]/20">
                    <CheckSquare className="w-8 h-8 text-[var(--color-accent-purple)]" />
                  </div>
                  <h3 className="text-xl font-semibold">SA Code Review</h3>
                  <p className="text-muted-foreground text-center mb-4 flex-grow">
                    Review and approve modules that have passed triage QA.
                  </p>
                  <Button asChild variant="default" className="w-full">
                    <Link to="/review">
                      <span>Review Code</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift flex flex-col lg:col-start-2 lg:col-span-1">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex flex-col items-center gap-4 h-full">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-accent-orange)]/10 flex items-center justify-center mt-4 dark:bg-[var(--color-accent-orange)]/20">
                    <HelpCircle className="w-8 h-8 text-[var(--color-accent-orange)]" />
                  </div>
                  <h3 className="text-xl font-semibold">RoboCode IPA</h3>
                  <p className="text-muted-foreground text-center mb-4 flex-grow">
                    Get assistance with RoboCode processes and development workflow.
                  </p>
                  <Button asChild variant="warning" className="w-full">
                    <Link to="/ipa">
                      <span>Ask IPA</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          Robonomics AI &copy; {new Date().getFullYear()} - RoboCode Platform
        </div>
      </footer>
    </div>
  );
};

export default Index;
