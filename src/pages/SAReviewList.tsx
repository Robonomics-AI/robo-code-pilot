
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Clock, Code, User, ChevronRight, AlertCircle, CheckCircle, Info, FileText, Search, Bot } from 'lucide-react';

/**
 * Enhanced SA Review List View - Shows modules pending Solution Architect review
 * This component displays a list of modules that have passed AI QA
 * and are awaiting final SA review and approval with IRE integration
 */
const SAReviewList: React.FC = () => {
  // Enhanced module status data with AI QA integration
  const [pendingModules, setPendingModules] = useState([
    {
      id: 1,
      moduleName: "DocumentManager_UI_Enhancement",
      submittedBy: "Samir Sinha",
      submittedDate: "2025-05-20",
      aiQAStatus: "Pass",
      priority: "High",
      description: "Enhanced User Interface (UI) for document management with dark mode styling, status indicators, and improved categorization",
      branchName: "feature/doc-manager-ui",
      aiQANotes: "AI review completed successfully. All functionality tests passed. UI follows design guidelines. Multi-project context implemented properly.",
      project: "RoboCode Internal Build",
      founderAssessment: "Pass - Ready for SA Review",
      aiReviewTimestamp: "2025-05-20T14:30:00Z"
    },
    {
      id: 2,
      moduleName: "SDLC_Dashboard_Integration",
      submittedBy: "Samir Sinha",
      submittedDate: "2025-05-19",
      aiQAStatus: "Pass",
      priority: "Medium",
      description: "Interactive Software Development Lifecycle (SDLC) process flow diagram with enhanced stage grouping and navigation",
      branchName: "feature/sdlc-dashboard",
      aiQANotes: "Interactive elements working correctly. Responsive design verified. Accessibility improvements implemented. Stage grouping enhances workflow clarity.",
      project: "RoboCode Internal Build",
      founderAssessment: "Pass - Ready for SA Review",
      aiReviewTimestamp: "2025-05-19T16:45:00Z"
    },
    {
      id: 3,
      moduleName: "AI_QA_Module_Implementation",
      submittedBy: "Samir Sinha",
      submittedDate: "2025-05-20",
      aiQAStatus: "Conditional Pass",
      priority: "High",
      description: "New AI Quality Assurance module with external LLM integration and comprehensive review workflow",
      branchName: "feature/ai-qa-module",
      aiQANotes: "Core functionality implemented correctly. Minor improvements suggested for error handling and user feedback. Form validation working properly.",
      project: "RoboCode Internal Build",
      founderAssessment: "Conditional Pass - Minor Issues",
      aiReviewTimestamp: "2025-05-20T11:15:00Z"
    },
    {
      id: 4,
      moduleName: "Global_Navigation_Enhancement",
      submittedBy: "Samir Sinha",
      submittedDate: "2025-05-20",
      aiQAStatus: "Pass",
      priority: "High",
      description: "Enhanced global navigation with collapsible sidebar, improved document categorization, and Google AI Studio inspired design",
      branchName: "feature/global-navigation",
      aiQANotes: "Navigation structure excellent. Responsive behavior verified. Document categorization logic working correctly. Accessibility compliance confirmed.",
      project: "RoboCode Internal Build",
      founderAssessment: "Pass - Ready for SA Review",
      aiReviewTimestamp: "2025-05-20T09:30:00Z"
    }
  ]);

  useEffect(() => {
    // Log component initialization for debugging
    console.log('[ROBOCODE][SAReviewList]: Component initialized with modules:', pendingModules);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getAIQAStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'conditional pass': return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      default: return <AlertCircle className="h-4 w-4 text-red-400" />;
    }
  };

  const getAIQAStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pass': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'conditional pass': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const getAssessmentColor = (assessment: string) => {
    if (assessment.includes('Pass - Ready')) return 'text-green-400';
    if (assessment.includes('Conditional')) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Enhanced page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span title="Solution Architect review dashboard with Integrated Review Environment (IRE) access">
            <CheckCircle className="h-8 w-8 text-[var(--color-accent-cyan)]" />
          </span>
          <h1 className="text-3xl font-bold text-[var(--color-accent-cyan)]">SA Review Dashboard</h1>
          <span title="Enhanced with IRE (Integrated Review Environment) for comprehensive code analysis">
            <Info className="h-6 w-6 text-[var(--color-accent-cyan)] bg-[var(--color-card-bg)] rounded-full p-1" />
          </span>
        </div>
        <p className="text-lg text-[var(--color-neutral-offwhite)]">
          Modules that have passed AI Quality Assurance and are awaiting Solution Architect review and approval
        </p>
      </div>

      {/* Enhanced summary cards with AI QA integration */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card className="border border-[#444444]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">Pending Review</h3>
                <p className="text-2xl font-bold text-[var(--color-accent-cyan)]">{pendingModules.length}</p>
              </div>
              <span title="Total modules awaiting SA review">
                <Clock className="h-8 w-8 text-[var(--color-accent-cyan)]/50" />
              </span>
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
              <span title="High priority modules requiring immediate attention">
                <AlertCircle className="h-8 w-8 text-red-400/50" />
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-[#444444]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">AI QA Passed</h3>
                <p className="text-2xl font-bold text-green-400">
                  {pendingModules.filter(m => m.aiQAStatus === 'Pass').length}
                </p>
              </div>
              <span title="Modules that passed AI Quality Assurance review">
                <CheckCircle className="h-8 w-8 text-green-400/50" />
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#444444]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">AI QA Reviewed</h3>
                <p className="text-2xl font-bold text-[var(--color-accent-purple)]">
                  {pendingModules.filter(m => m.aiQAStatus).length}
                </p>
              </div>
              <span title="Modules that have completed AI Quality Assurance">
                <Bot className="h-8 w-8 text-[var(--color-accent-purple)]/50" />
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#444444]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">Projects</h3>
                <p className="text-2xl font-bold text-[var(--color-accent-orange)]">1</p>
              </div>
              <span title="Active projects with pending reviews">
                <FileText className="h-8 w-8 text-[var(--color-accent-orange)]/50" />
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced modules list with AI QA integration */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-semibold text-[var(--color-neutral-offwhite)]">Modules Awaiting SA Review</h2>
          <span title="Click on any module to access the Integrated Review Environment (IRE) with comprehensive code analysis tools">
            <Info className="h-5 w-5 text-[var(--color-accent-cyan)] bg-[var(--color-card-bg)] rounded-full p-1" />
          </span>
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
                      <span title="Module submitted by">
                        <User className="h-4 w-4" />
                      </span>
                      <span>{module.submittedBy}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span title="Submission date">
                        <Clock className="h-4 w-4" />
                      </span>
                      <span>{module.submittedDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span title="Git branch name">
                        <Code className="h-4 w-4" />
                      </span>
                      <span className="font-mono text-xs">{module.branchName}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 ml-4">
                  <Badge className={getPriorityColor(module.priority)} title={`${module.priority} priority module`}>
                    {module.priority} Priority
                  </Badge>
                  <Badge className={getAIQAStatusColor(module.aiQAStatus)} title="AI Quality Assurance review status">
                    <div className="flex items-center gap-1">
                      {getAIQAStatusIcon(module.aiQAStatus)}
                      <span>AI QA: {module.aiQAStatus}</span>
                    </div>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="bg-[#1e1e1e] rounded-lg p-3 mb-4">
                <h4 className="text-sm font-medium text-[var(--color-neutral-offwhite)] mb-1 flex items-center gap-2">
                  <span title="AI-assisted quality assurance review results">
                    <Search className="h-4 w-4 text-[var(--color-accent-cyan)]" />
                  </span>
                  AI Quality Assurance Review:
                </h4>
                <p className="text-sm text-[var(--color-neutral-mid)] mb-2">{module.aiQANotes}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-medium ${getAssessmentColor(module.founderAssessment)}`}>
                    Founder Assessment: {module.founderAssessment}
                  </span>
                  <span className="text-[var(--color-neutral-mid)]">
                    Reviewed: {new Date(module.aiReviewTimestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-xs text-[var(--color-neutral-mid)]">
                  Ready for Solution Architect review using Integrated Review Environment (IRE)
                </div>
                <Link to={`/review/${module.id}`}>
                  <Button className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110 flex items-center gap-2" title="Access IRE for comprehensive module review">
                    <Code className="h-4 w-4" />
                    Open in IRE
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced empty state */}
      {pendingModules.length === 0 && (
        <Card className="border border-[#444444]">
          <CardContent className="p-12 text-center">
            <span title="All modules reviewed">
              <CheckCircle className="h-16 w-16 text-[var(--color-accent-green)] mx-auto mb-4" />
            </span>
            <h3 className="text-lg font-semibold text-[var(--color-neutral-offwhite)] mb-2">
              All caught up!
            </h3>
            <p className="text-[var(--color-neutral-mid)] mb-4">
              No modules are currently pending Solution Architect review. All submitted modules have been processed through the AI QA workflow.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild variant="outline" title="Go to development environment setup">
                <Link to="/develop">Start New Module</Link>
              </Button>
              <Button asChild variant="outline" title="Go to AI Quality Assurance">
                <Link to="/ai-qa">AI QA Review</Link>
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
