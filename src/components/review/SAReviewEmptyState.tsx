
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';


const SAReviewEmptyState: React.FC = () => {
  return (
    <Card className="border border-[#444444]">
      <CardContent className="p-12 text-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CheckCircle className="h-16 w-16 text-[var(--color-accent-green)] mx-auto mb-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p>All modules reviewed</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
  );
};

export default SAReviewEmptyState;
