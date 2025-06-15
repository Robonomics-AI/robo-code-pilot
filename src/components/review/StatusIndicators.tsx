
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

export const getAIQAStatusIcon = (status: string) => {
  const iconMap = {
    pass: <CheckCircle className="h-4 w-4 text-green-400" />,
    'conditional pass': <AlertCircle className="h-4 w-4 text-yellow-400" />,
    fail: <AlertCircle className="h-4 w-4 text-red-400" />,
  };
  const statusKey = status.toLowerCase() as keyof typeof iconMap;
  const icon = iconMap[statusKey] || <AlertCircle className="h-4 w-4 text-red-400" />;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{icon}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>AI QA Status: {status}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const getAIQAStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pass': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'conditional pass': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    default: return 'bg-red-500/20 text-red-400 border-red-500/30';
  }
};

export const getAssessmentColor = (assessment: string) => {
  if (assessment.includes('Pass - Ready')) return 'text-green-400';
  if (assessment.includes('Conditional')) return 'text-yellow-400';
  return 'text-red-400';
};

interface PriorityBadgeProps {
  priority: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => (
  <Badge className={getPriorityColor(priority)} title={`${priority} priority module`}>
    {priority} Priority
  </Badge>
);

interface AIQAStatusBadgeProps {
  status: string;
}

export const AIQAStatusBadge: React.FC<AIQAStatusBadgeProps> = ({ status }) => (
  <Badge className={getAIQAStatusColor(status)} title="AI Quality Assurance review status">
    <div className="flex items-center gap-1">
      {getAIQAStatusIcon(status)}
      <span>AI QA: {status}</span>
    </div>
  </Badge>
);
