
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Copy, CheckSquare, AlertTriangle, HelpCircle, Info, Brain, ExternalLink } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

/**
 * Triage QA Module - AI-assisted code review and quality assessment
 * Guides users through external LLM review process before SA review
 */
const TriageQA: React.FC = () => {
  const [moduleName, setModuleName] = useState<string>('');
  const [formLoaded, setFormLoaded] = useState<boolean>(false);
  const [llmOutput, setLlmOutput] = useState<string>('');
  const [qaDecision, setQaDecision] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  // Master prompt for AI Studio Review (defined by SA)
  const masterReviewPrompt = `You are an expert code reviewer conducting a Triage Quality Assurance (QA) review for a RoboCode module. Please analyze the provided code against these criteria:

1. **Kernel Adherence**: Does the code follow the RoboCode Internal Code Kernel v0.1 guidelines?
2. **Code Quality**: Is the code readable, maintainable, and well-structured?
3. **Functionality**: Does the code achieve its intended purpose as described?
4. **Security Basics**: Are there any obvious security concerns or vulnerabilities?
5. **Best Practices**: Does the code follow established coding standards and conventions?

Please provide:
- Overall assessment (Pass/Conditional Pass/Fail)
- Specific issues found (if any)
- Recommendations for improvement
- Any concerns that should be escalated to Solution Architect (SA) review

Code to review: [PASTE YOUR MODULE CODE HERE]`;

  /**
   * Handle loading the Triage QA form
   */
  const handleLoadForm = () => {
    if (!moduleName.trim()) {
      toast('Please enter a module name first');
      return;
    }

    setFormLoaded(true);
    console.log(`[ROBOCODE][TriageQA]: Form loaded for module: ${moduleName}`);
  };

  /**
   * Handle copying AI Studio review prompt to clipboard
   */
  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(masterReviewPrompt);
      toast('AI Studio Review Prompt copied to clipboard');
    } catch (err) {
      toast('Failed to copy prompt');
      console.error('[ROBOCODE][TriageQA]: Copy to clipboard failed:', err);
    }
  };

  /**
   * Handle Triage QA form submission
   */
  const handleSubmitResults = () => {
    if (!qaDecision || !llmOutput.trim()) {
      toast('Please complete all required fields (LLM Output and QA Decision)');
      return;
    }

    const triageResults = {
      moduleName: moduleName.trim(),
      qaDecision,
      llmOutput: llmOutput.trim(),
      additionalNotes: additionalNotes.trim(),
      reviewDate: new Date().toISOString().split('T')[0],
      reviewer: 'Samir Sinha',
      project: 'RoboCode Internal Build'
    };

    // Simulate saving to manifest
    console.log('[ROBOCODE][TriageQA]: SIMULATED_SAVE: robo_module_status_manifest.json - TRIAGE_QA_SUBMITTED:', JSON.stringify(triageResults, null, 2));

    toast('Triage QA results submitted successfully!');
    
    // Reset form
    setModuleName('');
    setFormLoaded(false);
    setLlmOutput('');
    setQaDecision('');
    setAdditionalNotes('');

    // Navigate to dashboard after brief delay
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Page Header with Information Icon */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold text-[var(--color-accent-cyan)]">Triage QA</h1>
          <Info className="h-6 w-6 text-[var(--color-accent-cyan)] bg-[var(--color-card-bg)] rounded-full p-1" title="AI-assisted code review and quality assessment using external Large Language Model (LLM) tools before Solution Architect review" />
        </div>
        <p className="text-lg text-[var(--color-neutral-offwhite)]">
          Artificial Intelligence (AI)-assisted code review and quality assessment
        </p>
      </div>

      {/* Module Selection */}
      <Card className="border border-[#444444]">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-[var(--color-neutral-offwhite)]">Module Selection</CardTitle>
            <Info className="h-5 w-5 text-[var(--color-accent-cyan)]" title="Enter the name of the module you want to submit for Triage QA review" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="moduleName" className="text-[var(--color-neutral-offwhite)]">RoboCode Module Name</Label>
            <Input
              id="moduleName"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              placeholder="e.g., DocumentManager_UI_Enhancement"
              className="mt-1"
              disabled={formLoaded}
              title="Enter the exact name of your RoboCode module"
            />
          </div>
          
          {!formLoaded && (
            <Button 
              onClick={handleLoadForm}
              className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110"
              disabled={!moduleName.trim()}
              title="Load the Triage QA form for this module"
            >
              Load Triage Form
            </Button>
          )}

          {formLoaded && (
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-green-400">
                <CheckSquare className="h-5 w-5" />
                <span className="font-medium">Triage Quality Assurance (QA) form loaded for: {moduleName}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Triage QA Form */}
      {formLoaded && (
        <>
          {/* AI Studio Integration */}
          <Card className="border border-[#444444]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CardTitle className="text-[var(--color-neutral-offwhite)]">External LLM Review</CardTitle>
                <Info className="h-5 w-5 text-[var(--color-accent-cyan)]" title="Use external AI tools like Google AI Studio with Gemini Pro for comprehensive code review" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#333333]">
                <div className="flex items-start gap-3 mb-4">
                  <Brain className="h-6 w-6 text-[var(--color-accent-purple)] mt-1" />
                  <div>
                    <h4 className="text-[var(--color-neutral-offwhite)] font-medium mb-2">
                      Instructions for Large Language Model (LLM) Review
                    </h4>
                    <ol className="text-sm text-[var(--color-neutral-light)] space-y-2 list-decimal list-inside">
                      <li>Copy the review prompt below to your clipboard</li>
                      <li>Open Google AI Studio or your preferred LLM tool 
                        <ExternalLink className="inline h-3 w-3 ml-1" title="External AI tool link" />
                      </li>
                      <li>Paste the prompt and add your module code</li>
                      <li>Copy the LLM response back to this form</li>
                      <li>Make your Quality Assurance (QA) decision based on the review</li>
                    </ol>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCopyPrompt}
                  className="bg-[var(--color-accent-purple)] text-[var(--color-neutral-offwhite)] hover:brightness-110"
                  title="Copy the master review prompt to clipboard for use in external AI tools"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy AI Studio Review Prompt
                </Button>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5" />
                  <div className="text-sm text-yellow-200">
                    <strong>Important:</strong> The external LLM review is for initial quality assessment only. 
                    All modules still require final Solution Architect (SA) approval before integration.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LLM Output Collection */}
          <Card className="border border-[#444444]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CardTitle className="text-[var(--color-neutral-offwhite)]">LLM Review Results</CardTitle>
                <Info className="h-5 w-5 text-[var(--color-accent-cyan)]" title="Paste the complete response from your external AI review tool" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="llmOutput" className="text-[var(--color-neutral-offwhite)]">
                  Large Language Model (LLM) Output *
                </Label>
                <Textarea
                  id="llmOutput"
                  value={llmOutput}
                  onChange={(e) => setLlmOutput(e.target.value)}
                  placeholder="Paste the complete response from Google AI Studio or your preferred LLM tool here..."
                  className="mt-1 min-h-[200px]"
                  title="Paste the full AI review response including assessment, issues, and recommendations"
                />
              </div>
            </CardContent>
          </Card>

          {/* QA Decision */}
          <Card className="border border-[#444444]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CardTitle className="text-[var(--color-neutral-offwhite)]">Quality Assurance Decision</CardTitle>
                <Info className="h-5 w-5 text-[var(--color-accent-cyan)]" title="Make your QA decision based on the LLM review and your own assessment" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="qaDecision" className="text-[var(--color-neutral-offwhite)]">
                  Triage QA Assessment *
                </Label>
                <Select value={qaDecision} onValueChange={setQaDecision}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select QA decision" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pass">
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-green-400" />
                        <span>Pass - Ready for SA Review</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="conditional-pass">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        <span>Conditional Pass - Minor Issues Noted</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="fail">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <span>Fail - Requires Rework</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="additionalNotes" className="text-[var(--color-neutral-offwhite)]">
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  id="additionalNotes"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Any additional observations, concerns, or recommendations for the SA review..."
                  className="mt-1"
                  rows={3}
                  title="Add any supplementary notes or concerns for the Solution Architect review"
                />
              </div>

              <Button 
                onClick={handleSubmitResults}
                className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110"
                disabled={!qaDecision || !llmOutput.trim()}
                title="Submit Triage QA results and progress to SA review queue"
              >
                Submit Triage QA Results
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {/* Process Information */}
      <Card className="border border-[#444444]">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-[var(--color-neutral-offwhite)]">Triage QA Process</CardTitle>
            <Info className="h-5 w-5 text-[var(--color-accent-cyan)]" title="Overview of the Triage QA process and next steps" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#1e1e1e] rounded-lg border border-[#333333]">
              <HelpCircle className="h-6 w-6 text-[var(--color-accent-cyan)] mb-2" />
              <h4 className="text-[var(--color-neutral-offwhite)] font-medium mb-2">Purpose</h4>
              <p className="text-sm text-[var(--color-neutral-mid)]">
                Initial AI-assisted review to catch basic issues before consuming Solution Architect (SA) time.
              </p>
            </div>
            
            <div className="p-4 bg-[#1e1e1e] rounded-lg border border-[#333333]">
              <CheckSquare className="h-6 w-6 text-[var(--color-accent-green)] mb-2" />
              <h4 className="text-[var(--color-neutral-offwhite)] font-medium mb-2">Next Steps</h4>
              <p className="text-sm text-[var(--color-neutral-mid)]">
                Passed modules proceed to SA Review queue. Failed modules return to development.
              </p>
            </div>
            
            <div className="p-4 bg-[#1e1e1e] rounded-lg border border-[#333333]">
              <AlertTriangle className="h-6 w-6 text-[var(--color-accent-orange)] mb-2" />
              <h4 className="text-[var(--color-neutral-offwhite)] font-medium mb-2">Important</h4>
              <p className="text-sm text-[var(--color-neutral-mid)]">
                Triage QA does not replace SA review - it's a preliminary quality gate.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TriageQA;
