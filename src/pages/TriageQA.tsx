
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, CheckCircle, Send, AlertTriangle, Bot, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

/**
 * Triage QA Module - AI-assisted code review and quality assessment
 * Provides interface for LLM-based code review using external AI tools
 */
const TriageQA: React.FC = () => {
  const navigate = useNavigate();
  const [moduleName, setModuleName] = useState<string>('');
  const [isFormLoaded, setIsFormLoaded] = useState<boolean>(false);
  const [llmOutput, setLlmOutput] = useState<string>('');
  const [qaAssessment, setQaAssessment] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  // Master prompt for SA-defined review process
  const masterReviewPrompt = `You are an expert code reviewer for the RoboCode platform. Please review the submitted module code against the following criteria:

**FUNCTIONAL REQUIREMENTS:**
1. Does the code implement the specified user story requirements?
2. Are all interactive elements working as expected?
3. Is error handling implemented appropriately?
4. Are console.log statements following the [ROBOCODE][ModuleName] format?

**DESIGN ADHERENCE:**
1. Does the UI follow RoboCode Dark Mode Design Principles?
2. Are the correct CSS classes from robo_styles.css being used?
3. Is the typography hierarchy consistent with guidelines?
4. Are color variables and branding elements correctly applied?

**CODE QUALITY:**
1. Is the code structure clean and maintainable?
2. Are JavaScript functions properly documented with JSDoc?
3. Is the HTML semantic and accessible?
4. Are there any performance concerns or optimization opportunities?

**KERNEL COMPLIANCE:**
1. Is the robo_page_template.html structure being followed?
2. Are logging conventions being adhered to?
3. Is commenting meeting the established standards?

Please provide a detailed assessment with specific feedback for each category. Conclude with a PASS/FAIL recommendation and specific action items if improvements are needed.

**MODULE TO REVIEW:**
[Paste your module code, HTML, CSS, and JavaScript here]`;

  /**
   * Load the triage form for a specific module
   */
  const loadTriageForm = () => {
    if (!moduleName.trim()) {
      toast("Please enter a module name first");
      return;
    }

    setIsFormLoaded(true);
    console.log(`[ROBOCODE][TriageQA]: Loading triage form for module: ${moduleName}`);
    toast("Triage QA form loaded successfully!");
  };

  /**
   * Copy the master review prompt to clipboard
   */
  const copyReviewPrompt = async () => {
    try {
      await navigator.clipboard.writeText(masterReviewPrompt);
      toast("Review prompt copied to clipboard! Paste it into Google AI Studio.");
      console.log('[ROBOCODE][TriageQA]: Master review prompt copied to clipboard');
    } catch (err) {
      console.error('[ROBOCODE][TriageQA]: Failed to copy prompt:', err);
      toast("Failed to copy prompt");
    }
  };

  /**
   * Submit triage QA results
   */
  const submitTriageResults = () => {
    if (!llmOutput.trim() || !qaAssessment) {
      toast("Please fill in LLM output and assessment before submitting");
      return;
    }

    const triageData = {
      moduleName: moduleName,
      submittedBy: "Samir Sinha",
      submissionDate: new Date().toISOString(),
      llmReviewOutput: llmOutput,
      qaAssessment: qaAssessment,
      additionalNotes: additionalNotes,
      status: qaAssessment === 'pass' ? 'passed_triage' : 'needs_revision'
    };

    // Simulate saving to manifest
    console.log('[ROBOCODE][TriageQA]: SIMULATED_SAVE: robo_module_status_manifest.json - TRIAGE_QA_SUBMITTED:', JSON.stringify(triageData, null, 2));

    toast("Triage QA results submitted successfully!");

    // Navigate to dashboard after brief delay
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-accent-cyan)] mb-3">Triage QA Module</h1>
        <p className="text-lg text-[var(--color-neutral-offwhite)]">
          AI-assisted code review and quality assessment for RoboCode modules
        </p>
      </div>

      {/* Module Selection */}
      <Card className="border border-[#444444]">
        <CardHeader>
          <CardTitle className="text-[var(--color-neutral-offwhite)] flex items-center gap-2">
            <Bot className="h-5 w-5 text-[var(--color-accent-purple)]" />
            Module Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="moduleInput" className="block text-sm font-medium text-[var(--color-neutral-offwhite)] mb-2">
              Module Name for Review *
            </label>
            <Input
              id="moduleInput"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              placeholder="e.g., DocumentManager_UI_Enhancement"
              disabled={isFormLoaded}
              className="mb-4"
            />
          </div>
          
          <Button 
            onClick={loadTriageForm}
            disabled={isFormLoaded || !moduleName.trim()}
            className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110"
          >
            Load Triage QA Form
          </Button>
        </CardContent>
      </Card>

      {/* Triage QA Form */}
      {isFormLoaded && (
        <>
          {/* AI Review Instructions */}
          <Card className="border border-[#444444]">
            <CardHeader>
              <CardTitle className="text-[var(--color-neutral-offwhite)] flex items-center gap-2">
                <User className="h-5 w-5 text-[var(--color-accent-cyan)]" />
                AI Review Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Instructions:</strong> Copy the review prompt below, paste it into Google AI Studio with your module code, 
                  then paste the AI response back into this form.
                </AlertDescription>
              </Alert>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-[var(--color-neutral-offwhite)]">
                    Master Review Prompt (Copy to Google AI Studio)
                  </h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyReviewPrompt}
                    className="border-[#444444]"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Prompt
                  </Button>
                </div>
                
                <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#333333] max-h-64 overflow-y-auto">
                  <pre className="text-xs text-[var(--color-neutral-mid)] whitespace-pre-wrap font-mono">
                    {masterReviewPrompt}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LLM Response Form */}
          <Card className="border border-[#444444]">
            <CardHeader>
              <CardTitle className="text-[var(--color-neutral-offwhite)] flex items-center gap-2">
                <Bot className="h-5 w-5 text-[var(--color-accent-green)]" />
                AI Review Results for: {moduleName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="llmOutput" className="block text-sm font-medium text-[var(--color-neutral-offwhite)] mb-2">
                  LLM Review Output *
                </label>
                <Textarea
                  id="llmOutput"
                  value={llmOutput}
                  onChange={(e) => setLlmOutput(e.target.value)}
                  placeholder="Paste the complete response from Google AI Studio here..."
                  rows={12}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-[var(--color-neutral-mid)] mt-2">
                  Paste the complete AI analysis including all assessment categories and recommendations
                </p>
              </div>

              <div>
                <label htmlFor="qaAssessment" className="block text-sm font-medium text-[var(--color-neutral-offwhite)] mb-2">
                  Triage QA Assessment *
                </label>
                <Select value={qaAssessment} onValueChange={setQaAssessment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assessment result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pass">Pass - Ready for SA Review</SelectItem>
                    <SelectItem value="conditional_pass">Conditional Pass - Minor Issues</SelectItem>
                    <SelectItem value="fail">Fail - Needs Significant Revision</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="additionalNotes" className="block text-sm font-medium text-[var(--color-neutral-offwhite)] mb-2">
                  Additional Notes (Optional)
                </label>
                <Textarea
                  id="additionalNotes"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Any additional observations or action items..."
                  rows={4}
                />
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#333333]">
                <Link to="/develop">
                  <Button variant="outline" className="border-[#444444]">
                    Back to Development
                  </Button>
                </Link>
                
                <Button 
                  onClick={submitTriageResults}
                  className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110"
                  disabled={!llmOutput.trim() || !qaAssessment}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Triage QA Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Guidelines */}
      <Card className="border border-[#444444]">
        <CardHeader>
          <CardTitle className="text-[var(--color-neutral-offwhite)]">
            Triage QA Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-[var(--color-neutral-offwhite)] mb-3">Review Criteria</h4>
              <ul className="text-sm text-[var(--color-neutral-mid)] space-y-1">
                <li>• Functional requirements completion</li>
                <li>• Dark mode design adherence</li>
                <li>• Code quality and documentation</li>
                <li>• Kernel compliance</li>
                <li>• Error handling implementation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[var(--color-neutral-offwhite)] mb-3">Assessment Levels</h4>
              <ul className="text-sm text-[var(--color-neutral-mid)] space-y-1">
                <li>• <span className="text-green-400">Pass:</span> Meets all criteria, ready for SA review</li>
                <li>• <span className="text-yellow-400">Conditional:</span> Minor issues, can proceed with notes</li>
                <li>• <span className="text-red-400">Fail:</span> Significant issues, needs revision</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TriageQA;
