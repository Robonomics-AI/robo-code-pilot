
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Upload, Download, Filter, Plus, CheckCircle, Clock, AlertCircle, Info, FileText } from 'lucide-react';

/**
 * Enhanced Document Manager with status indicators and improved categorization
 * Features comprehensive document management with visual status cues and filtering
 */
const DocumentManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'RoboCode PRD v1.2',
      category: 'prd',
      version: 'v1.2',
      uploader: 'Samir Sinha',
      uploadDate: '2025-05-20',
      size: '2.4 MB',
      description: 'Comprehensive Product Requirements Document for RoboCode Platform with Dark Mode specifications',
      status: 'current' // current, outdated, missing
    },
    {
      id: 2,
      name: 'Business Requirements Analysis',
      category: 'brd',
      version: 'v1.0',
      uploader: 'Samir Sinha',
      uploadDate: '2025-05-18',
      size: '1.8 MB',
      description: 'Initial business requirements and market analysis for RoboCode development',
      status: 'current'
    },
    {
      id: 3,
      name: 'Dark Mode UI Style Guide',
      category: 'design',
      version: 'v1.1',
      uploader: 'Amal David',
      uploadDate: '2025-05-19',
      size: '3.2 MB',
      description: 'Comprehensive dark mode design system and component specifications',
      status: 'current'
    },
    {
      id: 4,
      name: 'Code Kernel v0.1',
      category: 'kernel',
      version: 'v0.1',
      uploader: 'Amal David',
      uploadDate: '2025-05-15',
      size: '856 KB',
      description: 'Foundational code standards and architectural patterns for RoboCode development',
      status: 'outdated'
    },
    {
      id: 5,
      name: 'Security Practices Guide',
      category: 'security',
      version: 'v1.0',
      uploader: 'Amal David',
      uploadDate: '2025-05-10',
      size: '1.2 MB',
      description: 'Security guidelines and best practices for development workflow',
      status: 'current'
    },
    {
      id: 6,
      name: 'User Personas & Journey Maps',
      category: 'personas',
      version: 'v1.0',
      uploader: 'Samir Sinha',
      uploadDate: '2025-05-12',
      size: '2.1 MB',
      description: 'Detailed user personas for Founder and Solution Architect roles',
      status: 'current'
    },
    // Placeholder for missing required documents
    {
      id: 7,
      name: 'API Documentation (Required)',
      category: 'api',
      version: 'N/A',
      uploader: 'Not uploaded',
      uploadDate: 'N/A',
      size: 'N/A',
      description: 'API documentation is required for the project but has not been uploaded yet',
      status: 'missing'
    },
    {
      id: 8,
      name: 'Deployment Instructions (Required)',
      category: 'deployment',
      version: 'N/A',
      uploader: 'Not uploaded',
      uploadDate: 'N/A',
      size: 'N/A',
      description: 'Deployment instructions are required for production readiness',
      status: 'missing'
    }
  ]);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    category: '',
    version: '',
    description: '',
    file: null as File | null
  });

  // Enhanced document categories
  const documentCategories = [
    { value: 'all', label: 'All Documents', count: documents.length },
    { value: 'brd', label: 'Business Requirements Documents', count: documents.filter(d => d.category === 'brd').length },
    { value: 'prd', label: 'Product Requirements Documents', count: documents.filter(d => d.category === 'prd').length },
    { value: 'techspec', label: 'Technical Specifications', count: documents.filter(d => d.category === 'techspec').length },
    { value: 'kernel', label: 'Code Kernels', count: documents.filter(d => d.category === 'kernel').length },
    { value: 'context', label: 'Context Summaries', count: documents.filter(d => d.category === 'context').length },
    { value: 'userflow', label: 'User Flow & Test Scripts', count: documents.filter(d => d.category === 'userflow').length },
    { value: 'design', label: 'Style Guides & Design Docs', count: documents.filter(d => d.category === 'design').length },
    { value: 'api', label: 'API Documentation', count: documents.filter(d => d.category === 'api').length },
    { value: 'database', label: 'Database Schema', count: documents.filter(d => d.category === 'database').length },
    { value: 'security', label: 'Security Practices', count: documents.filter(d => d.category === 'security').length },
    { value: 'compliance', label: 'Compliance Requirements', count: documents.filter(d => d.category === 'compliance').length },
    { value: 'testing', label: 'Testing Guidelines', count: documents.filter(d => d.category === 'testing').length },
    { value: 'deployment', label: 'Deployment Instructions', count: documents.filter(d => d.category === 'deployment').length },
    { value: 'envsetup', label: 'Environment Setup', count: documents.filter(d => d.category === 'envsetup').length },
    { value: 'overview', label: 'Project Overview', count: documents.filter(d => d.category === 'overview').length },
    { value: 'personas', label: 'User Personas', count: documents.filter(d => d.category === 'personas').length },
    { value: 'versioncontrol', label: 'Version Control Practices', count: documents.filter(d => d.category === 'versioncontrol').length }
  ];

  // Status indicator helpers
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'current':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'outdated':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'missing':
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'current':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Current</Badge>;
      case 'outdated':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Needs Update</Badge>;
      case 'missing':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Required</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Unknown</Badge>;
    }
  };

  const getStatusTooltip = (status: string) => {
    switch (status) {
      case 'current':
        return 'Document is current and reviewed';
      case 'outdated':
        return 'Document exists but may need updating due to related code changes';
      case 'missing':
        return 'This document type is required for the project but not yet uploaded';
      default:
        return 'Document status unknown';
    }
  };

  // Filter documents based on search and category
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Listen for category changes from global navigation
  useEffect(() => {
    const handleCategoryChange = (event: CustomEvent) => {
      const { category } = event.detail;
      setSelectedCategory(category);
    };

    window.addEventListener('documentCategoryChange', handleCategoryChange as EventListener);
    return () => {
      window.removeEventListener('documentCategoryChange', handleCategoryChange as EventListener);
    };
  }, []);

  // Handle document upload
  const handleUpload = () => {
    if (!uploadForm.name || !uploadForm.category) {
      alert('Please fill in all required fields');
      return;
    }

    const newDocument = {
      id: documents.length + 1,
      name: uploadForm.name,
      category: uploadForm.category,
      version: uploadForm.version || 'v1.0',
      uploader: 'Samir Sinha',
      uploadDate: new Date().toISOString().split('T')[0],
      size: uploadForm.file ? `${(uploadForm.file.size / 1024 / 1024).toFixed(1)} MB` : '0 KB',
      description: uploadForm.description || 'No description provided',
      status: 'current'
    };

    setDocuments([...documents, newDocument]);
    console.log('[ROBOCODE][DocumentManager]: New document uploaded:', JSON.stringify(newDocument));

    // Reset form and close modal
    setUploadForm({ name: '', category: '', version: '', description: '', file: null });
    setIsUploadModalOpen(false);
  };

  const handleDownload = (documentId: number, documentName: string) => {
    console.log(`[ROBOCODE][DocumentManager]: Download requested for document ${documentId}: ${documentName}`);
    // Placeholder for actual download functionality
  };

  return (
    <div className="space-y-6">
      {/* Enhanced search and filter controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--color-neutral-mid)]" />
            <Input
              placeholder="Search documents by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              title="Search through all documents by name, description, or content"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {documentCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label} ({category.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Enhanced upload button */}
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogTrigger asChild>
            <Button className="robo-button-primary flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Upload Document Info
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)]">
            <DialogHeader>
              <DialogTitle className="text-[var(--color-neutral-offwhite)] flex items-center gap-2">
                <span title="Add new document information to the project repository">
                  <FileText className="h-5 w-5 text-[var(--color-accent-cyan)]" />
                </span>
                Upload New Document Info
              </DialogTitle>
              <p className="text-sm text-[var(--color-neutral-mid)]">
                Add document metadata to the project. For MVP, this stores document information for tracking.
              </p>
            </DialogHeader>
            <div className="space-y-4">
              {/* Project context display */}
              <div className="bg-[var(--color-input-bg)] p-3 rounded-lg border border-[var(--color-border-subtle)]">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[var(--color-neutral-mid)]">Project:</span>
                  <span className="text-sm font-medium text-[var(--color-accent-cyan)]">RoboCode Internal Build</span>
                  <span title="Documents are automatically associated with the current active project">
                    <Info className="h-4 w-4 text-[var(--color-accent-cyan)]" />
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="doc-name">Document Name *</Label>
                <Input
                  id="doc-name"
                  placeholder="e.g., API Documentation v2.1"
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm({...uploadForm, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="doc-category">Category *</Label>
                  <span title="Document category helps with organization and filtering. Choose the most appropriate category for easy discovery.">
                    <Info className="h-3 w-3 text-[var(--color-accent-cyan)]" />
                  </span>
                </div>
                <Select value={uploadForm.category} onValueChange={(value) => setUploadForm({...uploadForm, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document category" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentCategories.filter(cat => cat.value !== 'all').map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="doc-version">Version</Label>
                  <span title="Document version helps track changes and ensures team members reference the latest version. Use semantic versioning (e.g., v1.0, v1.1, v2.0).">
                    <Info className="h-3 w-3 text-[var(--color-accent-cyan)]" />
                  </span>
                </div>
                <Input
                  id="doc-version"
                  placeholder="e.g., v1.0"
                  value={uploadForm.version}
                  onChange={(e) => setUploadForm({...uploadForm, version: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doc-description">Description</Label>
                <Textarea
                  id="doc-description"
                  placeholder="Brief description of the document content and purpose..."
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doc-file">File (Optional)</Label>
                <Input
                  id="doc-file"
                  type="file"
                  onChange={(e) => setUploadForm({...uploadForm, file: e.target.files?.[0] || null})}
                />
                <p className="text-xs text-[var(--color-neutral-mid)]">
                  For MVP: File upload simulated. In production, files would be stored in cloud storage.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleUpload} className="flex-1 robo-button-primary">
                  Save Document Info
                </Button>
                <Button variant="outline" onClick={() => setIsUploadModalOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Enhanced document stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-neutral-mid)]">Total Documents</p>
                <p className="text-2xl font-bold text-[var(--color-accent-cyan)]">{documents.length}</p>
              </div>
              <span title="Total number of documents in the project">
                <FileText className="h-6 w-6 text-[var(--color-accent-cyan)]/50" />
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-neutral-mid)]">Current</p>
                <p className="text-2xl font-bold text-green-400">{documents.filter(d => d.status === 'current').length}</p>
              </div>
              <span title="Documents that are current and up-to-date">
                <CheckCircle className="h-6 w-6 text-green-400/50" />
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-neutral-mid)]">Need Updates</p>
                <p className="text-2xl font-bold text-yellow-400">{documents.filter(d => d.status === 'outdated').length}</p>
              </div>
              <span title="Documents that may need updating">
                <Clock className="h-6 w-6 text-yellow-400/50" />
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-neutral-mid)]">Required</p>
                <p className="text-2xl font-bold text-red-400">{documents.filter(d => d.status === 'missing').length}</p>
              </div>
              <span title="Required documents not yet uploaded">
                <AlertCircle className="h-6 w-6 text-red-400/50" />
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced document list with status indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className={`hover-lift ${doc.status === 'missing' ? 'border-red-500/30' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <span title={getStatusTooltip(doc.status)}>
                    {getStatusIcon(doc.status)}
                  </span>
                  <CardTitle className="text-base text-[var(--color-neutral-offwhite)] line-clamp-2">
                    {doc.name}
                  </CardTitle>
                </div>
                {getStatusBadge(doc.status)}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-[var(--color-neutral-mid)] mb-3 line-clamp-2">
                {doc.description}
              </p>
              
              <div className="space-y-2 text-xs text-[var(--color-neutral-mid)]">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <Badge variant="outline" className="text-xs">
                    {documentCategories.find(cat => cat.value === doc.category)?.label.split(' ')[0] || doc.category}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span>{doc.version}</span>
                </div>
                <div className="flex justify-between">
                  <span>Uploader:</span>
                  <span>{doc.uploader}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{doc.uploadDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>{doc.size}</span>
                </div>
              </div>

              {doc.status !== 'missing' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 flex items-center gap-2"
                  onClick={() => handleDownload(doc.id, doc.name)}
                  title={`Download ${doc.name}`}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              )}
              {doc.status === 'missing' && (
                <Button
                  className="w-full mt-4 robo-button-primary text-sm"
                  onClick={() => setIsUploadModalOpen(true)}
                  title="Upload this required document"
                >
                  Upload Required Document
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced empty state */}
      {filteredDocuments.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <span title="No documents found matching current filters">
              <FileText className="h-16 w-16 text-[var(--color-neutral-mid)] mx-auto mb-4" />
            </span>
            <h3 className="text-lg font-semibold text-[var(--color-neutral-offwhite)] mb-2">
              No documents found
            </h3>
            <p className="text-[var(--color-neutral-mid)] mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'No documents match your current search or filter criteria.'
                : 'No documents have been uploaded yet. Start by uploading your first document.'}
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('all');}} 
                variant="outline"
                title="Clear all filters and show all documents"
              >
                Clear Filters
              </Button>
              <Button 
                onClick={() => setIsUploadModalOpen(true)} 
                className="robo-button-primary"
                title="Upload a new document to the project"
              >
                Upload Document
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentManager;
