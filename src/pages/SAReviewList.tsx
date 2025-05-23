
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Clock, Code, User, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * SA Review List View - Shows modules pending Solution Architect review
 * This component displays a list of modules that have passed Triage QA
 * and are awaiting final SA review and approval
 */
const SAReviewList: React.FC = () => {
  // Simulated module status data for MVP
  const [pendingModules, setPendingModules] = useState([
    {
      id: 1,
      moduleName: "DocumentManager_UI_Enhancement",
      submittedBy: "Samir Sinha",
      submittedDate: "2025-05-20",
      triageQAStatus: "Pass",
      priority: "High",
      description: "Enhanced UI for document management with dark mode styling",
      branchName: "feature/doc-manager-ui",
      triageQANotes: "All basic functionality tests passed. UI follows design guidelines."
    },
    {
      id: 2,
      moduleName: "SDLC_Dashboard_Integration",
      submittedBy: "Samir Sinha",
      submittedDate: "2025-05-19",
      triageQAStatus: "Pass",
      priority: "Medium",
      description: "Interactive SDLC process flow diagram for dashboard",
      branchName: "feature/sdlc-dashboard",
      triageQANotes: "Interactive elements working correctly. Responsive design verified."
    },
    {
      id: 3,
      moduleName: "IPA_Chat_Enhancement",
      submittedBy: "Samir Sinha",
      submittedDate: "2025-05-18",
      triageQAStatus: "Conditional Pass",
      priority: "Low",
      description: "Enhanced chat interface for Intelligent Project Assistant",
      branchName: "feature/ipa-chat",
      triageQANotes: "Minor styling issues noted. Functionality is correct."
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-accent-cyan)] mb-3">SA Review Dashboard</h1>
        <p className="text-lg text-[var(--color-neutral-offwhite)]">
          Modules pending Solution Architect review and approval
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border border-[#444444]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">Pending Review</h3>
                <p className="text-2xl font-bold text-[var(--color-accent-cyan)]">{pendingModules.length}</p>
              </div>
              <Clock className="h-8 w-8 text-[var(--color-accent-cyan)]/50" />
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
              <AlertCircle className="h-8 w-8 text-red-400/50" />
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
              <CheckCircle className="h-8 w-8 text-green-400/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--color-neutral-offwhite)] mb-4">Modules Awaiting Review</h2>
        
        {pendingModules.map((module) => (
          <Card key={module.id} className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-[var(--color-neutral-offwhite)] mb-2">
                    {module.moduleName}
                  </CardTitle>
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
                      <span className="font-mono text-xs">{module.branchName}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 ml-4">
                  <Badge className={getPriorityColor(module.priority)}>
                    {module.priority} Priority
                  </Badge>
                  <div className="flex items-center gap-1">
                    {getTriageStatusIcon(module.triageQAStatus)}
                    <span className="text-sm text-[var(--color-neutral-mid)]">{module.triageQAStatus}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="bg-[#1e1e1e] rounded-lg p-3 mb-4">
                <h4 className="text-sm font-medium text-[var(--color-neutral-offwhite)] mb-1">Triage QA Notes:</h4>
                <p className="text-sm text-[var(--color-neutral-mid)]">{module.triageQANotes}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-xs text-[var(--color-neutral-mid)]">
                  Ready for Solution Architect review
                </div>
                <Link to={`/review/${module.id}`}>
                  <Button className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110">
                    Review Module
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {pendingModules.length === 0 && (
        <Card className="border border-[#444444]">
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-16 w-16 text-[var(--color-accent-green)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[var(--color-neutral-offwhite)] mb-2">
              All caught up!
            </h3>
            <p className="text-[var(--color-neutral-mid)]">
              No modules are currently pending SA review.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SAReviewList;
