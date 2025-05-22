
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, Copy, Info } from 'lucide-react';

const TriageQA: React.FC = () => {
  const [moduleName, setModuleName] = useState<string>('');
  const [isFormLoaded, setIsFormLoaded] = useState<boolean>(false);
  const [llmOutput, setLlmOutput] = useState<string>('');
  const [assessment, setAssessment] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  
  // Master prompt for AI Studio review
  const masterPrompt = `# RoboCode Triage QA Master Review Prompt

As an expert code reviewer, please analyze the following RoboCode module:
- Module Name: ${moduleName}
- Review Focus: Code Quality, Adherence to RoboCode Kernel Standards, and Best Practices

Please evaluate and provide feedback on the following:
1. Code Structure & Organization
2. Function Decomposition & Modularity
3. Error Handling Approaches
4. Adherence to Robonomics AI Coding Standards
5. UI Design Consistency with RoboCode's Dark Mode First Approach
6. Performance Considerations

Provide your overall assessment: Is this module ready for SA review, or does it need revisions?`;

  // Handler for loading the triage form
  const handleLoadForm = () => {
    if (!moduleName.trim()) {
      toast({
        title: "Module name required",
        description: "Please enter a module name to load the triage form.",
        variant: "destructive"
      });
      return;
    }
    
    setIsFormLoaded(true);
    toast({
      title: "Triage Form Loaded",
      description: `Triage QA form loaded for module: ${moduleName}`
    });
  };

  // Handler for copying the master prompt to clipboard
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(masterPrompt)
      .then(() => {
        setIsCopied(true);
        toast({
          title: "Prompt Copied",
          description: "AI Studio Review Prompt copied to clipboard successfully."
        });
        
        // Reset the copied state after 2 seconds
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy prompt: ', err);
        toast({
          title: "Copy Failed",
          description: "Failed to copy prompt to clipboard.",
          variant: "destructive"
        });
      });
  };

  // Handler for submitting the triage QA results
  const handleSubmitTriageQA = () => {
    if (!llmOutput.trim()) {
      toast({
        title: "LLM Output Required",
        description: "Please paste the LLM's review output.",
        variant: "destructive"
      });
      return;
    }

    if (!assessment) {
      toast({
        title: "Assessment Required",
        description: "Please select your triage QA assessment.",
        variant: "destructive"
      });
      return;
    }

    // Create an object with the form data
    const triageData = {
      moduleName,
      llmOutput,
      founderAssessment: assessment,
      submissionDate: new Date().toISOString()
    };

    // Simulate saving to a JSON file
    console.log("SIMULATED_SAVE: robo_module_status_manifest.json - TRIAGE_QA_SUBMITTED:", JSON.stringify(triageData));

    // Show success message
    toast({
      title: "Triage QA Submitted",
      description: `Triage QA for ${moduleName} has been submitted. Please notify the SA.`,
    });

    // Reset form
    setModuleName('');
    setLlmOutput('');
    setAssessment('');
    setIsFormLoaded(false);
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-[var(--color-accent-cyan)]">Triage QA Module</h1>
      
      {!isFormLoaded ? (
        <Card className="border border-[#444444] mb-6">
          <CardHeader>
            <CardTitle>Start New Triage QA</CardTitle>
            <CardDescription className="text-[var(--color-neutral-mid)]">
              Enter the name of the module you want to perform triage QA on
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row">
              <Input
                placeholder="Module Name for Triage QA"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
                className="flex-grow"
              />
              <Button 
                onClick={handleLoadForm}
                className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110"
              >
                Load Triage Form
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="border border-[#444444] mb-6">
            <CardHeader>
              <CardTitle>Triage QA for Module: {moduleName}</CardTitle>
              <CardDescription className="text-[var(--color-neutral-mid)]">
                Follow these steps to perform a thorough Triage QA review
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-[#1e1e1e] p-4 rounded-lg border border-[#555555]">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-[var(--color-accent-cyan)]">AI Studio Review Prompt</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={handleCopyPrompt}
                  >
                    {isCopied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {isCopied ? 'Copied!' : 'Copy to Clipboard'}
                  </Button>
                </div>
                <pre className="text-xs md:text-sm font-mono whitespace-pre-wrap text-[var(--color-neutral-offwhite)] p-3 overflow-auto max-h-60">
                  {masterPrompt}
                </pre>
              </div>
              
              <div>
                <label htmlFor="llm-output" className="block text-sm font-medium text-[var(--color-neutral-offwhite)] mb-2">
                  Paste LLM's Full Review Output Here:
                </label>
                <Textarea
                  id="llm-output"
                  placeholder="Paste the complete output from Google AI Studio's Gemini Pro model here..."
                  value={llmOutput}
                  onChange={(e) => setLlmOutput(e.target.value)}
                  rows={8}
                  className="w-full bg-[#383838] border border-[#777777] text-[var(--color-neutral-offwhite)]"
                />
              </div>
              
              <div>
                <label htmlFor="assessment" className="block text-sm font-medium text-[var(--color-neutral-offwhite)] mb-2">
                  My Triage QA Assessment:
                </label>
                <Select value={assessment} onValueChange={setAssessment}>
                  <SelectTrigger className="w-full bg-[#383838] border border-[#777777] text-[var(--color-neutral-offwhite)]">
                    <SelectValue placeholder="Select your assessment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pass">Pass</SelectItem>
                    <SelectItem value="Fail_Needs_Revision">Fail - Needs Revision</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="bg-[#1a2339] p-4 rounded-lg flex items-start gap-3 border border-[#3a4663]">
                <Info className="h-5 w-5 text-[var(--color-accent-cyan)] mt-0.5" />
                <div>
                  <h4 className="font-medium text-[var(--color-accent-cyan)]">Important Note</h4>
                  <p className="text-sm text-[var(--color-neutral-offwhite)]">
                    Upon submission, the SA will be notified about your Triage QA assessment. Only proceed with 'Pass' if the module meets all RoboCode standards and is ready for SA review.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setIsFormLoaded(false)}
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
        </div>
      )}
    </div>
  );
};

export default TriageQA;
