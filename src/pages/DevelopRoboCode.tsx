
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Clipboard, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/layout/Header';

const DevelopRoboCode = () => {
  const [moduleName, setModuleName] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePrepareSetup = () => {
    if (!moduleName.trim()) {
      toast({
        title: "Module name required",
        description: "Please enter a name for your new RoboCode module.",
        variant: "destructive"
      });
      return;
    }
    
    // In MVP, this would update a JSON file. For now, just show instructions
    setShowInstructions(true);
    
    // Simulate adding entry to module_manifest.json
    console.log('Adding to module_manifest.json:', {
      moduleName: moduleName,
      status: "SetupInstructionsProvided",
      branchName: `feature/${moduleName}`,
      kernelVersionUsed: "internal_stable_v0.1",
      creationDate: new Date().toISOString().split('T')[0]
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
    <div className="min-h-screen flex flex-col bg-[var(--color-neutral-offwhite)]">
      <Header />
      
      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-primary-core)] mb-2">Develop RoboCode &gt; Start New Module</h2>
            <p className="text-[var(--color-neutral-dark)]/80">
              Begin development of a new RoboCode module by setting up your environment with the correct code version from GitHub.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-soft p-6 mb-6">
            <h3 className="text-xl font-semibold text-[var(--color-primary-core)] mb-4">New Module Setup</h3>
            
            <div className="mb-6">
              <label htmlFor="moduleName" className="block text-sm font-medium text-[var(--color-neutral-dark)] mb-1">
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
                  className="bg-[var(--color-primary-core)] hover:bg-[#00254D]"
                >
                  Prepare Setup
                </Button>
              </div>
              <p className="mt-1 text-sm text-[var(--color-neutral-dark)]/60">
                Use a descriptive name that indicates the module's purpose and version.
              </p>
            </div>
            
            {showInstructions && (
              <div className="mt-8 animate-fade-in">
                <h3 className="text-xl font-semibold text-[var(--color-primary-core)] mb-4">
                  To develop the module: <span className="font-bold">{moduleName}</span>
                </h3>
                
                <div className="space-y-6">
                  {getGitCommands().map((stepInfo) => (
                    <Card key={stepInfo.step} className="p-4 border border-[var(--color-neutral-light)]">
                      <h4 className="font-semibold mb-2">Step {stepInfo.step}: {stepInfo.description}</h4>
                      
                      {stepInfo.commands.map((command, idx) => (
                        <div key={idx} className="my-2">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="bg-[var(--color-neutral-light)] text-[var(--color-neutral-dark)] p-2 rounded font-mono text-sm flex-1 overflow-x-auto">
                              {command}
                            </div>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => copyToClipboard(command)}
                              className="flex-shrink-0"
                            >
                              {copiedCommand === command ? 
                                <CheckCircle2 className="h-4 w-4 text-[var(--color-accent-green)]" /> : 
                                <Clipboard className="h-4 w-4" />
                              }
                            </Button>
                          </div>
                        </div>
                      ))}
                    </Card>
                  ))}
                  
                  <Card className="p-4 border border-[var(--color-neutral-light)]">
                    <h4 className="font-semibold mb-2">Step 4: Review Context</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Ensure you've reviewed the relevant PRD/Tech Spec for this module in RoboCode Document Management.</li>
                      <li>Review the latest <code className="bg-[var(--color-neutral-light)] px-1 rounded">RoboCode_Project_Context_Summary.md</code>.</li>
                    </ul>
                  </Card>
                  
                  <Card className="p-4 border border-[var(--color-neutral-light)]">
                    <h4 className="font-semibold mb-2">Step 5: Start Vibe Coding!</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Open your Vibe Coding tool (Lovable for UI, Replit for logic) and point it to your new <code className="bg-[var(--color-neutral-light)] px-1 rounded">modules/{moduleName}</code> directory.</li>
                      <li>Focus development within this new module directory, leveraging the copied Kernel files.</li>
                    </ul>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DevelopRoboCode;
