
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Clipboard, CheckCircle2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { ModuleService } from '@/utils/dataService';
import { Module } from '@/utils/types';

interface TriageQAFormProps {
  onComplete: (success: boolean) => void;
}

const TriageQAForm: React.FC<TriageQAFormProps> = ({ onComplete }) => {
  const [moduleName, setModuleName] = useState('');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [llmOutput, setLlmOutput] = useState('');
  const [assessment, setAssessment] = useState<'Pass' | 'Fail' | ''>('');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const masterPrompt = `
# AI Studio Review Request for RoboCode Module: ${moduleName}

## Module Information
- Name: ${moduleName} 
- Branch: feature/${moduleName}

## Code Being Reviewed
\`\`\`
[Attached Code]
\`\`\`

## File Structure
\`\`\`
[File Structure Explanation]
\`\`\`

## Review Tasks
Please analyze this code and provide detailed feedback on:

1. **Code Quality**: Is the code well-structured, readable, and maintainable?
2. **Architecture Alignment**: Does it follow RoboCode's Kernel architecture guidelines?
3. **Potential Issues**: Are there any bugs, edge cases, or potential performance problems?
4. **Security Concerns**: Are there any security vulnerabilities or practices that could lead to them?
5. **Best Practices**: Suggest any improvements based on modern web development best practices.

## Output Format
Please structure your response as follows:

**SUMMARY**: Brief overall assessment
**STRENGTHS**: Bullet points of what was done well
**AREAS FOR IMPROVEMENT**: Bullet points with specific suggestions
**CODE-SPECIFIC COMMENTS**: Line-by-line feedback on specific issues
**RECOMMENDATION**: "PASS" or "FAIL" with brief justification
`;

  const handleLoadForm = () => {
    if (!moduleName.trim()) {
      toast.error("Please enter a module name");
      return;
    }
    
    // Typically we'd find from our service
    const modules = ModuleService.getAllModules();
    const foundModule = modules.find(m => m.name === moduleName);
    
    if (foundModule) {
      setSelectedModule(foundModule);
      setShowForm(true);
    } else {
      // For demonstration, we'll create a module if it doesn't exist
      const newModule = ModuleService.createModule(moduleName);
      setSelectedModule(newModule);
      setShowForm(true);
      toast.info(`Created module tracking for "${moduleName}"`);
    }
  };

  const copyPromptToClipboard = () => {
    navigator.clipboard.writeText(masterPrompt);
    setCopiedPrompt(true);
    toast.success("Prompt copied to clipboard");
    
    setTimeout(() => {
      setCopiedPrompt(false);
    }, 3000);
  };

  const handleSubmitTriageQA = () => {
    if (!llmOutput) {
      toast.error("Please paste the LLM output");
      return;
    }
    
    if (!assessment) {
      toast.error("Please select your assessment");
      return;
    }
    
    if (selectedModule) {
      // Add the triage QA to the module
      ModuleService.addTriageQA(selectedModule.id, {
        submittedBy: "Samir Sinha",
        submissionDate: new Date().toISOString().split('T')[0],
        llmOutput,
        assessment
      });
      
      toast.success(`Triage QA submitted for "${moduleName}"`);
      onComplete(true);
      
      // Reset form
      setModuleName('');
      setSelectedModule(null);
      setShowForm(false);
      setLlmOutput('');
      setAssessment('');
    }
  };

  return (
    <div className="animate-fade-in">
      {!showForm ? (
        <Card className="border border-[#444444]">
          <CardHeader>
            <CardTitle className="text-[var(--color-accent-cyan)]">Perform Triage QA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[var(--color-neutral-offwhite)]">Enter Module Name for Triage QA:</Label>
                <Input 
                  placeholder="e.g., DocumentManager_UI" 
                  value={moduleName}
                  onChange={(e) => setModuleName(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleLoadForm}
              className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110"
            >
              Load Triage Form
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="border border-[#444444]">
          <CardHeader>
            <CardTitle className="text-[var(--color-accent-cyan)]">Triage QA for Module: {moduleName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-[#1e1e1e] p-4 rounded-lg border border-[#444444]">
              <h4 className="font-medium mb-2 text-[var(--color-neutral-offwhite)]">Instructions:</h4>
              <ol className="list-decimal pl-5 space-y-2 text-[var(--color-neutral-mid)]">
                <li>You should have already committed your Vibe Coded module to the branch <code className="bg-[#2c2c2c] px-1 rounded text-[var(--color-accent-cyan)]">feature/{moduleName}</code>.</li>
                <li>Open your Vibe Coding tool. If it supports explaining file structure, use it to get an explanation of the new files.</li>
                <li>Copy the <strong>new code</strong> you generated for this module.</li>
                <li>Open Google AI Studio (or your preferred external LLM).</li>
              </ol>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-[var(--color-neutral-offwhite)]">AI Studio Review Prompt:</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyPromptToClipboard}
                  className="border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)]"
                >
                  {copiedPrompt ? (
                    <> <CheckCircle2 className="h-4 w-4 mr-2" /> Copied</>
                  ) : (
                    <> <Clipboard className="h-4 w-4 mr-2" /> Copy Prompt</>
                  )}
                </Button>
              </div>
              <div className="bg-[#1e1e1e] p-3 rounded-lg border border-[#444444] text-[var(--color-neutral-mid)] text-sm font-mono h-32 overflow-y-auto">
                {masterPrompt}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-[var(--color-neutral-offwhite)]">Paste LLM's Full Review Output Here:</Label>
              <Textarea 
                placeholder="Paste the entire AI review here..." 
                rows={8}
                value={llmOutput}
                onChange={(e) => setLlmOutput(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-[var(--color-neutral-offwhite)]">Upload Screenshots (Optional):</Label>
              <Input type="file" multiple accept="image/*" />
              <p className="text-xs text-[var(--color-neutral-mid)]">You can upload screenshots of your Vibe Coded module in action.</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-[var(--color-neutral-offwhite)]">My Triage QA Assessment:</Label>
              <select 
                className="flex h-10 w-full rounded-lg border border-[#777777] bg-[#383838] px-3 py-2 text-base text-[var(--color-neutral-offwhite)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-cyan)] focus:border-transparent transition-all"
                value={assessment}
                onChange={(e) => setAssessment(e.target.value as 'Pass' | 'Fail' | '')}
              >
                <option value="">---Select---</option>
                <option value="Pass">Pass (Ready for SA Review)</option>
                <option value="Fail">Fail (Needs Sandbox Revision)</option>
              </select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowForm(false);
                setSelectedModule(null);
              }}
              className="border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)]"
            >
              Back
            </Button>
            <Button 
              onClick={handleSubmitTriageQA}
              className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110"
            >
              Submit Triage QA Results
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default TriageQAForm;
