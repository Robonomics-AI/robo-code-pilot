
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, XCircle, Clock, User, GitBranch, FileText, Send } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

/**
 * SA Code Review Detail View
 * Provides comprehensive code review interface for Solution Architects
 * Includes categorized checklists and detailed assessment forms
 */

interface ChecklistItem {
  category: string;
  items: { label: string; value: string }[];
}

const CodeReview: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Form state for SA review
  const [generalFeedback, setGeneralFeedback] = useState<string>('');
  const [saDecision, setSaDecision] = useState<string>('');
  const [actionItems, setActionItems] = useState<string>('');

  // Checklist state - categorized review criteria
  const [checklistValues, setChecklistValues] = useState<{ [key: string]: string }>({});

  // Mock module data (in real implementation, this would come from API/state)
  const moduleData = {
    id: parseInt(id || '1'),
    moduleName: "DocumentManager_UI_Enhancement",
    submittedBy: "Samir Sinha",
    submittedDate: "2025-05-20",
    triageQAStatus: "Pass",
    priority: "High",
    description: "Enhanced UI for document management with dark mode styling and category filtering",
    branchName: "feature/doc-manager-ui",
    triageQANotes: "All basic functionality tests passed. UI follows design guidelines. Minor styling improvements suggested.",
    triageQADetails: {
      functionalRequirements: "✅ All user stories implemented correctly",
      designAdherence: "✅ Dark mode principles followed, consistent with branding",
      codeQuality: "✅ Clean structure, proper JSDoc comments",
      kernelCompliance: "✅ Template structure and logging conventions followed"
    }
  };

  /**
   * Categorized checklist for SA review
   */
  const reviewChecklist: ChecklistItem[] = [
    {
      category: "Functional Requirements",
      items: [
        { label: "All user stories implemented as specified", value: "functional_user_stories" },
        { label: "Interactive elements working correctly", value: "functional_interactive" },
        { label: "Error handling implemented appropriately", value: "functional_errors" },
        { label: "Console logging follows RoboCode standards", value: "functional_logging" }
      ]
    },
    {
      category: "Design & UI/UX",
      items: [
        { label: "Dark mode design principles correctly applied", value: "design_dark_mode" },
        { label: "Robonomics AI branding guidelines followed", value: "design_branding" },
        { label: "Typography hierarchy consistent", value: "design_typography" },
        { label: "Responsive design implemented", value: "design_responsive" }
      ]
    },
    {
      category: "Code Quality",
      items: [
        { label: "Code structure is clean and maintainable", value: "quality_structure" },
        { label: "JavaScript functions properly documented", value: "quality_documentation" },
        { label: "HTML is semantic and accessible", value: "quality_accessibility" },
        { label: "Performance considerations addressed", value: "quality_performance" }
      ]
    },
    {
      category: "Architecture & Standards",
      items: [
        { label: "RoboCode Internal Kernel compliance", value: "arch_kernel" },
        { label: "Git workflow and branching strategy followed", value: "arch_git" },
        { label: "Integration with existing codebase", value: "arch_integration" },
        { label: "Security considerations (if applicable)", value: "arch_security" }
      ]
    }
  ];

  /**
   * Handle checklist item change
   */
  const handleChecklistChange = (itemValue: string, status: string) => {
    setChecklistValues(prev => ({
      ...prev,
      [itemValue]: status
    }));
    console.log(`[ROBOCODE][SAReview]: Checklist updated - ${itemValue}: ${status}`);
  };

  /**
   * Get status icon for checklist items
   */
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'fail': return <XCircle className="h-4 w-4 text-red-400" />;
      case 'na': return <Clock className="h-4 w-4 text-gray-400" />;
      default: return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
    }
  };

  /**
   * Submit SA review decision
   */
  const submitSAReview = () => {
    if (!saDecision) {
      toast("Please select a review decision before submitting");
      return;
    }

    const reviewData = {
      moduleId: moduleData.id,
      moduleName: moduleData.moduleName,
      reviewedBy: "Amal David", // SA name
      reviewDate: new Date().toISOString(),
      decision: saDecision,
      generalFeedback: generalFeedback,
      actionItems: actionItems,
      checklistResults: checklistValues,
      triageQAReference: moduleData.triageQANotes
    };

    // Simulate saving to manifest
    console.log('[ROBOCODE][SAReview]: SIMULATED_SAVE: robo_module_status_manifest.json - SA_REVIEW_SUBMITTED:', JSON.stringify(reviewData, null, 2));

    toast("SA review submitted successfully!");

    // Navigate back to SA Review List
    setTimeout(() => {
      navigate('/review');
    }, 1500);
  };

  /**
   * Calculate review completion percentage
   */
  const getCompletionPercentage = (): number => {
    const totalItems = reviewChecklist.reduce((acc, category) => acc + category.items.length, 0);
    const completedItems = Object.keys(checklistValues).length;
    return Math.round((completedItems / totalItems) * 100);
  };

  useEffect(() => {
    console.log(`[ROBOCODE][SAReview]: Reviewing module ${moduleData.moduleName} (ID: ${id})`);
  }, [id]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[var(--color-neutral-mid)] mb-2">
          <Link to="/review" className="hover:text-[var(--color-accent-cyan)]">SA Review Dashboard</Link>
          <span>→</span>
          <span>Module Review</span>
        </div>
        <h1 className="text-3xl font-bold text-[var(--color-accent-cyan)] mb-3">
          SA Code Review: {moduleData.moduleName}
        </h1>
        <p className="text-lg text-[var(--color-neutral-offwhite)]">
          Solution Architect review and approval process
        </p>
      </div>

      {/* Module Information */}
      <Card className="border border-[#444444]">
        <CardHeader>
          <CardTitle className="text-[var(--color-neutral-offwhite)] flex items-center gap-2">
            <FileText className="h-5 w-5 text-[var(--color-accent-cyan)]" />
            Module Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-[var(--color-neutral-mid)]">Module Name:</span>
                <p className="text-[var(--color-neutral-offwhite)]">{moduleData.moduleName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-[var(--color-neutral-mid)]">Submitted By:</span>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-[var(--color-neutral-offwhite)]">{moduleData.submittedBy}</span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-[var(--color-neutral-mid)]">Branch:</span>
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4" />
                  <span className="text-[var(--color-neutral-offwhite)] font-mono text-sm">{moduleData.branchName}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-[var(--color-neutral-mid)]">Submission Date:</span>
                <p className="text-[var(--color-neutral-offwhite)]">{moduleData.submittedDate}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-[var(--color-neutral-mid)]">Priority:</span>
                <Badge className="bg-red-500/20 text-red-400 ml-2">{moduleData.priority}</Badge>
              </div>
              <div>
                <span className="text-sm font-medium text-[var(--color-neutral-mid)]">Triage QA Status:</span>
                <Badge className="bg-green-500/20 text-green-400 ml-2">{moduleData.triageQAStatus}</Badge>
              </div>
            </div>
          </div>
          
          <div>
            <span className="text-sm font-medium text-[var(--color-neutral-mid)]">Description:</span>
            <p className="text-[var(--color-neutral-offwhite)] mt-1">{moduleData.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Triage QA Summary */}
      <Card className="border border-[#444444]">
        <CardHeader>
          <CardTitle className="text-[var(--color-neutral-offwhite)]">Triage QA Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#333333] mb-4">
            <p className="text-sm text-[var(--color-neutral-mid)] mb-3">Initial AI Review Notes:</p>
            <p className="text-[var(--color-neutral-offwhite)] mb-4">{moduleData.triageQANotes}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {Object.entries(moduleData.triageQADetails).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-[var(--color-neutral-offwhite)]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SA Review Checklist */}
      <Card className="border border-[#444444]">
        <CardHeader>
          <CardTitle className="text-[var(--color-neutral-offwhite)] flex items-center justify-between">
            <span>SA Review Checklist</span>
            <Badge variant="outline" className="text-[var(--color-accent-cyan)]">
              {getCompletionPercentage()}% Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="space-y-2">
            {reviewChecklist.map((category, categoryIndex) => (
              <AccordionItem key={categoryIndex} value={`category-${categoryIndex}`} className="border border-[#333333] rounded-lg">
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <span className="text-[var(--color-neutral-offwhite)]">{category.category}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded border border-[#333333]">
                        <span className="text-sm text-[var(--color-neutral-offwhite)] flex-1">{item.label}</span>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(checklistValues[item.value])}
                          <Select 
                            value={checklistValues[item.value] || ''} 
                            onValueChange={(value) => handleChecklistChange(item.value, value)}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Not Checked" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pass">Pass</SelectItem>
                              <SelectItem value="fail">Fail</SelectItem>
                              <SelectItem value="na">N/A</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* SA Review Form */}
      <Card className="border border-[#444444]">
        <CardHeader>
          <CardTitle className="text-[var(--color-neutral-offwhite)]">SA Review Decision</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--color-neutral-offwhite)] mb-2">
              Overall Assessment & Feedback
            </label>
            <Textarea
              value={generalFeedback}
              onChange={(e) => setGeneralFeedback(e.target.value)}
              placeholder="Provide detailed feedback on the module quality, adherence to standards, and any observations..."
              rows={5}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-neutral-offwhite)] mb-2">
              SA Decision *
            </label>
            <Select value={saDecision} onValueChange={setSaDecision}>
              <SelectTrigger>
                <SelectValue placeholder="Select review decision" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approved">Approved - Ready for Merge</SelectItem>
                <SelectItem value="approved_with_conditions">Approved with Minor Conditions</SelectItem>
                <SelectItem value="needs_revision">Needs Revision - Return to Developer</SelectItem>
                <SelectItem value="rejected">Rejected - Significant Issues</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-neutral-offwhite)] mb-2">
              Action Items & Next Steps
            </label>
            <Textarea
              value={actionItems}
              onChange={(e) => setActionItems(e.target.value)}
              placeholder="List specific action items, conditions for approval, or next steps required..."
              rows={4}
            />
          </div>

          <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-400">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>PS Note:</strong> Remember to verify that all checklist items are completed before final approval. 
              Ensure the module aligns with RoboCode architectural standards and can be safely integrated.
            </AlertDescription>
          </Alert>

          <div className="flex justify-between items-center pt-4 border-t border-[#333333]">
            <Link to="/review">
              <Button variant="outline" className="border-[#444444]">
                Back to Review List
              </Button>
            </Link>
            
            <Button 
              onClick={submitSAReview}
              className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110"
              disabled={!saDecision}
            >
              <Send className="h-4 w-4 mr-2" />
              Submit SA Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeReview;
