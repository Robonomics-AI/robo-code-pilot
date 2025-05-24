
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Code, CheckSquare, HelpCircle, Info, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="space-y-8">
      {/* Page Header with Information Icon */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-accent-cyan)]">Dashboard</h1>
          <span title="Dashboard overview showing project status, workflow progress, and quick access to key features">
            <Info className="h-6 w-6 text-[var(--color-accent-cyan)] bg-[var(--color-card-bg)] rounded-full p-1" />
          </span>
        </div>
        <p className="text-xl text-[var(--color-neutral-offwhite)]">
          AI-First Software Development Lifecycle (SDLC) Orchestration Platform Overview
        </p>
      </div>
      
      {/* Enhanced Interactive SDLC Process Flow Diagram */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-neutral-offwhite)]">RoboCode Development Process</h2>
          <span title="Interactive diagram showing the complete RoboCode development workflow from document review to final approval">
            <Info className="h-5 w-5 text-[var(--color-accent-cyan)] bg-[var(--color-card-bg)] rounded-full p-1" />
          </span>
        </div>
        <div className="bg-[#2C2C2C] border border-[#444444] rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Step 1: Document Review */}
            <div className="group relative">
              <Link to="/documents" className="block" title="Navigate to Document Manager to review Product Requirements Documents (PRDs), Business Requirements Documents (BRDs), and technical specifications">
                <div className="bg-[#1e1e1e] border-2 border-[#333333] rounded-lg p-6 h-32 flex items-center justify-center text-center hover:border-[var(--color-accent-cyan)] transition-all duration-200 cursor-pointer group-hover:bg-[#2a2a2a] group-hover:transform group-hover:scale-105">
                  <div>
                    <span title="Document management and organization">
                      <FileText className="h-8 w-8 text-[var(--color-accent-cyan)] mx-auto mb-2" />
                    </span>
                    <span className="text-base font-medium text-[var(--color-neutral-offwhite)]">Document Review</span>
                  </div>
                </div>
              </Link>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-[#1a1a1a] text-[var(--color-neutral-offwhite)] text-sm rounded-lg px-3 py-2 max-w-xs text-center border border-[#444444] shadow-lg">
                  Review Project Requirements Documents (PRDs), Business Requirements Documents (BRDs), and technical specifications to understand project scope and requirements
                </div>
              </div>
            </div>

            {/* Step 2: Environment Setup */}
            <div className="group relative">
              <Link to="/develop" className="block" title="Navigate to Development Environment Setup to initialize Git branches and development environment">
                <div className="bg-[#1e1e1e] border-2 border-[#333333] rounded-lg p-6 h-32 flex items-center justify-center text-center hover:border-[var(--color-accent-green)] transition-all duration-200 cursor-pointer group-hover:bg-[#2a2a2a] group-hover:transform group-hover:scale-105">
                  <div>
                    <span title="Development environment setup">
                      <Code className="h-8 w-8 text-[var(--color-accent-green)] mx-auto mb-2" />
                    </span>
                    <span className="text-base font-medium text-[var(--color-neutral-offwhite)]">Environment Setup</span>
                  </div>
                </div>
              </Link>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-[#1a1a1a] text-[var(--color-neutral-offwhite)] text-sm rounded-lg px-3 py-2 max-w-xs text-center border border-[#444444] shadow-lg">
                  Initialize Git branch and development environment using the RoboCode Internal Code Kernel for consistent project structure
                </div>
              </div>
            </div>

            {/* Step 3: Triage QA */}
            <div className="group relative">
              <Link to="/triage-qa" className="block" title="Navigate to Triage Quality Assurance (QA) for AI-assisted code review and quality assessment">
                <div className="bg-[#1e1e1e] border-2 border-[#333333] rounded-lg p-6 h-32 flex items-center justify-center text-center hover:border-[var(--color-accent-purple)] transition-all duration-200 cursor-pointer group-hover:bg-[#2a2a2a] group-hover:transform group-hover:scale-105">
                  <div>
                    <span title="Code review and quality assurance">
                      <CheckSquare className="h-8 w-8 text-[var(--color-accent-purple)] mx-auto mb-2" />
                    </span>
                    <span className="text-base font-medium text-[var(--color-neutral-offwhite)]">Triage QA</span>
                  </div>
                </div>
              </Link>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-[#1a1a1a] text-[var(--color-neutral-offwhite)] text-sm rounded-lg px-3 py-2 max-w-xs text-center border border-[#444444] shadow-lg">
                  AI-assisted code review and quality assessment using external Large Language Model (LLM) tools to ensure code meets standards before Solution Architect (SA) review
                </div>
              </div>
            </div>

            {/* Step 4: SA Review */}
            <div className="group relative">
              <Link to="/review" className="block" title="Navigate to Solution Architect (SA) Review for final human validation and approval">
                <div className="bg-[#1e1e1e] border-2 border-[#333333] rounded-lg p-6 h-32 flex items-center justify-center text-center hover:border-[var(--color-accent-orange)] transition-all duration-200 cursor-pointer group-hover:bg-[#2a2a2a] group-hover:transform group-hover:scale-105">
                  <div>
                    <span title="Intelligent Project Assistant">
                      <HelpCircle className="h-8 w-8 text-[var(--color-accent-orange)] mx-auto mb-2" />
                    </span>
                    <span className="text-base font-medium text-[var(--color-neutral-offwhite)]">SA Review</span>
                  </div>
                </div>
              </Link>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-[#1a1a1a] text-[var(--color-neutral-offwhite)] text-sm rounded-lg px-3 py-2 max-w-xs text-center border border-[#444444] shadow-lg">
                  Solution Architect (SA) final review and approval process with comprehensive checklists and manual validation before code integration
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Process Flow Arrows */}
          <div className="flex justify-center items-center space-x-6 text-[var(--color-neutral-mid)]">
            <div className="text-sm font-medium">Documents</div>
            <ArrowRight className="h-6 w-6 text-[var(--color-accent-cyan)]" />
            <div className="text-sm font-medium">Development</div>
            <ArrowRight className="h-6 w-6 text-[var(--color-accent-cyan)]" />
            <div className="text-sm font-medium">Quality Check</div>
            <ArrowRight className="h-6 w-6 text-[var(--color-accent-cyan)]" />
            <div className="text-sm font-medium">Final Approval</div>
          </div>
        </div>
      </section>
      
      {/* Quick Access Cards with Information Icons */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors">
          <CardContent className="p-6">
            <div className="h-14 w-14 rounded-full flex items-center justify-center bg-[var(--color-accent-cyan)]/10 mb-4">
              <span title="Document management and organization">
                <FileText className="h-7 w-7 text-[var(--color-accent-cyan)]" />
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-[var(--color-neutral-offwhite)]">Document Management</h3>
              <span title="Store, categorize, and access project documents including PRDs, BRDs, and technical specifications">
                <Info className="h-4 w-4 text-[var(--color-accent-cyan)]" />
              </span>
            </div>
            <p className="text-sm text-[var(--color-neutral-mid)] mb-4">
              Store, categorize, and access project documents, from Business Requirements Documents (BRDs) to technical specifications.
            </p>
            <Link to="/documents">
              <Button className="w-full bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110" title="Access document management system">
                Access Documents
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors">
          <CardContent className="p-6">
            <div className="h-14 w-14 rounded-full flex items-center justify-center bg-[var(--color-accent-green)]/10 mb-4">
              <span title="Development environment setup">
                <Code className="h-7 w-7 text-[var(--color-accent-green)]" />
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-[var(--color-neutral-offwhite)]">Develop RoboCode</h3>
              <span title="Start new modules and follow the guided development workflow using the RoboCode Internal Code Kernel">
                <Info className="h-4 w-4 text-[var(--color-accent-cyan)]" />
              </span>
            </div>
            <p className="text-sm text-[var(--color-neutral-mid)] mb-4">
              Start new modules and follow the guided development workflow.
            </p>
            <Link to="/develop">
              <Button className="w-full bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110" title="Start new module development">
                Start New Module
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors">
          <CardContent className="p-6">
            <div className="h-14 w-14 rounded-full flex items-center justify-center bg-[var(--color-accent-purple)]/10 mb-4">
              <span title="Code review and quality assurance">
                <CheckSquare className="h-7 w-7 text-[var(--color-accent-purple)]" />
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-[var(--color-neutral-offwhite)]">Code Review</h3>
              <span title="Perform Triage QA and SA reviews to ensure code quality and compliance">
                <Info className="h-4 w-4 text-[var(--color-accent-cyan)]" />
              </span>
            </div>
            <p className="text-sm text-[var(--color-neutral-mid)] mb-4">
              Perform Triage Quality Assurance (QA) and Solution Architect (SA) reviews to ensure code quality.
            </p>
            <Link to="/review">
              <Button className="w-full bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110" title="Access code review system">
                Review Code
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors">
          <CardContent className="p-6">
            <div className="h-14 w-14 rounded-full flex items-center justify-center bg-[var(--color-accent-orange)]/10 mb-4">
              <span title="Intelligent Project Assistant">
                <HelpCircle className="h-7 w-7 text-[var(--color-accent-orange)]" />
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-[var(--color-neutral-offwhite)]">Project Assistant</h3>
              <span title="Get help with RoboCode processes, best practices, and workflow guidance">
                <Info className="h-4 w-4 text-[var(--color-accent-cyan)]" />
              </span>
            </div>
            <p className="text-sm text-[var(--color-neutral-mid)] mb-4">
              Get help with RoboCode processes and best practices through the Intelligent Project Assistant (IPA).
            </p>
            <Link to="/ipa">
              <Button className="w-full bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110" title="Ask the Intelligent Project Assistant">
                Ask IPA
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
      
      {/* Recent Activity Section with Information Icon */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold text-[var(--color-neutral-offwhite)]">Recent Activity</h2>
          <span title="Recent platform activities including document uploads, module development, and review submissions">
            <Info className="h-5 w-5 text-[var(--color-accent-cyan)] bg-[var(--color-card-bg)] rounded-full p-1" />
          </span>
        </div>
        <Card className="border border-[#444444]">
          <CardContent className="p-6">
            <ul className="space-y-3">
              <li className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#333333]">
                <div className="flex items-center space-x-3">
                  <span title="Completed review">
                    <CheckSquare className="h-5 w-5 text-green-400" />
                  </span>
                  <div>
                    <span className="text-[var(--color-neutral-offwhite)]">DocumentManager_UI module passed Solution Architect (SA) Review</span>
                    <p className="text-sm text-[var(--color-neutral-mid)]">2025-05-05</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                  Merged
                </span>
              </li>
              <li className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#333333]">
                <div className="flex items-center space-x-3">
                  <span title="Document uploaded">
                    <FileText className="h-5 w-5 text-blue-400" />
                  </span>
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
      
      {/* Project Stats Section with Information Icons */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold text-[var(--color-neutral-offwhite)]">Project Stats</h2>
          <span title="Overview of project metrics including total modules, documents, and completed reviews for RoboCode Internal Build">
            <Info className="h-5 w-5 text-[var(--color-accent-cyan)] bg-[var(--color-card-bg)] rounded-full p-1" />
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-[#444444]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">Total Modules</h3>
                  <p className="text-3xl font-bold text-[var(--color-accent-cyan)]">1</p>
                </div>
                <span title="Development modules count">
                  <Code className="h-8 w-8 text-[var(--color-accent-cyan)]/50" />
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-[#444444]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">Documents</h3>
                  <p className="text-3xl font-bold text-[var(--color-accent-cyan)]">4</p>
                </div>
                <span title="Total documents in repository">
                  <FileText className="h-8 w-8 text-[var(--color-accent-cyan)]/50" />
                </span>
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
                <span title="Successfully completed SA reviews">
                  <CheckSquare className="h-8 w-8 text-[var(--color-accent-cyan)]/50" />
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
