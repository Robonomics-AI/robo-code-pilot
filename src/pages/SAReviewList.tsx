
import React, { useState, useEffect } from 'react';
import { CheckCircle, Info } from 'lucide-react';
import SAReviewSummaryCards from '@/components/review/SAReviewSummaryCards';
import SAReviewModuleCard from '@/components/review/SAReviewModuleCard';
import SAReviewEmptyState from '@/components/review/SAReviewEmptyState';

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
      <SAReviewSummaryCards modules={pendingModules} />

      {/* Enhanced modules list with AI QA integration */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-semibold text-[var(--color-neutral-offwhite)]">Modules Awaiting SA Review</h2>
          <span title="Click on any module to access the Integrated Review Environment (IRE) with comprehensive code analysis tools">
            <Info className="h-5 w-5 text-[var(--color-accent-cyan)] bg-[var(--color-card-bg)] rounded-full p-1" />
          </span>
        </div>
        
        {pendingModules.map((module) => (
          <SAReviewModuleCard key={module.id} module={module} />
        ))}
      </div>

      {/* Enhanced empty state */}
      {pendingModules.length === 0 && <SAReviewEmptyState />}
    </div>
  );
};

export default SAReviewList;
