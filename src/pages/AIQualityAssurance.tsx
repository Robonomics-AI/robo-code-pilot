
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Copy, Search, Bot, CheckCircle, AlertCircle, Info, FileText, Code, Brain } from 'lucide-react';

/**
 * AI Quality Assurance Module
 * Provides AI-assisted code review and quality assessment for RoboCode modules
 * Integrates with external LLMs (Google AI Studio) for comprehensive code analysis
 */
const AIQualityAssurance: React.FC = () => {
  const [reviewForm, setReviewForm] = useState({
    moduleName: '',
    projectContext: 'RoboCode Internal Build',
    githubBranch: '',
    codeOutput: '',
    aiReviewOutput: '',
    founderAssessment: ''
  });

  const [masterPrompt, setMasterPrompt] = useState('');
  const [isPromptGenerated, setIsPromptGenerated] = useState(false);

  // Enhanced master AI review prompt template
  const generateMasterPrompt = () => {
    const prompt = `# RoboCode AI Quality Assurance Review

## Project Context
- **Project:** ${reviewForm.projectContext}
- **Module:** ${reviewForm.moduleName || '[MODULE_NAME]'}
- **Branch:** ${reviewForm.githubBranch || '[BRANCH_NAME]'}

## Review Instructions
Please perform a comprehensive code review of the submitted RoboCode module, focusing on the following areas:

### 1. Code Quality & Standards
- **Kernel Adherence:** Verify compliance with RoboCode Internal Code Kernel v0.1
- **Dark Mode Consistency:** Ensure all UI components follow dark mode design principles
- **TypeScript Standards:** Check for proper typing and interface definitions
- **Code Organization:** Assess file structure and component modularity

### 2. Functional Assessment
- **Feature Completeness:** Verify all specified functionality is implemented
- **Error Handling:** Check for appropriate error handling and user feedback
- **Performance:** Assess code efficiency and potential optimization opportunities
- **Accessibility:** Verify WCAG AA compliance and proper ARIA attributes

### 3. Integration & Architecture
- **Component Integration:** Verify proper integration with existing RoboCode modules
- **State Management:** Assess data flow and state management patterns
- **API Compliance:** Check adherence to established API contracts
- **Documentation:** Verify presence of comprehensive JSDoc comments

### 4. Security & Best Practices
- **Security Practices:** Identify potential security vulnerabilities
- **Data Handling:** Verify proper data validation and sanitization
- **Authentication:** Check authentication and authorization implementation
- **Compliance:** Assess adherence to established compliance requirements

## Output Format
Please provide your review in the following format:

**SUMMARY:** [Overall assessment in 2-3 sentences]

**CRITICAL ISSUES:** [List any blocking issues that must be resolved]

**RECOMMENDATIONS:** [List improvement suggestions with priority levels]

**COMPLIANCE STATUS:** [Pass/Conditional Pass/Fail with explanation]

**DETAILED FEEDBACK:** [Section-by-section analysis]

---

## Code to Review:
[Paste the generated code output below this line]`;

    setMasterPrompt(prompt);
    setIsPromptGenerated(true);
    console.log('[ROBOCODE][AIQualityAssurance]: Master review prompt generated');
  };

  const copyPromptToClipboard = () => {
    navigator.clipboard.writeText(masterPrompt);
    console.log('[ROBOCODE][AIQualityAssurance]: Master prompt copied to clipboard');
    // In a real implementation, show a toast notification
  };

  const handleSubmitReview = () => {
    if (!reviewForm.moduleName || !reviewForm.aiReviewOutput || !reviewForm.founderAssessment) {
      alert('Please fill in all required fields before submitting.');
      return;
    }

    const reviewData = {
      ...reviewForm,
      timestamp: new Date().toISOString(),
      status: 'submitted',
      reviewId: `qa-${Date.now()}`
    };

    console.log('[ROBOCODE][AIQualityAssurance]: AI QA review submitted:', JSON.stringify(reviewData));
    
    // Simulate updating the module status manifest
    console.log('[ROBOCODE][AIQualityAssurance]: Module status update needed for SA Review queue');
    
    // Reset form after submission
    setReviewForm({
      moduleName: '',
      projectContext: 'RoboCode Internal Build',
      githubBranch: '',
      codeOutput: '',
      aiReviewOutput: '',
      founderAssessment: ''
    });
    
    alert('AI QA review submitted successfully! Module has been queued for SA Review.');
  };

  const assessmentOptions = [
    { value: 'pass', label: 'Pass - Ready for SA Review', color: 'text-green-400' },
    { value: 'conditional', label: 'Conditional Pass - Minor Issues', color: 'text-yellow-400' },
    { value: 'fail', label: 'Fail - Major Issues Identified', color: 'text-red-400' }
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <span title="AI-assisted quality assurance for comprehensive code review">
          <Search className="h-8 w-8 text-[var(--color-accent-cyan)]" />
        </span>
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-accent-cyan)]">AI Quality Assurance</h1>
          <p className="text-[var(--color-neutral-light)]">
            AI-assisted code review and quality assessment for RoboCode modules
          </p>
        </div>
      </div>

      {/* Enhanced AI QA workflow overview */}
      <Card className="robo-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl font-semibold text-[var(--color-neutral-offwhite)]">
              AI QA Workflow Overview
            </CardTitle>
            <span title="Step-by-step process for AI-assisted quality assurance">
              <Info className="h-5 w-5 text-[var(--color-accent-cyan)]" />
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 bg-[var(--color-hover-bg)] rounded-lg">
              <span title="Step 1: Generate review prompt">
                <Bot className="h-6 w-6 text-[var(--color-accent-cyan)] mt-1" />
              </span>
              <div>
                <h3 className="font-medium text-[var(--color-neutral-offwhite)] mb-1">1. Generate Prompt</h3>
                <p className="text-sm text-[var(--color-neutral-mid)]">
                  Create comprehensive review prompt with module context and quality criteria
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-[var(--color-hover-bg)] rounded-lg">
              <span title="Step 2: External AI review">
                <Brain className="h-6 w-6 text-[var(--color-accent-purple)] mt-1" />
              </span>
              <div>
                <h3 className="font-medium text-[var(--color-neutral-offwhite)] mb-1">2. AI Review</h3>
                <p className="text-sm text-[var(--color-neutral-mid)]">
                  Submit code and prompt to external AI (Google AI Studio) for analysis
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-[var(--color-hover-bg)] rounded-lg">
              <span title="Step 3: Founder assessment and submission">
                <CheckCircle className="h-6 w-6 text-[var(--color-accent-green)] mt-1" />
              </span>
              <div>
                <h3 className="font-medium text-[var(--color-neutral-offwhite)] mb-1">3. Assessment</h3>
                <p className="text-sm text-[var(--color-neutral-mid)]">
                  Review AI feedback, make assessment, and submit for SA Review
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module information form */}
      <Card className="robo-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl font-semibold text-[var(--color-neutral-offwhite)]">
              Module Information
            </CardTitle>
            <span title="Enter module details and context for AI review">
              <Info className="h-5 w-5 text-[var(--color-accent-cyan)]" />
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-neutral-offwhite)]">
                Module Name *
              </label>
              <Input
                placeholder="e.g., Enhanced_Document_Manager"
                value={reviewForm.moduleName}
                onChange={(e) => setReviewForm({...reviewForm, moduleName: e.target.value})}
                className="robo-input-field"
                title="Enter the name of the module being reviewed"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-neutral-offwhite)]">
                Project Context
              </label>
              <div className="flex items-center gap-2 p-3 bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] rounded-lg">
                <span className="text-sm text-[var(--color-accent-cyan)] font-medium">
                  {reviewForm.projectContext}
                </span>
                <Badge className="robo-badge-info">Current Project</Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-neutral-offwhite)]">
                GitHub Branch
              </label>
              <Input
                placeholder="e.g., feature/enhanced-document-manager"
                value={reviewForm.githubBranch}
                onChange={(e) => setReviewForm({...reviewForm, githubBranch: e.target.value})}
                className="robo-input-field"
                title="Specify the GitHub branch containing the code to review"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-[var(--color-neutral-offwhite)]">
                  Master AI Review Prompt
                </label>
                <span title="Generate a comprehensive prompt for external AI review that includes all quality criteria and context">
                  <Info className="h-4 w-4 text-[var(--color-accent-cyan)]" />
                </span>
              </div>
              <Button 
                onClick={generateMasterPrompt}
                className="w-full robo-button-secondary"
                disabled={!reviewForm.moduleName}
                title="Generate master prompt for AI review with current module context"
              >
                <Bot className="h-4 w-4 mr-2" />
                Generate Master Review Prompt
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Master prompt display */}
      {isPromptGenerated && (
        <Card className="robo-card border-[var(--color-accent-cyan)]/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CardTitle className="text-xl font-semibold text-[var(--color-neutral-offwhite)]">
                  Master AI Review Prompt
                </CardTitle>
                <Badge className="robo-badge-success">Generated</Badge>
              </div>
              <Button
                onClick={copyPromptToClipboard}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                title="Copy prompt to clipboard for use in Google AI Studio"
              >
                <Copy className="h-4 w-4" />
                Copy Prompt
              </Button>
            </div>
            <p className="text-sm text-[var(--color-neutral-mid)]">
              Copy this prompt and paste it into Google AI Studio along with your generated code output.
            </p>
          </CardHeader>
          <CardContent>
            <div className="bg-[#1e1e1e] border border-[var(--color-border-subtle)] rounded-lg p-4">
              <pre className="text-sm text-[var(--color-neutral-light)] whitespace-pre-wrap font-mono">
                {masterPrompt}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Code output input */}
      <Card className="robo-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl font-semibold text-[var(--color-neutral-offwhite)]">
              Generated Code Output
            </CardTitle>
            <span title="Paste the code output from your Vibe Coding session (Lovable/Replit) for AI review">
              <Info className="h-5 w-5 text-[var(--color-accent-cyan)]" />
            </span>
          </div>
          <p className="text-sm text-[var(--color-neutral-mid)]">
            Paste the complete code output from your Vibe Coding session (Lovable/Replit) below.
          </p>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste your generated code output here (HTML, CSS, JavaScript, etc.)..."
            value={reviewForm.codeOutput}
            onChange={(e) => setReviewForm({...reviewForm, codeOutput: e.target.value})}
            rows={10}
            className="robo-input-field font-mono text-sm"
          />
        </CardContent>
      </Card>

      {/* AI review output */}
      <Card className="robo-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl font-semibold text-[var(--color-neutral-offwhite)]">
              AI Review Output
            </CardTitle>
            <span title="Paste the complete response from Google AI Studio or your chosen AI assistant">
              <Info className="h-5 w-5 text-[var(--color-accent-cyan)]" />
            </span>
          </div>
          <p className="text-sm text-[var(--color-neutral-mid)]">
            Paste the complete AI review response from Google AI Studio below.
          </p>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste the AI review response here..."
            value={reviewForm.aiReviewOutput}
            onChange={(e) => setReviewForm({...reviewForm, aiReviewOutput: e.target.value})}
            rows={8}
            className="robo-input-field"
          />
        </CardContent>
      </Card>

      {/* Founder assessment */}
      <Card className="robo-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl font-semibold text-[var(--color-neutral-offwhite)]">
              Founder Assessment
            </CardTitle>
            <span title="Your assessment based on the AI review feedback and your own evaluation">
              <Info className="h-5 w-5 text-[var(--color-accent-cyan)]" />
            </span>
          </div>
          <p className="text-sm text-[var(--color-neutral-mid)]">
            Based on the AI review and your own evaluation, assess the module's readiness for SA Review.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-neutral-offwhite)]">
                Overall Assessment *
              </label>
              <Select value={reviewForm.founderAssessment} onValueChange={(value) => setReviewForm({...reviewForm, founderAssessment: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your assessment" />
                </SelectTrigger>
                <SelectContent>
                  {assessmentOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className={`flex items-center gap-2 ${option.color}`}>
                        {option.value === 'pass' && <CheckCircle className="h-4 w-4" />}
                        {option.value === 'conditional' && <AlertCircle className="h-4 w-4" />}
                        {option.value === 'fail' && <AlertCircle className="h-4 w-4" />}
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit section */}
      <Card className="robo-card border-[var(--color-accent-green)]/30">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-neutral-offwhite)] mb-1">
                Submit for SA Review
              </h3>
              <p className="text-sm text-[var(--color-neutral-mid)]">
                Submit the AI QA results to queue the module for Solution Architect review.
              </p>
            </div>
            <Button
              onClick={handleSubmitReview}
              className="robo-button-primary flex items-center gap-2"
              disabled={!reviewForm.moduleName || !reviewForm.aiReviewOutput || !reviewForm.founderAssessment}
              title="Submit AI QA review and queue module for SA Review"
            >
              <CheckCircle className="h-4 w-4" />
              Submit to SA Review Queue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIQualityAssurance;
