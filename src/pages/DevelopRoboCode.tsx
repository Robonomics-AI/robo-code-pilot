
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, CheckCircle, Play, ArrowRight, GitBranch, Terminal, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

/**
 * Development Environment Setup Screen
 * Guides users through the RoboCode module development process
 * Includes Git workflow setup and kernel usage instructions
 */
const DevelopRoboCode: React.FC = () => {
  const [moduleName, setModuleName] = useState<string>('');
  const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false);
  const [copiedCommand, setCopiedCommand] = useState<string>('');

  /**
   * Copy command to clipboard with visual feedback
   */
  const copyToClipboard = async (text: string, commandType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCommand(commandType);
      toast(`${commandType} command copied to clipboard!`);
      
      // Clear the copied state after 2 seconds
      setTimeout(() => setCopiedCommand(''), 2000);
      
      console.log(`[ROBOCODE][DevelopRoboCode]: Copied ${commandType} command: ${text}`);
    } catch (err) {
      console.error('[ROBOCODE][DevelopRoboCode]: Failed to copy command:', err);
      toast("Failed to copy command");
    }
  };

  /**
   * Initialize module setup with dynamic text replacement
   */
  const initializeModuleSetup = () => {
    if (!moduleName.trim()) {
      toast("Please enter a module name first");
      return;
    }

    // Validate module name format
    const moduleNamePattern = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (!moduleNamePattern.test(moduleName)) {
      toast("Module name must start with a letter and contain only letters, numbers, and underscores");
      return;
    }

    setIsSetupComplete(true);

    // Simulate manifest update
    const newModule = {
      moduleName: moduleName,
      status: 'in_development',
      branchName: `feature/${moduleName.toLowerCase().replace(/_/g, '-')}`,
      createdDate: new Date().toISOString().split('T')[0],
      createdBy: 'Samir Sinha',
      triageQAStatus: 'pending',
      saReviewStatus: 'pending'
    };

    console.log('[ROBOCODE][DevelopRoboCode]: SIMULATED_SAVE: robo_module_status_manifest.json - ADDED_MODULE:', JSON.stringify(newModule, null, 2));
    
    toast("Module tracking initialized successfully!");
  };

  // Generate dynamic commands based on module name
  const getBranchName = () => moduleName ? `feature/${moduleName.toLowerCase().replace(/_/g, '-')}` : 'feature/[module-name]';
  const getModuleDirectory = () => moduleName ? `RoboCode_Platform/modules/${moduleName}` : 'RoboCode_Platform/modules/[ModuleName]';

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-accent-cyan)] mb-3">Coding Environment Setup</h1>
        <p className="text-lg text-[var(--color-neutral-offwhite)]">
          Initialize your development environment for a new RoboCode module
        </p>
      </div>

      {/* Module Name Input */}
      <Card className="border border-[#444444]">
        <CardHeader>
          <CardTitle className="text-[var(--color-neutral-offwhite)] flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-[var(--color-accent-green)]" />
            New RoboCode Module Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="moduleName" className="block text-sm font-medium text-[var(--color-neutral-offwhite)] mb-2">
              Module Name *
            </label>
            <Input
              id="moduleName"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              placeholder="e.g., DocumentManager_UI_Enhancement"
              className="mb-4"
              disabled={isSetupComplete}
            />
            <p className="text-xs text-[var(--color-neutral-mid)]">
              Module name will be used for Git branch and directory naming
            </p>
          </div>
          
          <Button 
            onClick={initializeModuleSetup}
            disabled={isSetupComplete || !moduleName.trim()}
            className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110"
          >
            <Play className="h-4 w-4 mr-2" />
            Prepare Setup Instructions
          </Button>

          {isSetupComplete && (
            <Alert className="bg-green-500/10 border-green-500/30 text-green-400">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Module tracking initialized for: <strong>{moduleName}</strong>
                <br />
                Branch: <code className="bg-black/30 px-1 rounded">{getBranchName()}</code>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Git Workflow Instructions */}
      <Card className="border border-[#444444]">
        <CardHeader>
          <CardTitle className="text-[var(--color-neutral-offwhite)] flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-[var(--color-accent-cyan)]" />
            Git Workflow Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-neutral-offwhite)] mb-3">
                Step 1: Create and Switch to Feature Branch
              </h3>
              <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#333333] relative">
                <code className="text-[var(--color-accent-cyan)] font-mono text-sm block">
                  git checkout -b {getBranchName()}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(`git checkout -b ${getBranchName()}`, 'Git Branch')}
                  title="Copy command"
                >
                  {copiedCommand === 'Git Branch' ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--color-neutral-offwhite)] mb-3">
                Step 2: Create Module Directory Structure
              </h3>
              <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#333333] relative">
                <code className="text-[var(--color-accent-cyan)] font-mono text-sm block">
                  mkdir -p {getModuleDirectory()}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(`mkdir -p ${getModuleDirectory()}`, 'Directory')}
                  title="Copy command"
                >
                  {copiedCommand === 'Directory' ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--color-neutral-offwhite)] mb-3">
                Step 3: Copy RoboCode Internal Kernel
              </h3>
              <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#333333] relative">
                <code className="text-[var(--color-accent-cyan)] font-mono text-sm block">
                  cp -r kernel/robocode_internal/v0.1/* {getModuleDirectory()}/
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(`cp -r kernel/robocode_internal/v0.1/* ${getModuleDirectory()}/`, 'Kernel Copy')}
                  title="Copy command"
                >
                  {copiedCommand === 'Kernel Copy' ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-4 border border-[#444444]">
            <h4 className="text-sm font-semibold text-[var(--color-neutral-offwhite)] mb-2">
              Important Notes:
            </h4>
            <ul className="text-sm text-[var(--color-neutral-mid)] space-y-1 list-disc list-inside">
              <li>Always work on a feature branch for new modules</li>
              <li>Use the RoboCode Internal Kernel as your starting point</li>
              <li>Follow the coding standards defined in the kernel documentation</li>
              <li>Commit frequently with descriptive messages</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Development Guidelines */}
      <Card className="border border-[#444444]">
        <CardHeader>
          <CardTitle className="text-[var(--color-neutral-offwhite)] flex items-center gap-2">
            <Terminal className="h-5 w-5 text-[var(--color-accent-purple)]" />
            Development Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-[var(--color-neutral-offwhite)]">UI Development with Lovable</h4>
              <ul className="text-sm text-[var(--color-neutral-mid)] space-y-1">
                <li>• Use robo_page_template.html as base structure</li>
                <li>• Apply dark mode CSS classes from robo_styles.css</li>
                <li>• Follow Robonomics AI branding guidelines</li>
                <li>• Ensure responsive design principles</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-[var(--color-neutral-offwhite)]">JavaScript Logic with Replit</h4>
              <ul className="text-sm text-[var(--color-neutral-mid)] space-y-1">
                <li>• Use console.log with [ROBOCODE][ModuleName] prefix</li>
                <li>• Follow JSDoc commenting standards</li>
                <li>• Implement error handling where appropriate</li>
                <li>• Test all interactive elements thoroughly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border border-[#444444]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-neutral-offwhite)] mb-2">
                Ready to Start Development?
              </h3>
              <p className="text-[var(--color-neutral-mid)]">
                Once you've completed the setup, proceed to Triage QA when your module is ready for review.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/documents">
                <Button variant="outline" className="border-[#444444]">
                  Review Documentation
                </Button>
              </Link>
              <Link to="/triage-qa">
                <Button className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110">
                  Go to Triage QA
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevelopRoboCode;
