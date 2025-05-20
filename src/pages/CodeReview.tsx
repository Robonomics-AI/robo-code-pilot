
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/layout/Header';

// Mock data for demonstration
const mockModules = [
  {
    id: 1,
    moduleName: "AuthenticationUI_v0.1",
    submittedBy: "Samir Sinha",
    triageDate: "2025-05-18",
    triageStatus: "Pass",
    branchName: "feature/AuthenticationUI_v0.1"
  },
  {
    id: 2,
    moduleName: "IPA_HelpDoc_Display",
    submittedBy: "Samir Sinha",
    triageDate: "2025-05-19",
    triageStatus: "Pass",
    branchName: "feature/IPA_HelpDoc_Display"
  }
];

// Mock kernel checklist items
const kernelChecklist = [
  { id: "ui-primitives", label: "Used standard UI primitives/templates for new UI components?" },
  { id: "logging", label: "Logging conventions followed for key actions?" },
  { id: "commenting", label: "Commenting standards met for public functions?" },
  { id: "error-handling", label: "Basic error handling present for forms/inputs?" },
];

const CodeReview = () => {
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [feedback, setFeedback] = useState("");
  const [decision, setDecision] = useState("");
  const [revisionsRequired, setRevisionsRequired] = useState("");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const handleModuleSelect = (module: any) => {
    setSelectedModule(module);
    // Reset form when selecting a new module
    setFeedback("");
    setDecision("");
    setRevisionsRequired("");
    setCheckedItems({});
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [id]: checked }));
  };

  const handleSubmitReview = () => {
    if (!decision) {
      toast({
        title: "Decision required",
        description: "Please select a decision for this review.",
        variant: "destructive"
      });
      return;
    }

    if (decision === "revision" && !revisionsRequired.trim()) {
      toast({
        title: "Revision details required",
        description: "Please provide specific revisions required for the founder.",
        variant: "destructive"
      });
      return;
    }

    // In MVP, this would update a JSON file. For now, just log to console
    console.log('Submitting SA Review:', {
      moduleId: selectedModule.id,
      moduleName: selectedModule.moduleName,
      decision: decision,
      feedback: feedback,
      revisionsRequired: revisionsRequired,
      kernelChecklist: checkedItems,
      reviewDate: new Date().toISOString().split('T')[0]
    });

    toast({
      title: "Review submitted",
      description: `Your review for ${selectedModule.moduleName} has been submitted.`,
    });

    // Reset the form and selection
    setSelectedModule(null);
    setFeedback("");
    setDecision("");
    setRevisionsRequired("");
    setCheckedItems({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-neutral-offwhite)]">
      <Header />
      
      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-primary-core)] mb-2">SA Review Dashboard</h2>
            <p className="text-[var(--color-neutral-dark)]/80">
              Review and approve modules that have passed triage QA and are ready for integration.
            </p>
          </div>
          
          {!selectedModule ? (
            <div className="bg-white rounded-lg shadow-soft p-6">
              <h3 className="text-xl font-semibold text-[var(--color-primary-core)] mb-4">Modules Pending SA Review</h3>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Module Name</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Date Submitted</TableHead>
                    <TableHead>Triage QA Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockModules.map((module) => (
                    <TableRow key={module.id}>
                      <TableCell className="font-medium">{module.moduleName}</TableCell>
                      <TableCell>{module.submittedBy}</TableCell>
                      <TableCell>{module.triageDate}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {module.triageStatus}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button 
                          onClick={() => handleModuleSelect(module)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          Review <ArrowRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[var(--color-primary-core)]">
                  Review: {selectedModule.moduleName}
                </h3>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedModule(null)}
                >
                  Back to Dashboard
                </Button>
              </div>
              
              <Card className="p-6 border border-[var(--color-neutral-light)]">
                <h4 className="font-semibold text-lg mb-4">Module Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[var(--color-neutral-dark)]/60">Branch Name:</p>
                    <p className="font-mono text-sm">{selectedModule.branchName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-neutral-dark)]/60">Submitted By:</p>
                    <p>{selectedModule.submittedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-neutral-dark)]/60">Date Submitted:</p>
                    <p>{selectedModule.triageDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-neutral-dark)]/60">Triage QA Status:</p>
                    <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {selectedModule.triageStatus}
                    </p>
                  </div>
                </div>
              </Card>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="linked-documents">
                  <AccordionTrigger className="text-lg font-semibold">Linked Documentation</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 py-2">
                      <Button variant="outline" className="w-full justify-start text-left">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        PRD/Tech Spec for {selectedModule.moduleName}
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        RoboCode_Project_Context_Summary.md
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="triage-qa">
                  <AccordionTrigger className="text-lg font-semibold">Founder's Triage QA Report</AccordionTrigger>
                  <AccordionContent>
                    <div className="border rounded-md p-4 bg-[var(--color-neutral-light)]/30">
                      <p className="text-sm italic text-[var(--color-neutral-dark)]/70 mb-4">
                        External LLM review output would appear here. In the MVP, this would be pasted by Samir after running the code through Google AI Studio.
                      </p>
                      
                      <div className="p-4 border rounded-md bg-white">
                        <p className="font-medium mb-2">Mock LLM Review:</p>
                        <p className="mb-2">Overall Recommendation: <strong>OK_FOR_SA_REVIEW</strong></p>
                        <p className="text-sm">The code follows best practices and is ready for SA review...</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="git-info">
                  <AccordionTrigger className="text-lg font-semibold">Git Information</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Button className="flex items-center gap-2 bg-[#24292e] hover:bg-[#1a1e22] text-white">
                        <Github className="h-4 w-4" />
                        View Diff on GitHub: develop vs {selectedModule.branchName}
                      </Button>
                      
                      <div className="border rounded-md p-4">
                        <h5 className="font-medium mb-2">Local Review Instructions:</h5>
                        <div className="space-y-2 font-mono text-sm">
                          <p>git fetch origin</p>
                          <p>git checkout {selectedModule.branchName}</p>
                          <p>Open the modules/{selectedModule.moduleName.split("_")[0]} directory in Cursor/Windsurf</p>
                        </div>
                        <Button variant="outline" className="mt-2" size="sm">
                          Copy Local Setup Commands
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="kernel-checklist">
                  <AccordionTrigger className="text-lg font-semibold">Kernel Adherence Checklist</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {kernelChecklist.map((item) => (
                        <div className="flex items-start space-x-2" key={item.id}>
                          <Checkbox 
                            id={item.id}
                            checked={!!checkedItems[item.id]} 
                            onCheckedChange={(checked) => 
                              handleCheckboxChange(item.id, checked === true)
                            }
                          />
                          <label
                            htmlFor={item.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="focus-prompts">
                  <AccordionTrigger className="text-lg font-semibold">Specific Focus Prompts for Review</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="border rounded-md p-3 bg-[var(--color-neutral-light)]/20">
                        <p className="text-sm">For this UI module, in Cursor, ask your AI to assess the reusability of new components.</p>
                      </div>
                      <div className="border rounded-md p-3 bg-[var(--color-neutral-light)]/20">
                        <p className="text-sm">Check if state management (MVP: client-side JS variables) is overly complex or introduces global state unnecessarily.</p>
                      </div>
                      <div className="border rounded-md p-3 bg-[var(--color-neutral-light)]/20">
                        <p className="text-sm">If backend logic was added (e.g., in Replit), ask Cursor's AI to identify any hardcoded sensitive information.</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <Card className="p-6 border border-[var(--color-neutral-light)]">
                <h4 className="font-semibold text-lg mb-4">SA Review Form</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-neutral-dark)] mb-1">
                      Overall Feedback & Actionable Comments:
                    </label>
                    <Textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Provide detailed feedback on the module's implementation, architecture, and code quality..."
                      className="min-h-[150px]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-neutral-dark)] mb-1">
                      SA Decision:
                    </label>
                    <Select value={decision} onValueChange={setDecision}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a decision" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approved">Approved for Merge</SelectItem>
                        <SelectItem value="revision">Revision Requested by SA</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {decision === "revision" && (
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-neutral-dark)] mb-1">
                        Specific Revisions Required for Founder:
                      </label>
                      <Textarea
                        value={revisionsRequired}
                        onChange={(e) => setRevisionsRequired(e.target.value)}
                        placeholder="List specific revisions required before this module can be approved..."
                        className="min-h-[100px]"
                      />
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleSubmitReview}
                    className="bg-[var(--color-primary-core)] hover:bg-[#00254D]"
                  >
                    Submit SA Review
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CodeReview;
