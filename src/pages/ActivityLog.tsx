
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Info, FileText, Code, CheckSquare, UserCheck } from 'lucide-react';

/**
 * Activity Log Page - Future home for tracking RoboCode platform activities
 * This is a placeholder page shell for MVP, preparing for comprehensive activity tracking
 */
const ActivityLog: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header with Information Icon */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold text-[var(--color-accent-cyan)]">Activity Log</h1>
          <span title="This page will track all RoboCode platform activities including document uploads, module status changes, and review submissions">
            <Info className="h-6 w-6 text-[var(--color-accent-cyan)] bg-[var(--color-card-bg)] rounded-full p-1" />
          </span>
        </div>
        <p className="text-lg text-[var(--color-neutral-offwhite)]">
          Platform Activity Tracking & History
        </p>
      </div>
      
      {/* MVP Placeholder Content */}
      <Card className="border border-[#444444]">
        <CardContent className="p-8 text-center">
          <Clock className="h-16 w-16 text-[var(--color-accent-cyan)] mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[var(--color-neutral-offwhite)] mb-4">
            Activity Tracking Coming Soon
          </h2>
          <div className="max-w-2xl mx-auto space-y-4 text-[var(--color-neutral-light)]">
            <p>
              Future home for a comprehensive log of key activities within RoboCode platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3 p-4 bg-[#1e1e1e] rounded-lg">
                <FileText className="h-5 w-5 text-[var(--color-accent-cyan)]" />
                <span className="text-sm">Document Uploads & Updates</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#1e1e1e] rounded-lg">
                <Code className="h-5 w-5 text-[var(--color-accent-green)]" />
                <span className="text-sm">Module Development Status Changes</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#1e1e1e] rounded-lg">
                <CheckSquare className="h-5 w-5 text-[var(--color-accent-purple)]" />
                <span className="text-sm">Triage Quality Assurance (QA) Results</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#1e1e1e] rounded-lg">
                <UserCheck className="h-5 w-5 text-[var(--color-accent-orange)]" />
                <span className="text-sm">Solution Architect (SA) Review Submissions</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLog;
