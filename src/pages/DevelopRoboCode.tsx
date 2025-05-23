
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Copy, CheckCircle, Info, AlertTriangle, GitBranch, Github } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

/**
 * Development Environment Setup for RoboCode modules
 * Guides developers through environment initialization with multi-project context
 */
const DevelopRoboCode: React.FC = () => {
  const [moduleName, setModuleName] = useState<string>('');
  const [setupInitialized, setSetupInitialized] = useState<boolean>(false);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  // Current project context
  const currentProject = "RoboCode Internal Build";
  const currentRepo = "RoboCode_Platform";

  /**
   * Handle copy to clipboard functionality with visual feedback
   */
  const handleCopyToClipboard = async (text: string, commandKey: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates({ ...copiedStates, [commandKey]: true });
      toast(`Command copied to clipboard`);
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedStates({ ...copiedStates, [commandKey]: false });
      }, 2000);
    } catch (err) {
      toast(`Failed to copy command`);
      console.error('[ROBOCODE][DevelopRoboCode]: Copy to clipboard failed:', err);
    }
  };

  /**
   * Handle module setup preparation with dynamic name insertion
   */
  const handlePrepareSetup = () => {
    if (!moduleName.trim()) {
      toast('Please enter a module name first');
      return;
    }

    // Simulate module tracking initialization
    const newModule = {
      moduleName: moduleName.trim(),
      project: currentProject,
      status: 'Environment Setup',
      branchName: `feature/${moduleName.toLowerCase().replace(/\s+/g, '-')}`,
      dateInitialized: new Date().toISOString().split('T')[0],
      owner: 'Samir Sinha'
    };

    console.log('[ROBOCODE][DevelopRoboCode]: SIMULATED_SAVE: robo_module_status_manifest.json - ADDED_MODULE:', JSON.stringify(newModule, null, 2));
    
    setSetupInitialized(true);
    toast('Module tracking initialized successfully!');
  };

  /**
   * Generate Git commands with dynamic module name
   */
  const getGitCommands = () => {
    const branchName = moduleName ? moduleName.toLowerCase().replace(/\s+/g, '-') : '[module-name]';
    
    return {
      clone: `git clone git@github.com:YourOrg/${currentRepo}.git`,
      navigate: `cd ${currentRepo}`,
      checkout: `git checkout -b feature/${branchName}`,
      setup: `mkdir -p modules/${moduleName || '[ModuleName]'}`,
      copy: `cp -r kernel/robocode_internal/v0.1/* modules/${moduleName || '[ModuleName]'}/`,
      initial: `git add . && git commit -m "Initial setup for ${moduleName || '[ModuleName]'} module"`
    };
  };

  const gitCommands = getGitCommands();

  return (
    <div className="space-y-6">
      {/* Page Header with Information Icon */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold text-[var(--color-accent-cyan)]">Coding Environment Setup</h1>
          <Info className="h-6 w-6 text-[var(--color-accent-cyan)] bg-[var(--color-card-bg)] rounded-full p-1" title="Setup and configure your development environment for new RoboCode modules using the Internal Code Kernel" />
        </div>
        <p className="text-lg text-[var(--color-neutral-offwhite)]">
          Project: <span className="font-semibold text-[var(--color-accent-cyan)]">{currentProject}</span> - 
          Initialize development environment for new modules
        </p>
      </div>

      {/* New Module Setup */}
      <Card className="border border-[#444444]">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-[var(--color-neutral-offwhite)]">New RoboCode Module Setup</CardTitle>
            <Info className="h-5 w-5 text-[var(--color-accent-cyan)]" title="Enter module name to generate personalized setup instructions using the RoboCode Internal Code Kernel" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="moduleName" className="text-[var(--color-neutral-offwhite)]">Module Name</Label>
            <Input
              id="moduleName"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              placeholder="e.g., Dashboard_Enhancement, API_Integration"
              className="mt-1"
              title="Enter a descriptive name for your new RoboCode module"
            />
          </div>
          
          <Button 
            onClick={handlePrepareSetup}
            className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110"
            disabled={!moduleName.trim()}
            title="Initialize module tracking and generate setup instructions"
          >
            Prepare Setup Instructions
          </Button>

          {setupInitialized && (
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Module tracking initialized for: {moduleName}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* GitHub Repository Access */}
      <Card className="border border-[#444444]">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-[var(--color-neutral-offwhite)]">GitHub Repository Access</CardTitle>
            <Info className="h-5 w-5 text-[var(--color-accent-cyan)]" title="Important information about repository access and integration setup" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-[#1e1e1e] rounded-lg border border-[#333333]">
            <Github className="h-6 w-6 text-[var(--color-accent-cyan)] mt-1" />
            <div>
              <h4 className="text-[var(--color-neutral-offwhite)] font-medium mb-2">Repository Setup</h4>
              <p className="text-sm text-[var(--color-neutral-light)] mb-3">
                Ensure the GitHub repository (<code className="bg-[#333] px-1 py-0.5 rounded text-[var(--color-accent-cyan)]">{currentRepo}</code> for this internal build, 
                or your client project repository in the future) is accessible.
              </p>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5" />
                  <div className="text-sm text-yellow-200">
                    <strong>Private Repositories:</strong> For private repositories, initial code upload to RoboCode for Solution Architect (SA) Review 
                    might require a manual ZIP file upload (see SA Review module) until direct GitHub App (GA) integration is implemented post-Minimum Viable Product (MVP).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Git Workflow Instructions */}
      <Card className="border border-[#444444]">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-[var(--color-neutral-offwhite)]">Git Workflow Instructions</CardTitle>
            <Info className="h-5 w-5 text-[var(--color-accent-cyan)]" title="Step-by-step Git commands for setting up your development environment" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Clone Repository */}
          <div>
            <h4 className="text-[var(--color-neutral-offwhite)] font-medium mb-3 flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-[var(--color-accent-cyan)]" />
              Step 1: Clone Repository for Current Active Project
            </h4>
            <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#333333]">
              <div className="flex items-center justify-between">
                <code className="text-[var(--color-accent-cyan)] text-sm font-mono">{gitCommands.clone}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyToClipboard(gitCommands.clone, 'clone')}
                  className="ml-2"
                  title="Copy clone command to clipboard"
                >
                  {copiedStates['clone'] ? <CheckCircle className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Step 2: Navigate to Directory */}
          <div>
            <h4 className="text-[var(--color-neutral-offwhite)] font-medium mb-3">Step 2: Navigate to Repository</h4>
            <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#333333]">
              <div className="flex items-center justify-between">
                <code className="text-[var(--color-accent-cyan)] text-sm font-mono">{gitCommands.navigate}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyToClipboard(gitCommands.navigate, 'navigate')}
                  className="ml-2"
                  title="Copy navigation command to clipboard"
                >
                  {copiedStates['navigate'] ? <CheckCircle className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Step 3: Create Feature Branch */}
          <div>
            <h4 className="text-[var(--color-neutral-offwhite)] font-medium mb-3">Step 3: Create Feature Branch</h4>
            <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#333333]">
              <div className="flex items-center justify-between">
                <code className="text-[var(--color-accent-cyan)] text-sm font-mono">{gitCommands.checkout}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyToClipboard(gitCommands.checkout, 'checkout')}
                  className="ml-2"
                  title="Copy branch creation command to clipboard"
                >
                  {copiedStates['checkout'] ? <CheckCircle className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Step 4: Setup Module Directory */}
          <div>
            <h4 className="text-[var(--color-neutral-offwhite)] font-medium mb-3">Step 4: Create Module Directory</h4>
            <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#333333]">
              <div className="flex items-center justify-between">
                <code className="text-[var(--color-accent-cyan)] text-sm font-mono">{gitCommands.setup}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyToClipboard(gitCommands.setup, 'setup')}
                  className="ml-2"
                  title="Copy directory creation command to clipboard"
                >
                  {copiedStates['setup'] ? <CheckCircle className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Step 5: Copy Kernel Files */}
          <div>
            <h4 className="text-[var(--color-neutral-offwhite)] font-medium mb-3">Step 5: Copy RoboCode Internal Code Kernel</h4>
            <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#333333]">
              <div className="flex items-center justify-between">
                <code className="text-[var(--color-accent-cyan)] text-sm font-mono">{gitCommands.copy}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyToClipboard(gitCommands.copy, 'copy')}
                  className="ml-2"
                  title="Copy kernel setup command to clipboard"
                >
                  {copiedStates['copy'] ? <CheckCircle className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Step 6: Initial Commit */}
          <div>
            <h4 className="text-[var(--color-neutral-offwhite)] font-medium mb-3">Step 6: Initial Commit</h4>
            <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#333333]">
              <div className="flex items-center justify-between">
                <code className="text-[var(--color-accent-cyan)] text-sm font-mono">{gitCommands.initial}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyToClipboard(gitCommands.initial, 'initial')}
                  className="ml-2"
                  title="Copy initial commit command to clipboard"
                >
                  {copiedStates['initial'] ? <CheckCircle className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border border-[#444444]">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-[var(--color-neutral-offwhite)]">Next Steps</CardTitle>
            <Info className="h-5 w-5 text-[var(--color-accent-cyan)]" title="Recommended workflow progression after environment setup" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#1e1e1e] rounded-lg border border-[#333333]">
              <h4 className="text-[var(--color-neutral-offwhite)] font-medium mb-2">1. Development Phase</h4>
              <p className="text-sm text-[var(--color-neutral-mid)]">
                Begin coding your module using your preferred Integrated Development Environment (IDE) tools (Cursor, Windsurf) 
                following the RoboCode Internal Code Kernel guidelines.
              </p>
            </div>
            
            <div className="p-4 bg-[#1e1e1e] rounded-lg border border-[#333333]">
              <h4 className="text-[var(--color-neutral-offwhite)] font-medium mb-2">2. Quality Assurance</h4>
              <p className="text-sm text-[var(--color-neutral-mid)]">
                Once development is complete, proceed to Triage Quality Assurance (QA) for AI-assisted code review.
              </p>
            </div>
          </div>

          {setupInitialized && (
            <div className="mt-6">
              <Button 
                asChild
                className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110"
                title="Proceed to Triage QA for code review"
              >
                <a href="/triage-qa">Go to Triage QA</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DevelopRoboCode;
