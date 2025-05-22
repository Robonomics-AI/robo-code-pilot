
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Code, CheckSquare, HelpCircle } from 'lucide-react';
import Header from '@/components/layout/Header';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 p-6 container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-accent-cyan)] mb-3">RoboCode Platform</h1>
          <p className="text-xl text-[var(--color-neutral-offwhite)]">
            AI-First SDLC Orchestration Platform
          </p>
        </div>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors hover-lift">
            <CardContent className="p-6">
              <div className="h-14 w-14 rounded-full flex items-center justify-center bg-[var(--color-accent-cyan)]/10 mb-4">
                <FileText className="h-7 w-7 text-[var(--color-accent-cyan)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--color-neutral-offwhite)]">Document Management</h3>
              <p className="text-sm text-[var(--color-neutral-mid)] mb-4">
                Store, categorize, and access project documents, from BRDs to tech specs.
              </p>
              <Link to="/documents">
                <Button className="w-full bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110">
                  Access Documents
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors hover-lift">
            <CardContent className="p-6">
              <div className="h-14 w-14 rounded-full flex items-center justify-center bg-[var(--color-accent-green)]/10 mb-4">
                <Code className="h-7 w-7 text-[var(--color-accent-green)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--color-neutral-offwhite)]">Develop RoboCode</h3>
              <p className="text-sm text-[var(--color-neutral-mid)] mb-4">
                Start new modules and follow the guided development workflow.
              </p>
              <Link to="/develop">
                <Button className="w-full bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110">
                  Start New Module
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors hover-lift">
            <CardContent className="p-6">
              <div className="h-14 w-14 rounded-full flex items-center justify-center bg-[var(--color-accent-purple)]/10 mb-4">
                <CheckSquare className="h-7 w-7 text-[var(--color-accent-purple)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--color-neutral-offwhite)]">Code Review</h3>
              <p className="text-sm text-[var(--color-neutral-mid)] mb-4">
                Perform Triage QA and SA reviews to ensure code quality.
              </p>
              <Link to="/review">
                <Button className="w-full bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110">
                  Review Code
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors hover-lift">
            <CardContent className="p-6">
              <div className="h-14 w-14 rounded-full flex items-center justify-center bg-[var(--color-accent-orange)]/10 mb-4">
                <HelpCircle className="h-7 w-7 text-[var(--color-accent-orange)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--color-neutral-offwhite)]">Project Assistant</h3>
              <p className="text-sm text-[var(--color-neutral-mid)] mb-4">
                Get help with RoboCode processes and best practices.
              </p>
              <Link to="/ipa">
                <Button className="w-full bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110">
                  Ask IPA
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[var(--color-neutral-offwhite)]">Recent Activity</h2>
          <Card className="border border-[#444444]">
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#333333]">
                  <div>
                    <span className="text-[var(--color-neutral-offwhite)]">DocumentManager_UI module passed SA Review</span>
                    <p className="text-sm text-[var(--color-neutral-mid)]">2025-05-05</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                    Merged
                  </span>
                </li>
                <li className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#333333]">
                  <div>
                    <span className="text-[var(--color-neutral-offwhite)]">Internal_Kernel_Architecture.pdf added to documents</span>
                    <p className="text-sm text-[var(--color-neutral-mid)]">2025-05-01</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                    Document
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4 text-[var(--color-neutral-offwhite)]">Project Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-[#444444]">
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">Total Modules</h3>
                <p className="text-3xl font-bold text-[var(--color-accent-cyan)]">1</p>
              </CardContent>
            </Card>
            <Card className="border border-[#444444]">
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">Documents</h3>
                <p className="text-3xl font-bold text-[var(--color-accent-cyan)]">2</p>
              </CardContent>
            </Card>
            <Card className="border border-[#444444]">
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">Completed Reviews</h3>
                <p className="text-3xl font-bold text-[var(--color-accent-cyan)]">1</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
