
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { ModuleService } from '@/utils/dataService';
import { Module } from '@/utils/types';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

interface SAReviewFormProps {
  onComplete: (success: boolean) => void;
}

const SAReviewForm: React.FC<SAReviewFormProps> = ({ onComplete }) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [decision, setDecision] = useState<'SA Approved (Ready for Dev Merge)' | 'SA Revision Requested' | ''>('');
  
  useEffect(() => {
    // Load modules that have passed triage QA
    const allModules = ModuleService.getAllModules();
    const triagePassedModules = allModules.filter(m => 
      m.status === 'TriageQAPassed' || 
      m.status === 'PendingSAReview'
    );
    setModules(triagePassedModules);
  }, []);
  
  const handleSubmitSAReview = () => {
    if (!selectedModuleId) {
      toast.error("Please select a module to review");
      return;
    }
    
    if (!feedback) {
      toast.error("Please provide feedback");
      return;
    }
    
    if (!decision) {
      toast.error("Please select your decision");
      return;
    }
    
    // Add the SA review to the module
    ModuleService.addSAReview(selectedModuleId, {
      reviewedBy: "Priya Sharma",
      reviewDate: new Date().toISOString().split('T')[0],
      feedback,
      decision
    });
    
    toast.success(`SA Review submitted for "${selectedModuleId}"`);
    onComplete(true);
    
    // Reset form
    setSelectedModuleId(null);
    setFeedback('');
    setDecision('');
    
    // Refresh modules list
    const allModules = ModuleService.getAllModules();
    const triagePassedModules = allModules.filter(m => 
      m.status === 'TriageQAPassed' || 
      m.status === 'PendingSAReview'
    );
    setModules(triagePassedModules);
  };
  
  const getModuleById = (id: string): Module | undefined => {
    return modules.find(m => m.id === id);
  };
  
  const selectedModule = selectedModuleId ? getModuleById(selectedModuleId) : null;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border border-[#444444]">
        <CardHeader>
          <CardTitle className="text-[var(--color-accent-cyan)]">Modules Pending SA Review</CardTitle>
          <CardDescription className="text-[var(--color-neutral-mid)]">
            Select a module that has passed Triage QA to review
          </CardDescription>
        </CardHeader>
        <CardContent>
          {modules.length > 0 ? (
            <div className="space-y-4">
              {modules.map((module) => (
                <div 
                  key={module.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedModuleId === module.id 
                      ? 'border-[var(--color-accent-cyan)] bg-[var(--color-accent-cyan)]/10' 
                      : 'border-[#444444] hover:border-[var(--color-accent-cyan)] bg-[#1e1e1e]'
                  }`}
                  onClick={() => setSelectedModuleId(module.id)}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-[var(--color-neutral-offwhite)]">{module.name}</h4>
                    <Badge className={`
                      ${module.status === 'TriageQAPassed' ? 'bg-green-500/20 text-green-400' : ''}
                      ${module.status === 'PendingSAReview' ? 'bg-orange-500/20 text-orange-400' : ''}
                    `}>
                      {module.status}
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm text-[var(--color-neutral-mid)]">
                    <p>Branch: <span className="font-mono bg-[#2c2c2c] px-1 rounded">feature/{module.name}</span></p>
                    <p>Updated: {module.lastUpdated} • Assigned to: {module.assignedTo || 'Unassigned'}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[var(--color-neutral-mid)]">
              <p>No modules are currently awaiting SA review.</p>
              <p className="text-sm mt-2">Modules that have passed Triage QA will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {selectedModule && (
        <Card className="border border-[#444444]">
          <CardHeader>
            <CardTitle className="text-[var(--color-accent-cyan)]">SA Review: {selectedModule.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedModule.triageQA && (
              <div>
                <h4 className="text-lg font-semibold mb-2 text-[var(--color-neutral-offwhite)]">Triage QA Summary</h4>
                <Card className="bg-[#1e1e1e] border-[#333333]">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${
                        selectedModule.triageQA.assessment === 'Pass' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {selectedModule.triageQA.assessment === 'Pass' ? (
                          <><CheckCircle className="h-3 w-3 mr-1" /> Pass</>
                        ) : (
                          <><XCircle className="h-3 w-3 mr-1" /> Fail</>
                        )}
                      </Badge>
                      <span className="text-sm text-[var(--color-neutral-mid)]">
                        Submitted by {selectedModule.triageQA.submittedBy} on {selectedModule.triageQA.submissionDate}
                      </span>
                    </div>
                    <div className="mt-2 bg-[#2c2c2c] p-3 rounded text-sm text-[var(--color-neutral-offwhite)] max-h-48 overflow-y-auto">
                      <pre className="whitespace-pre-wrap font-mono text-xs">{selectedModule.triageQA.llmOutput}</pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--color-neutral-offwhite)]">SA Feedback/Comments:</label>
              <Textarea 
                placeholder="Provide detailed feedback on the code quality, architecture alignment, etc." 
                rows={5}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--color-neutral-offwhite)]">SA Decision:</label>
              <select 
                className="flex h-10 w-full rounded-lg border border-[#777777] bg-[#383838] px-3 py-2 text-base text-[var(--color-neutral-offwhite)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-cyan)] focus:border-transparent transition-all"
                value={decision}
                onChange={(e) => setDecision(e.target.value as 'SA Approved (Ready for Dev Merge)' | 'SA Revision Requested' | '')}
              >
                <option value="">---Select---</option>
                <option value="SA Approved (Ready for Dev Merge)">SA Approved (Ready for Dev Merge)</option>
                <option value="SA Revision Requested">SA Revision Requested</option>
              </select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setSelectedModuleId(null)}
              className="border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)]"
            >
              Back
            </Button>
            <Button 
              onClick={handleSubmitSAReview}
              className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110"
            >
              Submit SA Decision
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default SAReviewForm;
