
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { 
  FolderOpen, 
  File, 
  FileText, 
  Code, 
  Upload, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle,
  Info,
  ChevronRight,
  ChevronDown,
  Search,
  Shield,
  Zap,
  Wrench,
  Database,
  TestTube
} from 'lucide-react';

/**
 * Integrated Review Environment (IRE)
 * Three-panel IDE-style interface for Solution Architect code review
 */
const IntegratedReviewEnvironment: React.FC = () => {
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['modules', 'AuthenticationUI_v0.1']);
  const [uploadedZip, setUploadedZip] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState('comments');
  
  // Checklist state management
  const [checklistState, setChecklistState] = useState({
    security: 'not-checked',
    scalability: 'not-checked', 
    maintainability: 'not-checked',
    reliability: 'not-checked',
    governance: 'not-checked'
  });

  const [saFeedback, setSaFeedback] = useState('');
  const [saDecision, setSaDecision] = useState('');

  // Sample module data
  const moduleData = {
    id: id || 'qa-123456789',
    moduleName: 'AuthenticationUI_v0.1',
    project: 'RoboCode Internal Build',
    githubBranch: 'feature/authentication-ui',
    submittedBy: 'Samir Sinha',
    submissionDate: '2025-01-15T10:30:00Z',
    triageStatus: 'pass',
    triageNotes: 'AI review passed with minor recommendations. Code structure follows RoboCode kernel standards. Dark mode implementation is consistent.',
    aiReviewSummary: 'Overall assessment: Good code quality with proper TypeScript usage and component structure. Minor improvements suggested for error handling.'
  };

  // File tree structure
  const fileTree = {
    name: 'modules',
    type: 'folder',
    children: [
      {
        name: 'AuthenticationUI_v0.1',
        type: 'folder',
        children: [
          { name: 'index.html', type: 'file' },
          { name: 'styles.css', type: 'file' },
          { name: 'components', type: 'folder', children: [
            { name: 'LoginForm.tsx', type: 'file' },
            { name: 'SignupForm.tsx', type: 'file' },
            { name: 'AuthButton.tsx', type: 'file' }
          ]},
          { name: 'utils', type: 'folder', children: [
            { name: 'validation.ts', type: 'file' },
            { name: 'auth.ts', type: 'file' }
          ]},
          { name: 'README.md', type: 'file' }
        ]
      }
    ]
  };

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const handleFileSelect = (fileName: string) => {
    setSelectedFile(fileName);
  };

  const handleZipUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedZip(file);
      console.log('[ROBOCODE][IRE]: ZIP file uploaded:', file.name);
    }
  };

  const updateChecklistItem = (category: string, value: string) => {
    setChecklistState(prev => ({ ...prev, [category]: value }));
  };

  const submitSADecision = () => {
    const reviewData = {
      moduleId: id,
      checklistState,
      saFeedback,
      saDecision,
      reviewDate: new Date().toISOString(),
      reviewerId: 'amal-david'
    };
    
    console.log('[ROBOCODE][IRE]: SA Review submitted:', JSON.stringify(reviewData));
    alert('SA Review decision submitted successfully!');
  };

  const renderFileTreeNode = (node: any, path = '') => {
    const currentPath = path ? `${path}/${node.name}` : node.name;
    const isExpanded = expandedFolders.includes(currentPath);
    
    if (node.type === 'folder') {
      return (
        <div key={currentPath}>
          <div 
            className="flex items-center gap-2 py-1 px-2 hover:bg-[#383838] cursor-pointer rounded"
            onClick={() => toggleFolder(currentPath)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-[#AAAAAA]" />
            ) : (
              <ChevronRight className="h-4 w-4 text-[#AAAAAA]" />
            )}
            <FolderOpen className="h-4 w-4 text-[#00AEEF]" />
            <span className="text-sm text-[#E0E0E0]">{node.name}</span>
          </div>
          {isExpanded && node.children && (
            <div className="ml-4">
              {node.children.map((child: any) => renderFileTreeNode(child, currentPath))}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div 
          key={currentPath}
          className={`flex items-center gap-2 py-1 px-2 ml-6 hover:bg-[#383838] cursor-pointer rounded ${
            selectedFile === node.name ? 'bg-[#00AEEF]/20' : ''
          }`}
          onClick={() => handleFileSelect(node.name)}
        >
          <File className="h-4 w-4 text-[#AAAAAA]" />
          <span className="text-sm text-[#E0E0E0]">{node.name}</span>
        </div>
      );
    }
  };

  const checklistCategories = [
    { 
      key: 'security', 
      title: 'Security & Compliance Basics',
      icon: Shield,
      color: 'text-red-400'
    },
    { 
      key: 'scalability', 
      title: 'Scalability & Performance Stubs',
      icon: Zap,
      color: 'text-yellow-400'
    },
    { 
      key: 'maintainability', 
      title: 'Maintainability & Clean Code',
      icon: Wrench,
      color: 'text-blue-400'
    },
    { 
      key: 'reliability', 
      title: 'Reliability & Fault Tolerance Stubs',
      icon: Database,
      color: 'text-green-400'
    },
    { 
      key: 'governance', 
      title: 'Code Governance & Testability',
      icon: TestTube,
      color: 'text-purple-400'
    }
  ];

  const checklistOptions = [
    { value: 'not-checked', label: 'Not Checked', color: 'text-[#AAAAAA]' },
    { value: 'pass', label: 'Pass', color: 'text-[#28A745]' },
    { value: 'minor-concern', label: 'Minor Concern', color: 'text-[#FD7E14]' },
    { value: 'major-concern', label: 'Major Concern', color: 'text-[#FF0000]' },
    { value: 'na', label: 'N/A', color: 'text-[#6A0DAD]' }
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Search className="h-8 w-8 text-[#00AEEF]" />
          <div>
            <h1 className="text-2xl font-bold text-[#00AEEF]">Integrated Review Environment</h1>
            <p className="text-[#AAAAAA]">
              Module: {moduleData.moduleName} | Submitted by: {moduleData.submittedBy}
            </p>
          </div>
        </div>
        <Badge className={`${
          moduleData.triageStatus === 'pass' 
            ? 'bg-[#28A745]/20 text-[#28A745] border-[#28A745]/30' 
            : 'bg-[#FF0000]/20 text-[#FF0000] border-[#FF0000]/30'
        }`}>
          Triage QA: {moduleData.triageStatus.toUpperCase()}
        </Badge>
      </div>

      {/* Three-Panel Layout */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Panel 1: File Tree Navigator */}
        <ResizablePanel defaultSize={20} minSize={15}>
          <Card className="h-full bg-[#2C2C2C] border-[#777777]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[#FAFAFA] flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-[#00AEEF]" />
                File Navigator
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                {renderFileTreeNode(fileTree)}
              </div>
            </CardContent>
          </Card>
        </ResizablePanel>

        <ResizableHandle />

        {/* Panel 2: Code Viewer & ZIP Upload */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <Card className="h-full bg-[#2C2C2C] border-[#777777]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[#FAFAFA] flex items-center gap-2">
                <Code className="h-5 w-5 text-[#00AEEF]" />
                Code Display & Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 h-[calc(100%-80px)] flex flex-col">
              {/* ZIP Upload Section */}
              <div className="mb-4 p-4 bg-[#383838] border border-[#777777] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-[#FAFAFA] flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Zipped Code (Optional)
                  </h4>
                  <input
                    type="file"
                    accept=".zip"
                    onChange={handleZipUpload}
                    className="hidden"
                    id="zip-upload"
                  />
                  <label 
                    htmlFor="zip-upload"
                    className="cursor-pointer bg-[#6A0DAD] hover:bg-[#6A0DAD]/80 text-white px-3 py-1 rounded text-sm"
                  >
                    Browse
                  </label>
                </div>
                {uploadedZip ? (
                  <div className="text-sm text-[#00AEEF]">
                    Uploaded: {uploadedZip.name}
                  </div>
                ) : (
                  <div className="text-sm text-[#AAAAAA]">
                    Upload a ZIP file for automated code extraction and review
                  </div>
                )}
              </div>

              {/* Code Display Area */}
              <div className="flex-1">
                <Textarea
                  placeholder={selectedFile 
                    ? `Displaying: ${selectedFile}\n\nReview code on GitHub, or paste code here for reference...`
                    : "Review code on GitHub, or paste code here for reference..."
                  }
                  className="h-full bg-[#1e1e1e] border-[#777777] text-[#E0E0E0] font-mono text-sm resize-none"
                  readOnly
                />
              </div>
            </CardContent>
          </Card>
        </ResizablePanel>

        <ResizableHandle />

        {/* Panel 3: Tabbed Interface */}
        <ResizablePanel defaultSize={30} minSize={25}>
          <Card className="h-full bg-[#2C2C2C] border-[#777777]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[#FAFAFA]">Review Interface</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 h-[calc(100%-80px)]">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-4 bg-[#383838]">
                  <TabsTrigger value="comments" className="text-xs">Comments</TabsTrigger>
                  <TabsTrigger value="ai-qa" className="text-xs">AI QA</TabsTrigger>
                  <TabsTrigger value="decision" className="text-xs">Decision</TabsTrigger>
                  <TabsTrigger value="context" className="text-xs">Context</TabsTrigger>
                </TabsList>

                <TabsContent value="comments" className="flex-1 mt-4">
                  <div className="space-y-4 h-full">
                    <div>
                      <label className="text-sm font-medium text-[#FAFAFA] mb-2 block">
                        Overall SA Comments
                      </label>
                      <Textarea
                        placeholder="Enter your review comments here..."
                        className="bg-[#383838] border-[#777777] text-[#FAFAFA] h-32"
                        value={saFeedback}
                        onChange={(e) => setSaFeedback(e.target.value)}
                      />
                    </div>
                    <div className="bg-[#383838] border border-[#777777] rounded-lg p-3">
                      <h4 className="text-sm font-medium text-[#FAFAFA] mb-2">Inline Comment Threads</h4>
                      <p className="text-sm text-[#AAAAAA]">
                        Future feature: Line-by-line code comments will appear here
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ai-qa" className="flex-1 mt-4">
                  <div className="space-y-4">
                    <div className="bg-[#383838] border border-[#777777] rounded-lg p-4">
                      <h4 className="font-medium text-[#FAFAFA] mb-2">Triage QA Summary</h4>
                      <p className="text-sm text-[#E0E0E0] mb-3">{moduleData.aiReviewSummary}</p>
                      <div className="text-sm text-[#AAAAAA]">
                        <strong>Founder Notes:</strong> {moduleData.triageNotes}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="decision" className="flex-1 mt-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-[#FAFAFA] mb-3">Enterprise-Grade Checklist</h4>
                      <div className="space-y-3">
                        {checklistCategories.map((category) => (
                          <div key={category.key} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <category.icon className={`h-4 w-4 ${category.color}`} />
                              <label className="text-sm font-medium text-[#FAFAFA]">
                                {category.title}
                              </label>
                            </div>
                            <Select 
                              value={checklistState[category.key as keyof typeof checklistState]} 
                              onValueChange={(value) => updateChecklistItem(category.key, value)}
                            >
                              <SelectTrigger className="bg-[#383838] border-[#777777] text-[#FAFAFA] h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {checklistOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    <span className={option.color}>{option.label}</span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#FAFAFA]">SA Decision</label>
                      <Select value={saDecision} onValueChange={setSaDecision}>
                        <SelectTrigger className="bg-[#383838] border-[#777777] text-[#FAFAFA]">
                          <SelectValue placeholder="Select decision" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="approved">
                            <span className="text-[#28A745]">Approved</span>
                          </SelectItem>
                          <SelectItem value="revision">
                            <span className="text-[#FF0000]">Revision Required</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={submitSADecision}
                      className="w-full bg-[#28A745] hover:bg-[#28A745]/80 text-white"
                      disabled={!saDecision}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Submit SA Decision
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="context" className="flex-1 mt-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-[#FAFAFA] mb-3">Context & Artifacts</h4>
                    <div className="space-y-2">
                      {[
                        { title: 'View PRD', icon: FileText },
                        { title: 'View Test Scripts', icon: TestTube },
                        { title: 'GitHub Branch', icon: Code },
                        { title: 'Code Kernel v0.1', icon: Database },
                        { title: 'Project Context', icon: Info }
                      ].map((item) => (
                        <button
                          key={item.title}
                          className="flex items-center gap-2 w-full text-left p-2 hover:bg-[#383838] rounded text-sm text-[#00AEEF]"
                        >
                          <item.icon className="h-4 w-4" />
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default IntegratedReviewEnvironment;
