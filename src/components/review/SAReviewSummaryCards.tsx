
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, AlertCircle, CheckCircle, Bot, FileText } from 'lucide-react';

interface Module {
  id: number;
  priority: string;
  aiQAStatus: string;
}

interface SAReviewSummaryCardsProps {
  modules: Module[];
}

const SAReviewSummaryCards: React.FC<SAReviewSummaryCardsProps> = ({ modules }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      <Card className="border border-[#444444]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">Pending Review</h3>
              <p className="text-2xl font-bold text-[var(--color-accent-cyan)]">{modules.length}</p>
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
                {modules.filter(m => m.priority === 'High').length}
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
                {modules.filter(m => m.aiQAStatus === 'Pass').length}
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
                {modules.filter(m => m.aiQAStatus).length}
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
  );
};

export default SAReviewSummaryCards;
