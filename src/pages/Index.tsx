
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Code, CheckSquare, HelpCircle } from 'lucide-react';

const Index = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-accent-cyan)] mb-3">Dashboard</h1>
        <p className="text-xl text-[var(--color-neutral-offwhite)]">
          AI-First SDLC Orchestration Platform Overview
        </p>
      </div>
      
      {/* Interactive SDLC Process Flow Diagram */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-[var(--color-neutral-offwhite)]">RoboCode Development Process</h2>
        <div className="bg-[#2C2C2C] border border-[#444444] rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Step 1: Document Review */}
            <div className="group relative">
              <Link to="/documents" className="block">
                <div className="bg-[#1e1e1e] border border-[#333333] rounded-lg p-4 h-24 flex items-center justify-center text-center hover:border-[var(--color-accent-cyan)] transition-all duration-200 cursor-pointer group-hover:bg-[#2a2a2a]">
                  <div>
                    <FileText className="h-6 w-6 text-[var(--color-accent-cyan)] mx-auto mb-1" />
                    <span className="text-sm text-[var(--color-neutral-offwhite)]">Document Review</span>
                  </div>
                </div>
              </Link>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-[#1a1a1a] text-[var(--color-neutral-offwhite)] text-xs rounded px-2 py-1 whitespace-nowrap border border-[#444444]">
                  Review PRDs, BRDs, and technical specifications
                </div>
              </div>
            </div>

            {/* Step 2: Environment Setup */}
            <div className="group relative">
              <Link to="/develop" className="block">
                <div className="bg-[#1e1e1e] border border-[#333333] rounded-lg p-4 h-24 flex items-center justify-center text-center hover:border-[var(--color-accent-green)] transition-all duration-200 cursor-pointer group-hover:bg-[#2a2a2a]">
                  <div>
                    <Code className="h-6 w-6 text-[var(--color-accent-green)] mx-auto mb-1" />
                    <span className="text-sm text-[var(--color-neutral-offwhite)]">Setup Environment</span>
                  </div>
                </div>
              </Link>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-[#1a1a1a] text-[var(--color-neutral-offwhite)] text-xs rounded px-2 py-1 whitespace-nowrap border border-[#444444]">
                  Initialize Git branch and development environment
                </div>
              </div>
            </div>

            {/* Step 3: Triage QA */}
            <div className="group relative">
              <Link to="/triage-qa" className="block">
                <div className="bg-[#1e1e1e] border border-[#333333] rounded-lg p-4 h-24 flex items-center justify-center text-center hover:border-[var(--color-accent-purple)] transition-all duration-200 cursor-pointer group-hover:bg-[#2a2a2a]">
                  <div>
                    <CheckSquare className="h-6 w-6 text-[var(--color-accent-purple)] mx-auto mb-1" />
                    <span className="text-sm text-[var(--color-neutral-offwhite)]">Triage QA</span>
                  </div>
                </div>
              </Link>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-[#1a1a1a] text-[var(--color-neutral-offwhite)] text-xs rounded px-2 py-1 whitespace-nowrap border border-[#444444]">
                  AI-assisted code review and quality assessment
                </div>
              </div>
            </div>

            {/* Step 4: SA Review */}
            <div className="group relative">
              <Link to="/review" className="block">
                <div className="bg-[#1e1e1e] border border-[#333333] rounded-lg p-4 h-24 flex items-center justify-center text-center hover:border-[var(--color-accent-orange)] transition-all duration-200 cursor-pointer group-hover:bg-[#2a2a2a]">
                  <div>
                    <HelpCircle className="h-6 w-6 text-[var(--color-accent-orange)] mx-auto mb-1" />
                    <span className="text-sm text-[var(--color-neutral-offwhite)]">SA Review</span>
                  </div>
                </div>
              </Link>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-[#1a1a1a] text-[var(--color-neutral-offwhite)] text-xs rounded px-2 py-1 whitespace-nowrap border border-[#444444]">
                  Solution Architect final review and approval
                </div>
              </div>
            </div>
          </div>

          {/* Process Flow Arrows */}
          <div className="flex justify-center items-center space-x-4 text-[var(--color-neutral-mid)]">
            <div className="text-sm">Documents</div>
            <div className="text-xl">→</div>
            <div className="text-sm">Development</div>
            <div className="text-xl">→</div>
            <div className="text-sm">Quality Check</div>
            <div className="text-xl">→</div>
            <div className="text-sm">Final Approval</div>
          </div>
        </div>
      </section>
      
      {/* Quick Access Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors">
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
        
        <Card className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors">
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
        
        <Card className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors">
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
        
        <Card className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors">
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
      
      {/* Recent Activity Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-neutral-offwhite)]">Recent Activity</h2>
        <Card className="border border-[#444444]">
          <CardContent className="p-6">
            <ul className="space-y-3">
              <li className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#333333]">
                <div className="flex items-center space-x-3">
                  <CheckSquare className="h-5 w-5 text-green-400" />
                  <div>
                    <span className="text-[var(--color-neutral-offwhite)]">DocumentManager_UI module passed SA Review</span>
                    <p className="text-sm text-[var(--color-neutral-mid)]">2025-05-05</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                  Merged
                </span>
              </li>
              <li className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#333333]">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <div>
                    <span className="text-[var(--color-neutral-offwhite)]">Internal_Kernel_Architecture.pdf added to documents</span>
                    <p className="text-sm text-[var(--color-neutral-mid)]">2025-05-01</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                  Document
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
      
      {/* Project Stats Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-neutral-offwhite)]">Project Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-[#444444]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">Total Modules</h3>
                  <p className="text-3xl font-bold text-[var(--color-accent-cyan)]">1</p>
                </div>
                <Code className="h-8 w-8 text-[var(--color-accent-cyan)]/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="border border-[#444444]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">Documents</h3>
                  <p className="text-3xl font-bold text-[var(--color-accent-cyan)]">2</p>
                </div>
                <FileText className="h-8 w-8 text-[var(--color-accent-cyan)]/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="border border-[#444444]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">Completed Reviews</h3>
                  <p className="text-3xl font-bold text-[var(--color-accent-cyan)]">1</p>
                </div>
                <CheckSquare className="h-8 w-8 text-[var(--color-accent-cyan)]/50" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
