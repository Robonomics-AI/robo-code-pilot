import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Upload, Search, Download, Plus, Filter, Info } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

/**
 * Document Management interface for RoboCode platform with multi-project support
 * Handles document storage, categorization, and access across project contexts
 */
interface Document {
  id: number;
  title: string;
  category: string;
  uploadDate: string;
  fileSize: string;
  description: string;
  uploadedBy: string;
  tags: string[];
  project: string;
  version?: string;
}

const DocumentManager: React.FC = () => {
  // Document state management with expanded sample data
  const [allDocuments, setAllDocuments] = useState<Document[]>([
    {
      id: 1,
      title: "RoboCode_Platform_PRD_v1.2.pdf",
      category: "prd",
      uploadDate: "2025-05-15",
      fileSize: "2.4 MB",
      description: "Comprehensive Product Requirements Document (PRD) for RoboCode platform including Dark Mode specifications and multi-project support",
      uploadedBy: "Samir Sinha",
      tags: ["PRD", "v1.2", "Dark Mode", "MVP", "Multi-Project"],
      project: "RoboCode Internal Build",
      version: "v1.2"
    },
    {
      id: 2,
      title: "Internal_Kernel_Architecture.pdf",
      category: "kernel",
      uploadDate: "2025-05-01",
      fileSize: "1.8 MB",
      description: "RoboCode Internal Code Kernel v0.1 architecture documentation and implementation guidelines for consistent development practices",
      uploadedBy: "Amal David",
      tags: ["Kernel", "Architecture", "v0.1", "Guidelines", "SDLC"],
      project: "RoboCode Internal Build",
      version: "v0.1"
    },
    {
      id: 3,
      title: "Dark_Mode_Design_System.pdf",
      category: "design",
      uploadDate: "2025-05-10",
      fileSize: "3.2 MB",
      description: "Comprehensive design system documentation for RoboCode dark mode User Interface/User Experience (UI/UX) standards and components",
      uploadedBy: "Samir Sinha",
      tags: ["Design System", "Dark Mode", "UI/UX", "Components", "Branding"],
      project: "RoboCode Internal Build",
      version: "v1.0"
    },
    {
      id: 4,
      title: "Typography_Guidelines.pdf",
      category: "design",
      uploadDate: "2025-05-12",
      fileSize: "1.1 MB",
      description: "Typography standards, font hierarchy, and usage guidelines for RoboCode platform following Inter font family specifications",
      uploadedBy: "Samir Sinha",
      tags: ["Typography", "Fonts", "Guidelines", "Standards", "Inter"],
      project: "RoboCode Internal Build",
      version: "v1.0"
    },
    {
      id: 5,
      title: "Security_Practices_Compliance.pdf",
      category: "security",
      uploadDate: "2025-05-08",
      fileSize: "2.1 MB",
      description: "Security practices and compliance requirements documentation for regulated software development using RoboCode platform",
      uploadedBy: "Amal David",
      tags: ["Security", "Compliance", "Best Practices", "Regulated", "Standards"],
      project: "RoboCode Internal Build",
      version: "v1.0"
    },
    {
      id: 6,
      title: "User_Personas_Definition.pdf",
      category: "personas",
      uploadDate: "2025-05-14",
      fileSize: "1.5 MB",
      description: "Detailed user personas including Founder/Product Owner and Solution Architect (SA) roles with specific needs and workflows",
      uploadedBy: "Samir Sinha",
      tags: ["User Personas", "Founder", "SA", "Workflows", "Requirements"],
      project: "RoboCode Internal Build",
      version: "v1.1"
    }
  ]);

  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(allDocuments);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  // New document form state with project context
  const [newDocument, setNewDocument] = useState({
    title: '',
    category: '',
    description: '',
    tags: '',
    version: ''
  });

  /**
   * Enhanced category mapping with all PRD v1.2 specified types
   */
  const categoryMap: { [key: string]: string } = {
    'all': 'All Documents',
    'brd': 'Business Requirements Documents (BRDs)',
    'prd': 'Product Requirements Documents (PRDs)',
    'techspec': 'Technical Specifications',
    'kernel': 'Code Kernels',
    'context': 'Context Summaries',
    'userflow': 'User Flow & Test Scripts',
    'design': 'Style Guides & Design Docs',
    'api': 'API Documentation',
    'database': 'Database Schema',
    'versioncontrol': 'Version Control Practices',
    'security': 'Security Practices',
    'compliance': 'Compliance Requirements',
    'testing': 'Testing Guidelines',
    'deployment': 'Deployment Instructions',
    'envsetup': 'Environment Setup',
    'overview': 'Project Overview',
    'personas': 'User Personas'
  };

  /**
   * Filter documents based on active category and search term
   */
  const filterDocuments = (category: string, search: string) => {
    let filtered = allDocuments;

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(doc => doc.category === category);
    }

    // Filter by search term
    if (search) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.description.toLowerCase().includes(search.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    setFilteredDocuments(filtered);
    console.log(`[ROBOCODE][DocumentManager]: Filtered documents - Category: ${category}, Search: "${search}", Results: ${filtered.length}`);
  };

  /**
   * Handle category change from sidebar navigation
   */
  useEffect(() => {
    const handleCategoryChange = (event: any) => {
      const category = event.detail.category;
      setActiveCategory(category);
      filterDocuments(category, searchTerm);
    };

    window.addEventListener('documentCategoryChange', handleCategoryChange);
    return () => window.removeEventListener('documentCategoryChange', handleCategoryChange);
  }, [searchTerm]);

  /**
   * Handle search input changes
   */
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    filterDocuments(activeCategory, value);
  };

  /**
   * Handle new document form submission with multi-project context
   */
  const handleUploadDocument = () => {
    if (!newDocument.title || !newDocument.category) {
      toast("Please fill in required fields (Title and Category)");
      return;
    }

    const documentToAdd: Document = {
      id: allDocuments.length + 1,
      title: newDocument.title,
      category: newDocument.category,
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: "1.0 MB", // Simulated file size
      description: newDocument.description || "No description provided",
      uploadedBy: "Samir Sinha",
      tags: newDocument.tags ? newDocument.tags.split(',').map(tag => tag.trim()) : [],
      project: "RoboCode Internal Build", // Current project context
      version: newDocument.version || "v1.0"
    };

    // Update documents state
    const updatedDocuments = [...allDocuments, documentToAdd];
    setAllDocuments(updatedDocuments);
    
    // Re-filter with current settings
    filterDocuments(activeCategory, searchTerm);

    // Simulate saving to manifest
    console.log('[ROBOCODE][DocumentManager]: SIMULATED_SAVE: documents_manifest.json', JSON.stringify(updatedDocuments, null, 2));

    // Reset form and close modal
    setNewDocument({ title: '', category: '', description: '', tags: '', version: '' });
    setIsUploadModalOpen(false);
    
    toast("Document information saved successfully!");
  };

  /**
   * Get category badge color with enhanced color mapping
   */
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'brd': 'bg-blue-500/20 text-blue-400',
      'prd': 'bg-blue-600/20 text-blue-300',
      'techspec': 'bg-cyan-500/20 text-cyan-400',
      'kernel': 'bg-green-500/20 text-green-400',
      'context': 'bg-indigo-500/20 text-indigo-400',
      'userflow': 'bg-purple-500/20 text-purple-400',
      'design': 'bg-pink-500/20 text-pink-400',
      'api': 'bg-emerald-500/20 text-emerald-400',
      'database': 'bg-teal-500/20 text-teal-400',
      'versioncontrol': 'bg-violet-500/20 text-violet-400',
      'security': 'bg-red-500/20 text-red-400',
      'compliance': 'bg-orange-500/20 text-orange-400',
      'testing': 'bg-lime-500/20 text-lime-400',
      'deployment': 'bg-amber-500/20 text-amber-400',
      'envsetup': 'bg-slate-500/20 text-slate-400',
      'overview': 'bg-zinc-500/20 text-zinc-400',
      'personas': 'bg-rose-500/20 text-rose-400'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400';
  };

  // Initialize component logging
  useEffect(() => {
    console.log('[ROBOCODE][DocumentManager]: Component initialized with documents:', allDocuments);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header with Multi-Project Context */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold text-[var(--color-accent-cyan)]">All Documents</h1>
            <Info className="h-6 w-6 text-[var(--color-accent-cyan)] bg-[var(--color-card-bg)] rounded-full p-1" title="Document repository for the current project with categorized organization and search capabilities" />
          </div>
          <p className="text-lg text-[var(--color-neutral-offwhite)]">
            Project: <span className="font-semibold text-[var(--color-accent-cyan)]">RoboCode Internal Build</span> - 
            Showing: {categoryMap[activeCategory]} ({filteredDocuments.length} documents)
          </p>
        </div>
        
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110" title="Upload new document information to the repository">
              <Plus className="h-4 w-4 mr-2" />
              Upload Document Info
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#2C2C2C] border-[#444444] text-[var(--color-neutral-offwhite)]">
            <DialogHeader>
              <DialogTitle className="text-[var(--color-accent-cyan)]">Upload New Document Information</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {/* Project Context Display */}
              <div>
                <Label htmlFor="project" className="text-[var(--color-neutral-offwhite)]">Project Context</Label>
                <Select value="robocode-internal" disabled>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="RoboCode Internal Build" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="robocode-internal">RoboCode Internal Build</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-[var(--color-neutral-mid)] mt-1">
                  <Info className="inline h-3 w-3 mr-1" title="Future versions will support multiple project contexts" />
                  Future versions will support multiple project selection
                </p>
              </div>

              <div>
                <Label htmlFor="title" className="text-[var(--color-neutral-offwhite)]">Document Title *</Label>
                <Input
                  id="title"
                  value={newDocument.title}
                  onChange={(e) => setNewDocument({...newDocument, title: e.target.value})}
                  placeholder="e.g., RoboCode_BRD_v2.0.pdf"
                  className="mt-1"
                  title="Enter the document filename or title"
                />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Label htmlFor="category" className="text-[var(--color-neutral-offwhite)]">Category *</Label>
                  <Info className="h-3 w-3 text-[var(--color-accent-cyan)]" title="Select the most specific category that matches your document type" />
                </div>
                <Select value={newDocument.category} onValueChange={(value) => setNewDocument({...newDocument, category: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="brd">Business Requirements Documents (BRDs)</SelectItem>
                    <SelectItem value="prd">Product Requirements Documents (PRDs)</SelectItem>
                    <SelectItem value="techspec">Technical Specifications</SelectItem>
                    <SelectItem value="kernel">Code Kernels</SelectItem>
                    <SelectItem value="context">Context Summaries</SelectItem>
                    <SelectItem value="userflow">User Flow & Test Scripts</SelectItem>
                    <SelectItem value="design">Style Guides & Design Docs</SelectItem>
                    <SelectItem value="api">API Documentation</SelectItem>
                    <SelectItem value="database">Database Schema</SelectItem>
                    <SelectItem value="versioncontrol">Version Control Practices</SelectItem>
                    <SelectItem value="security">Security Practices</SelectItem>
                    <SelectItem value="compliance">Compliance Requirements</SelectItem>
                    <SelectItem value="testing">Testing Guidelines</SelectItem>
                    <SelectItem value="deployment">Deployment Instructions</SelectItem>
                    <SelectItem value="envsetup">Environment Setup</SelectItem>
                    <SelectItem value="overview">Project Overview</SelectItem>
                    <SelectItem value="personas">User Personas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Label htmlFor="version" className="text-[var(--color-neutral-offwhite)]">Version</Label>
                  <Info className="h-3 w-3 text-[var(--color-accent-cyan)]" title="Suggest format: v1.0, v1.0.1-draft, v2.0-final" />
                </div>
                <Input
                  id="version"
                  value={newDocument.version}
                  onChange={(e) => setNewDocument({...newDocument, version: e.target.value})}
                  placeholder="e.g., v1.0, v1.0.1-draft"
                  className="mt-1"
                  title="Enter document version using suggested format"
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="text-[var(--color-neutral-offwhite)]">Description</Label>
                <Textarea
                  id="description"
                  value={newDocument.description}
                  onChange={(e) => setNewDocument({...newDocument, description: e.target.value})}
                  placeholder="Brief description of the document content and purpose..."
                  className="mt-1"
                  rows={3}
                  title="Provide a detailed description of the document content"
                />
              </div>
              
              <div>
                <Label htmlFor="tags" className="text-[var(--color-neutral-offwhite)]">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={newDocument.tags}
                  onChange={(e) => setNewDocument({...newDocument, tags: e.target.value})}
                  placeholder="e.g., MVP, v1.0, UI, Documentation, SDLC"
                  className="mt-1"
                  title="Add searchable tags separated by commas"
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsUploadModalOpen(false)} title="Cancel document upload">
                  Cancel
                </Button>
                <Button onClick={handleUploadDocument} className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)]" title="Save document information to repository">
                  Save Document Info
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="border border-[#444444]">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--color-neutral-mid)]" />
              <Input
                placeholder="Search documents by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
                title="Search across all document fields including title, description, and tags"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-neutral-mid)]">
              <Filter className="h-4 w-4" />
              <span>Filter by category using sidebar</span>
              <Info className="h-4 w-4 text-[var(--color-accent-cyan)]" title="Use the document categories in the sidebar navigation to filter by document type" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <FileText className="h-8 w-8 text-[var(--color-accent-cyan)]" title="Document file" />
                <div className="flex flex-col gap-2">
                  <Badge className={getCategoryColor(document.category)}>
                    {categoryMap[document.category]}
                  </Badge>
                  {document.version && (
                    <Badge variant="outline" className="text-xs">
                      {document.version}
                    </Badge>
                  )}
                </div>
              </div>
              <CardTitle className="text-base text-[var(--color-neutral-offwhite)] break-words">
                {document.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-[var(--color-neutral-mid)] line-clamp-3">
                {document.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {document.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs" title={`Document tagged with: ${tag}`}>
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="text-xs text-[var(--color-neutral-mid)] space-y-1">
                <div>Project: {document.project}</div>
                <div>Uploaded by: {document.uploadedBy}</div>
                <div>Date: {document.uploadDate}</div>
                <div>Size: {document.fileSize}</div>
              </div>
              
              <Button className="w-full bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110" title="Download document file">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <Card className="border border-[#444444]">
          <CardContent className="p-12 text-center">
            <FileText className="h-16 w-16 text-[var(--color-neutral-mid)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[var(--color-neutral-offwhite)] mb-2">
              No documents found
            </h3>
            <p className="text-[var(--color-neutral-mid)] mb-4">
              {searchTerm 
                ? `No documents match your search "${searchTerm}" in ${categoryMap[activeCategory]}.`
                : `No documents in ${categoryMap[activeCategory]} category.`
              }
            </p>
            <Button onClick={() => setIsUploadModalOpen(true)} className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)]" title="Upload first document">
              <Plus className="h-4 w-4 mr-2" />
              Upload First Document
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentManager;
