
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Clock, Code, User, ChevronRight, Search } from 'lucide-react';
import { PriorityBadge, AIQAStatusBadge, getAssessmentColor } from './StatusIndicators';

interface Module {
  id: number;
  moduleName: string;
  submittedBy: string;
  submittedDate: string;
  aiQAStatus: string;
  priority: string;
  description: string;
  branchName: string;
  aiQANotes: string;
  project: string;
  founderAssessment: string;
  aiReviewTimestamp: string;
}

interface SAReviewModuleCardProps {
  module: Module;
}

const SAReviewModuleCard: React.FC<SAReviewModuleCardProps> = ({ module }) => {
  return (
    <Card className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors">
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
            <PriorityBadge priority={module.priority} />
            <AIQAStatusBadge status={module.aiQAStatus} />
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
  );
};

export default SAReviewModuleCard;
