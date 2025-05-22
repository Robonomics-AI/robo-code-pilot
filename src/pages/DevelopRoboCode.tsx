
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Clipboard, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/layout/Header';
import { ModuleService } from '@/utils/dataService';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const DevelopRoboCode = () => {
  const [moduleName, setModuleName] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [moduleNameError, setModuleNameError] = useState<string | null>(null);
  const [createdModule, setCreatedModule] = useState<string | null>(null);
  const { toast } = useToast();

  const validateModuleName = (name: string): boolean => {
    if (!name.trim()) {
      setModuleNameError("Module name is required");
      return false;
    }
    
    // Check for valid name format (alphanumeric, underscores, no spaces)
    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      setModuleNameError("Module name should only contain letters, numbers, and underscores");
      return false;
    }
    
    setModuleNameError(null);
    return true;
  };

  const handlePrepareSetup = () => {
    if (!validateModuleName(moduleName)) {
      toast({
        title: "Module name error",
        description: moduleNameError,
        variant: "destructive"
      });
      return;
    }
    
    // Create a new module with our service
    const newModule = ModuleService.createModule(moduleName);
    setCreatedModule(newModule.id);
    
    // Update status to show instructions were provided
    ModuleService.updateModuleStatus(newModule.id, "SetupInstructionsProvided");
    
    // Show instructions
    setShowInstructions(true);
    
    toast({
      title: "Module setup prepared",
      description: `Setup instructions for '${moduleName}' are ready. The module has been added to the tracking system.`,
      variant: "default"
    });
  };

  const copyToClipboard = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    
    toast({
      title: "Command copied!",
      description: "The Git command has been copied to your clipboard."
    });
    
    // Reset the copied status after 3 seconds
    setTimeout(() => {
      setCopiedCommand(null);
    }, 3000);
  };

  const getGitCommands = () => {
    return [
      { step: 1, description: "Ensure your 'RoboCode_Platform' repository is up-to-date", commands: [
        `git checkout develop`,
        `git pull origin develop`
      ]},
      { step: 2, description: "Create a feature branch for your new module", commands: [
        `git checkout -b feature/${moduleName}`
      ]},
      { step: 3, description: "Obtain the RoboCode Internal Code Kernel", commands: [
        `mkdir -p modules/${moduleName} && cp -R kernel/internal/stable/* modules/${moduleName}/`
      ]},
      { step: 6, description: "Commit Early & Often", commands: [
        `git add . && git commit -m 'feat(${moduleName}): Implement X part of Y'`
      ]},
      { step: 7, description: "Push and Submit for Triage QA", commands: [
        `git push origin feature/${moduleName}`
      ]}
    ];
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 p-6 container mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-accent-cyan)] mb-2">Develop RoboCode &gt; Start New Module</h2>
          <p className="text-[var(--color-neutral-mid)]">
            Begin development of a new RoboCode module by setting up your environment with the correct code version from GitHub.
          </p>
        </div>
        
        <Card className="mb-6">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-[var(--color-accent-cyan)] mb-4">New Module Setup</h3>
            
            <div className="mb-6">
              <label htmlFor="moduleName" className="block text-sm font-medium text-[var(--color-neutral-offwhite)] mb-1">
                Enter name for the new RoboCode module:
              </label>
              <div className="flex gap-4">
                <Input
                  id="moduleName"
                  placeholder="e.g., AuthenticationUI_v0.1 or IPA_HelpDoc_Display"
                  value={moduleName}
                  onChange={(e) => setModuleName(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handlePrepareSetup}
                  className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110"
                >
                  Prepare Setup
                </Button>
              </div>
              <p className="mt-1 text-sm text-[var(--color-neutral-mid)]">
                Use a descriptive name that indicates the module's purpose and version.
              </p>
              {moduleNameError && (
                <p className="mt-1 text-sm text-[var(--color-dynamic-red)]">
                  {moduleNameError}
                </p>
              )}
            </div>
            
            {showInstructions && (
              <div className="mt-8 animate-fade-in">
                <Alert className="mb-4 bg-[#1e1e1e] border-[var(--color-accent-cyan)] border">
                  <AlertCircle className="h-4 w-4 text-[var(--color-accent-cyan)]" />
                  <AlertTitle className="text-[var(--color-accent-cyan)]">Module tracking initialized</AlertTitle>
                  <AlertDescription className="text-[var(--color-neutral-offwhite)]">
                    Module '{moduleName}' has been added to the RoboCode tracking system. Follow these steps to start development.
                  </AlertDescription>
                </Alert>
                
                <h3 className="text-xl font-semibold text-[var(--color-accent-cyan)] mb-4">
                  Development steps for module: <span className="font-bold">{moduleName}</span>
                </h3>
                
                <div className="space-y-6">
                  {getGitCommands().map((stepInfo) => (
                    <Card key={stepInfo.step} className="border border-[#444444]">
                      <div className="p-4">
                        <h4 className="font-semibold mb-2 text-[var(--color-neutral-offwhite)]">Step {stepInfo.step}: {stepInfo.description}</h4>
                        
                        {stepInfo.commands.map((command, idx) => (
                          <div key={idx} className="my-2">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="bg-[#1e1e1e] text-[var(--color-neutral-offwhite)] p-2 rounded font-mono text-sm flex-1 overflow-x-auto">
                                {command}
                              </div>
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => copyToClipboard(command)}
                                className="flex-shrink-0 border-[var(--color-accent-cyan)]"
                              >
                                {copiedCommand === command ? 
                                  <CheckCircle2 className="h-4 w-4 text-[var(--color-accent-green)]" /> : 
                                  <Clipboard className="h-4 w-4 text-[var(--color-accent-cyan)]" />
                                }
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                  
                  <Card className="border border-[#444444]">
                    <div className="p-4">
                      <h4 className="font-semibold mb-2 text-[var(--color-neutral-offwhite)]">Step 4: Review Context</h4>
                      <ul className="list-disc pl-5 space-y-2 text-[var(--color-neutral-offwhite)]">
                        <li>Ensure you've reviewed the relevant PRD/Tech Spec for this module in RoboCode Document Management.</li>
                        <li>Review the latest <code className="bg-[#1e1e1e] px-1 rounded">RoboCode_Project_Context_Summary.md</code>.</li>
                      </ul>
                    </div>
                  </Card>
                  
                  <Card className="border border-[#444444]">
                    <div className="p-4">
                      <h4 className="font-semibold mb-2 text-[var(--color-neutral-offwhite)]">Step 5: Start Vibe Coding!</h4>
                      <ul className="list-disc pl-5 space-y-2 text-[var(--color-neutral-offwhite)]">
                        <li>Open your Vibe Coding tool (Lovable for UI, Replit for logic) and point it to your new <code className="bg-[#1e1e1e] px-1 rounded">modules/{moduleName}</code> directory.</li>
                        <li>Focus development within this new module directory, leveraging the copied Kernel files.</li>
                      </ul>
                    </div>
                  </Card>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button 
                    onClick={() => window.location.href = '/review'} 
                    className="bg-[var(--color-primary-core)] text-[var(--color-neutral-offwhite)] hover:brightness-110"
                  >
                    Go to Triage QA
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default DevelopRoboCode;
