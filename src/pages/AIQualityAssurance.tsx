
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Copy, Search, Bot, CheckCircle, AlertCircle, Info, FileText, Code, Brain, ChevronRight, ClipboardCopy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * AI Quality Assurance Module - Guided Wizard Interface
 * 4-step process for AI-assisted code review before SA Review
 */
const AIQualityAssurance: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    project: 'RoboCode Internal Build',
    moduleName: '',
    githubBranch: '',
    vibeCodeOutput: '',
    aiReviewOutput: '',
    triageStatus: '',
    justificationNotes: ''
  });

  const [masterPrompt, setMasterPrompt] = useState('');

  const steps = [
    { number: 1, title: 'Module Context', icon: Info },
    { number: 2, title: 'Code Submission', icon: Code },
    { number: 3, title: 'AI Review', icon: Brain },
    { number: 4, title: 'Final Assessment', icon: CheckCircle }
  ];

  const generateMasterPrompt = () => {
    const prompt = `# RoboCode AI Quality Assurance Review

## Project Context
- **Project:** ${formData.project}
- **Module:** ${formData.moduleName || '[MODULE_NAME]'}
- **Branch:** ${formData.githubBranch || '[BRANCH_NAME]'}

## Review Instructions
Please perform a comprehensive code review focusing on:

### 1. Code Quality & Standards
- RoboCode Internal Code Kernel v0.1 compliance
- Dark mode design consistency
- TypeScript standards and proper typing
- Component modularity and organization

### 2. Functional Assessment
- Feature completeness verification
- Error handling and user feedback
- Performance considerations
- WCAG AA accessibility compliance

### 3. Integration & Architecture
- Component integration with existing modules
- State management patterns
- API contract adherence
- Documentation quality (JSDoc comments)

### 4. Security & Best Practices
- Security vulnerability assessment
- Data validation and sanitization
- Authentication/authorization patterns
- Compliance requirements adherence

## Output Format
**SUMMARY:** [2-3 sentence overall assessment]

**CRITICAL ISSUES:** [Blocking issues requiring resolution]

**RECOMMENDATIONS:** [Improvement suggestions with priority]

**COMPLIANCE STATUS:** [Pass/Conditional Pass/Fail with explanation]

**DETAILED FEEDBACK:** [Section-by-section analysis]

---

## Code to Review:
[Paste the generated code below this line]`;

    setMasterPrompt(prompt);
  };

  const copyPromptToClipboard = () => {
    navigator.clipboard.writeText(masterPrompt);
    console.log('[ROBOCODE][AIQualityAssurance]: Master prompt copied to clipboard');
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.moduleName && formData.githubBranch;
      case 2:
        return formData.vibeCodeOutput;
      case 3:
        return formData.aiReviewOutput;
      case 4:
        return formData.triageStatus && formData.justificationNotes;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 4 && canProceedToNext()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitForReview = () => {
    const submissionData = {
      ...formData,
      timestamp: new Date().toISOString(),
      reviewId: `qa-${Date.now()}`
    };

    console.log('[ROBOCODE][AIQualityAssurance]: Submitting for SA Review:', JSON.stringify(submissionData));
    
    // Navigate to SA Review with the new submission
    navigate(`/review/${submissionData.reviewId}`);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <Search className="h-8 w-8 text-[#00AEEF]" />
        <div>
          <h1 className="text-3xl font-bold text-[#00AEEF]">AI Quality Assurance</h1>
          <p className="text-[#E0E0E0]">
            Guided wizard for AI-assisted code review before SA Review
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <Card className="bg-[#2C2C2C] border border-[#777777]">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number 
                      ? 'bg-[#00AEEF] border-[#00AEEF] text-white' 
                      : 'border-[#777777] text-[#AAAAAA]'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="hidden md:block">
                    <div className={`font-medium ${
                      currentStep >= step.number ? 'text-[#FAFAFA]' : 'text-[#AAAAAA]'
                    }`}>
                      Step {step.number}
                    </div>
                    <div className={`text-sm ${
                      currentStep >= step.number ? 'text-[#E0E0E0]' : 'text-[#AAAAAA]'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-[#00AEEF]' : 'bg-[#777777]'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {currentStep === 1 && (
        <Card className="bg-[#2C2C2C] border border-[#777777]">
          <CardHeader>
            <CardTitle className="text-xl text-[#FAFAFA] flex items-center gap-2">
              <Info className="h-5 w-5 text-[#00AEEF]" />
              Module Context
            </CardTitle>
            <p className="text-[#AAAAAA]">
              Provide basic information about the module you're submitting for review.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#FAFAFA]">Project</label>
              <div className="flex items-center gap-2 p-3 bg-[#383838] border border-[#777777] rounded-lg">
                <span className="text-sm text-[#00AEEF] font-medium">{formData.project}</span>
                <Badge className="bg-[#00AEEF]/20 text-[#00AEEF] border-[#00AEEF]/30">Current Project</Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#FAFAFA]">Module Name *</label>
              <Input
                placeholder="e.g., Enhanced_Document_Manager_v0.2"
                value={formData.moduleName}
                onChange={(e) => updateFormData('moduleName', e.target.value)}
                className="bg-[#383838] border-[#777777] text-[#FAFAFA] focus:border-[#00AEEF]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#FAFAFA]">GitHub Branch *</label>
              <Input
                placeholder="e.g., feature/enhanced-document-manager"
                value={formData.githubBranch}
                onChange={(e) => updateFormData('githubBranch', e.target.value)}
                className="bg-[#383838] border-[#777777] text-[#FAFAFA] focus:border-[#00AEEF]"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card className="bg-[#2C2C2C] border border-[#777777]">
          <CardHeader>
            <CardTitle className="text-xl text-[#FAFAFA] flex items-center gap-2">
              <Code className="h-5 w-5 text-[#00AEEF]" />
              Vibe Code Submission for AI Review
            </CardTitle>
            <p className="text-[#AAAAAA]">
              Paste the complete output from your Vibe Coding session (Lovable/Replit).
            </p>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste your complete Vibe Coded output here (HTML, CSS, JavaScript, etc.)..."
              value={formData.vibeCodeOutput}
              onChange={(e) => updateFormData('vibeCodeOutput', e.target.value)}
              rows={12}
              className="bg-[#383838] border-[#777777] text-[#FAFAFA] focus:border-[#00AEEF] font-mono text-sm"
            />
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <Card className="bg-[#2C2C2C] border border-[#777777]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-[#FAFAFA] flex items-center gap-2">
                    <Brain className="h-5 w-5 text-[#00AEEF]" />
                    Get External LLM Review
                  </CardTitle>
                  <p className="text-[#AAAAAA] mt-1">
                    Generate and use the master prompt with Google AI Studio or your preferred LLM.
                  </p>
                </div>
                <Button
                  onClick={generateMasterPrompt}
                  className="bg-[#6A0DAD] hover:bg-[#6A0DAD]/80 text-white"
                  disabled={!formData.moduleName}
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Generate Prompt
                </Button>
              </div>
            </CardHeader>
            {masterPrompt && (
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-[#FAFAFA]">Master AI Review Prompt</h4>
                    <Button
                      onClick={copyPromptToClipboard}
                      variant="outline"
                      size="sm"
                      className="border-[#00AEEF] text-[#00AEEF] hover:bg-[#00AEEF]/10"
                    >
                      <ClipboardCopy className="h-4 w-4 mr-2" />
                      Copy Prompt
                    </Button>
                  </div>
                  <div className="bg-[#1e1e1e] border border-[#777777] rounded-lg p-4 max-h-64 overflow-y-auto">
                    <pre className="text-sm text-[#E0E0E0] whitespace-pre-wrap font-mono">
                      {masterPrompt}
                    </pre>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          <Card className="bg-[#2C2C2C] border border-[#777777]">
            <CardHeader>
              <CardTitle className="text-lg text-[#FAFAFA]">AI Review Output</CardTitle>
              <p className="text-[#AAAAAA]">
                Paste the complete response from your external LLM here.
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste the AI review response here..."
                value={formData.aiReviewOutput}
                onChange={(e) => updateFormData('aiReviewOutput', e.target.value)}
                rows={8}
                className="bg-[#383838] border-[#777777] text-[#FAFAFA] focus:border-[#00AEEF]"
              />
            </CardContent>
          </Card>
        </div>
      )}

      {currentStep === 4 && (
        <Card className="bg-[#2C2C2C] border border-[#777777]">
          <CardHeader>
            <CardTitle className="text-xl text-[#FAFAFA] flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#00AEEF]" />
              Founder's Final Assessment
            </CardTitle>
            <p className="text-[#AAAAAA]">
              Based on the AI review, make your assessment of the module's readiness.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#FAFAFA]">Triage QA Status *</label>
              <Select value={formData.triageStatus} onValueChange={(value) => updateFormData('triageStatus', value)}>
                <SelectTrigger className="bg-[#383838] border-[#777777] text-[#FAFAFA]">
                  <SelectValue placeholder="Select assessment result" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pass">
                    <div className="flex items-center gap-2 text-[#28A745]">
                      <CheckCircle className="h-4 w-4" />
                      Pass - Ready for SA Review
                    </div>
                  </SelectItem>
                  <SelectItem value="fail">
                    <div className="flex items-center gap-2 text-[#FF0000]">
                      <AlertCircle className="h-4 w-4" />
                      Fail - Needs Revision
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#FAFAFA]">Brief Justification/Notes *</label>
              <Textarea
                placeholder="Explain your assessment decision and any key points for the SA to consider..."
                value={formData.justificationNotes}
                onChange={(e) => updateFormData('justificationNotes', e.target.value)}
                rows={4}
                className="bg-[#383838] border-[#777777] text-[#FAFAFA] focus:border-[#00AEEF]"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          variant="outline"
          className="border-[#777777] text-[#AAAAAA] hover:bg-[#383838]"
        >
          Previous
        </Button>
        
        <div className="text-sm text-[#AAAAAA]">
          Step {currentStep} of {steps.length}
        </div>
        
        {currentStep < 4 ? (
          <Button
            onClick={handleNext}
            disabled={!canProceedToNext()}
            className="bg-[#00AEEF] hover:bg-[#00AEEF]/80 text-white"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmitForReview}
            disabled={!canProceedToNext()}
            className="bg-[#28A745] hover:bg-[#28A745]/80 text-white"
          >
            <FileText className="h-4 w-4 mr-2" />
            Submit for SA Review
          </Button>
        )}
      </div>
    </div>
  );
};

export default AIQualityAssurance;
