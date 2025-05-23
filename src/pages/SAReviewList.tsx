
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Clock, Code, User, ChevronRight, AlertCircle, CheckCircle, Info, FileText } from 'lucide-react';

/**
 * SA Review List View - Shows modules pending Solution Architect review
 * This component displays a list of modules that have passed Triage QA
 * and are awaiting final SA review and approval
 */
const SAReviewList: React.FC = () => {
  // Enhanced module status data for MVP with multi-project context
  const [pendingModules, setPendingModules] = useState([
    {
      id: 1,
      moduleName: "DocumentManager_UI_Enhancement",
      submittedBy: "Samir Sinha",
      submittedDate: "2025-05-20",
      triageQAStatus: "Pass",
      priority: "High",
      description: "Enhanced User Interface (UI) for document management with dark mode styling and expanded category support",
      branchName: "feature/doc-manager-ui",
      triageQANotes: "All basic functionality tests passed. UI follows design guidelines. Multi-project context implemented.",
      project: "RoboCode Internal Build"
    },
    {
      id: 2,
      moduleName: "SDLC_Dashboard_Integration",
      submittedBy: "Samir Sinha",
      submittedDate: "2025-05-19",
      triageQAStatus: "Pass",
      priority: "Medium",
      description: "Interactive Software Development Lifecycle (SDLC) process flow diagram for dashboard with enhanced tooltips",
      branchName: "feature/sdlc-dashboard",
      triageQANotes: "Interactive elements working correctly. Responsive design verified. Accessibility improvements implemented.",
      project: "RoboCode Internal Build"
    },
    {
      id: 3,
      moduleName: "IPA_Chat_Enhancement",
      submittedBy: "Samir Sinha",
      submittedDate: "2025-05-18",
      triageQAStatus: "Conditional Pass",
      priority: "Low",
      description: "Enhanced chat interface for Intelligent Project Assistant (IPA) with improved keyword matching",
      branchName: "feature/ipa-chat",
      triageQANotes: "Minor styling issues noted in chat bubble alignment. Functionality is correct. Keyword matching improved.",
      project: "RoboCode Internal Build"
    },
    {
      id: 4,
      moduleName: "Multi_Project_Context_Support",
      submittedBy: "Samir Sinha",
      submittedDate: "2025-05-17",
      triageQAStatus: "Pass",
      priority: "High",
      description: "Implementation of multi-project context display and preparation for project switching functionality",
      branchName: "feature/multi-project-context",
      triageQANotes: "Multi-project context properly displayed across all modules. Future project switching architecture prepared.",
      project: "RoboCode Internal Build"
    }
  ]);

  useEffect(() => {
    // Log component initialization for debugging
    console.log('[ROBOCODE][SAReviewList]: Component initialized with modules:', pendingModules);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTriageStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'conditional pass': return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      default: return <AlertCircle className="h-4 w-4 text-red-400" />;
    }
  };

  const getTriageStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pass': return 'bg-green-500/20 text-green-400';
      case 'conditional pass': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-red-500/20 text-red-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header with Information Icon */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold text-[var(--color-accent-cyan)]">SA Review Dashboard</h1>
          <Info className="h-6 w-6 text-[var(--color-accent-cyan)] bg-[var(--color-card-bg)] rounded-full p-1" title="Solution Architect review dashboard showing modules pending final validation and approval" />
        </div>
        <p className="text-lg text-[var(--color-neutral-offwhite)]">
          Modules pending Solution Architect (SA) review and approval
        </p>
      </div>

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border border-[#444444]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">Pending Review</h3>
                <p className="text-2xl font-bold text-[var(--color-accent-cyan)]">{pendingModules.length}</p>
              </div>
              <Clock className="h-8 w-8 text-[var(--color-accent-cyan)]/50" title="Total modules awaiting review" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-[#444444]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">High Priority</h3>
                <p className="text-2xl font-bold text-red-400">
                  {pendingModules.filter(m => m.priority === 'High').length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-400/50" title="High priority modules requiring immediate attention" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-[#444444]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">Passed Triage</h3>
                <p className="text-2xl font-bold text-green-400">
                  {pendingModules.filter(m => m.triageQAStatus === 'Pass').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400/50" title="Modules that passed Triage QA review" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#444444]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">Projects</h3>
                <p className="text-2xl font-bold text-[var(--color-accent-purple)]">1</p>
              </div>
              <FileText className="h-8 w-8 text-[var(--color-accent-purple)]/50" title="Active projects with pending reviews" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Modules List */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-semibold text-[var(--color-neutral-offwhite)]">Modules Awaiting Review</h2>
          <Info className="h-5 w-5 text-[var(--color-accent-cyan)] bg-[var(--color-card-bg)] rounded-full p-1" title="Click on any module to access detailed review interface with checklists and approval controls" />
        </div>
        
        {pendingModules.map((module) => (
          <Card key={module.id} className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-lg text-[var(--color-neutral-offwhite)]">
                      {module.moduleName}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {module.project}
                    </Badge>
                  </div>
                  <p className="text-sm text-[var(--color-neutral-mid)] mb-3">
                    {module.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-[var(--color-neutral-mid)]">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{module.submittedBy}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{module.submittedDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Code className="h-4 w-4" />
                      <span className="font-mono text-xs" title="Git branch name">{module.branchName}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 ml-4">
                  <Badge className={getPriorityColor(module.priority)} title={`${module.priority} priority module`}>
                    {module.priority} Priority
                  </Badge>
                  <Badge className={getTriageStatusColor(module.triageQAStatus)} title="Triage QA review status">
                    <div className="flex items-center gap-1">
                      {getTriageStatusIcon(module.triageQAStatus)}
                      <span>{module.triageQAStatus}</span>
                    </div>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="bg-[#1e1e1e] rounded-lg p-3 mb-4">
                <h4 className="text-sm font-medium text-[var(--color-neutral-offwhite)] mb-1 flex items-center gap-2">
                  Triage Quality Assurance (QA) Notes:
                  <Info className="h-3 w-3 text-[var(--color-accent-cyan)]" title="Detailed notes from the AI-assisted Triage QA review process" />
                </h4>
                <p className="text-sm text-[var(--color-neutral-mid)]">{module.triageQANotes}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-xs text-[var(--color-neutral-mid)]">
                  Ready for Solution Architect (SA) review and final approval
                </div>
                <Link to={`/review/${module.id}`}>
                  <Button className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110" title="Access detailed review interface for this module">
                    Review Module
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Empty State */}
      {pendingModules.length === 0 && (
        <Card className="border border-[#444444]">
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-16 w-16 text-[var(--color-accent-green)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[var(--color-neutral-offwhite)] mb-2">
              All caught up!
            </h3>
            <p className="text-[var(--color-neutral-mid)] mb-4">
              No modules are currently pending Solution Architect (SA) review. All submitted modules have been processed.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild variant="outline" title="Go to development environment setup">
                <Link to="/develop">Start New Module</Link>
              </Button>
              <Button asChild className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)]" title="View project dashboard">
                <Link to="/">View Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SAReviewList;
