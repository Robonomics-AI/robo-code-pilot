
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Upload, Search, Download, Plus, Filter } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

/**
 * Document Management interface for RoboCode platform
 * Handles document storage, categorization, and access
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
}

const DocumentManager: React.FC = () => {
  // Document state management
  const [allDocuments, setAllDocuments] = useState<Document[]>([
    {
      id: 1,
      title: "RoboCode_Platform_PRD_v1.2.pdf",
      category: "pr",
      uploadDate: "2025-05-15",
      fileSize: "2.4 MB",
      description: "Comprehensive Product Requirements Document for RoboCode platform including Dark Mode specifications",
      uploadedBy: "Samir Sinha",
      tags: ["PRD", "v1.2", "Dark Mode", "MVP"]
    },
    {
      id: 2,
      title: "Internal_Kernel_Architecture.pdf",
      category: "kernel",
      uploadDate: "2025-05-01",
      fileSize: "1.8 MB",
      description: "RoboCode Internal Code Kernel v0.1 architecture documentation and implementation guidelines",
      uploadedBy: "Amal David",
      tags: ["Kernel", "Architecture", "v0.1", "Guidelines"]
    },
    {
      id: 3,
      title: "Dark_Mode_Design_System.pdf",
      category: "design",
      uploadDate: "2025-05-10",
      fileSize: "3.2 MB",
      description: "Comprehensive design system documentation for RoboCode dark mode UI/UX standards and components",
      uploadedBy: "Samir Sinha",
      tags: ["Design System", "Dark Mode", "UI/UX", "Components"]
    },
    {
      id: 4,
      title: "Typography_Guidelines.pdf",
      category: "design",
      uploadDate: "2025-05-12",
      fileSize: "1.1 MB",
      description: "Typography standards, font hierarchy, and usage guidelines for RoboCode platform",
      uploadedBy: "Samir Sinha",
      tags: ["Typography", "Fonts", "Guidelines", "Standards"]
    }
  ]);

  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(allDocuments);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  // New document form state
  const [newDocument, setNewDocument] = useState({
    title: '',
    category: '',
    description: '',
    tags: ''
  });

  /**
   * Category mapping for display and filtering
   */
  const categoryMap: { [key: string]: string } = {
    'all': 'All Documents',
    'pr': 'PRDs & BRDs',
    'kernel': 'Code Kernels',
    'design': 'Style Guides & Design Docs',
    'arch': 'Architecture'
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
   * Handle new document form submission
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
      tags: newDocument.tags ? newDocument.tags.split(',').map(tag => tag.trim()) : []
    };

    // Update documents state
    const updatedDocuments = [...allDocuments, documentToAdd];
    setAllDocuments(updatedDocuments);
    
    // Re-filter with current settings
    filterDocuments(activeCategory, searchTerm);

    // Simulate saving to manifest
    console.log('[ROBOCODE][DocumentManager]: SIMULATED_SAVE: documents_manifest.json', JSON.stringify(updatedDocuments, null, 2));

    // Reset form and close modal
    setNewDocument({ title: '', category: '', description: '', tags: '' });
    setIsUploadModalOpen(false);
    
    toast("Document information saved successfully!");
  };

  /**
   * Get category badge color
   */
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'pr': 'bg-blue-500/20 text-blue-400',
      'kernel': 'bg-green-500/20 text-green-400',
      'design': 'bg-purple-500/20 text-purple-400',
      'arch': 'bg-orange-500/20 text-orange-400'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400';
  };

  // Initialize component logging
  useEffect(() => {
    console.log('[ROBOCODE][DocumentManager]: Component initialized with documents:', allDocuments);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-accent-cyan)] mb-3">Document Manager</h1>
          <p className="text-lg text-[var(--color-neutral-offwhite)]">
            Showing: {categoryMap[activeCategory]} ({filteredDocuments.length} documents)
          </p>
        </div>
        
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110">
              <Plus className="h-4 w-4 mr-2" />
              Upload Document Info
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#2C2C2C] border-[#444444] text-[var(--color-neutral-offwhite)]">
            <DialogHeader>
              <DialogTitle className="text-[var(--color-accent-cyan)]">Upload New Document Information</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title" className="text-[var(--color-neutral-offwhite)]">Document Title *</Label>
                <Input
                  id="title"
                  value={newDocument.title}
                  onChange={(e) => setNewDocument({...newDocument, title: e.target.value})}
                  placeholder="e.g., RoboCode_BRD_v2.0.pdf"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="category" className="text-[var(--color-neutral-offwhite)]">Category *</Label>
                <Select value={newDocument.category} onValueChange={(value) => setNewDocument({...newDocument, category: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pr">PRDs & BRDs</SelectItem>
                    <SelectItem value="kernel">Code Kernels</SelectItem>
                    <SelectItem value="design">Style Guides & Design Docs</SelectItem>
                    <SelectItem value="arch">Architecture</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description" className="text-[var(--color-neutral-offwhite)]">Description</Label>
                <Textarea
                  id="description"
                  value={newDocument.description}
                  onChange={(e) => setNewDocument({...newDocument, description: e.target.value})}
                  placeholder="Brief description of the document content..."
                  className="mt-1"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="tags" className="text-[var(--color-neutral-offwhite)]">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={newDocument.tags}
                  onChange={(e) => setNewDocument({...newDocument, tags: e.target.value})}
                  placeholder="e.g., MVP, v1.0, UI, Documentation"
                  className="mt-1"
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUploadDocument} className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)]">
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
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-neutral-mid)]">
              <Filter className="h-4 w-4" />
              <span>Filter by category using sidebar</span>
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
                <FileText className="h-8 w-8 text-[var(--color-accent-cyan)]" />
                <Badge className={getCategoryColor(document.category)}>
                  {categoryMap[document.category]}
                </Badge>
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
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="text-xs text-[var(--color-neutral-mid)] space-y-1">
                <div>Uploaded by: {document.uploadedBy}</div>
                <div>Date: {document.uploadDate}</div>
                <div>Size: {document.fileSize}</div>
              </div>
              
              <Button className="w-full bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110">
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
            <Button onClick={() => setIsUploadModalOpen(true)} className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)]">
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
