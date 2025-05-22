
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, FileText } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Document, DocumentCategory } from '@/utils/types';
import { DocumentService } from '@/utils/dataService';
import Header from '@/components/layout/Header';

const DOCUMENT_CATEGORIES = [
  "BRD (Business Requirements)",
  "PRD (Product Requirements)",
  "TechSpec (Technical Specs)",
  "Kernel (Code Kernel)",
  "ContextSummary",
  "UserFlowTestScript"
] as DocumentCategory[];

const DocumentManager = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form state
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState<DocumentCategory>(DOCUMENT_CATEGORIES[0]);
  const [version, setVersion] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Load initial documents from our service
    const allDocs = DocumentService.getAllDocuments();
    setDocuments(allDocs);
  }, []);

  const filteredDocuments = currentCategory
    ? documents.filter(doc => doc.category === currentCategory)
    : documents;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const resetForm = () => {
    setFileName("");
    setSelectedFile(null);
    setCategory(DOCUMENT_CATEGORIES[0]);
    setVersion("");
    setDescription("");
  };

  const handleSubmit = () => {
    if (!fileName || !version) {
      toast.error("Please fill all required fields");
      return;
    }

    // Add a new document using our service
    const newDocument = DocumentService.addDocument({
      name: fileName,
      category,
      version,
      dateAdded: new Date().toLocaleDateString(),
      description: description || undefined
    });

    // Update our state with the new document
    setDocuments([...documents, newDocument]);
    setIsDialogOpen(false);
    resetForm();
    toast.success("Document information added successfully");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <div className="container flex flex-1 mt-6">
        {/* Sidebar with refined styling */}
        <aside className="w-64 bg-[#1e1e1e] rounded-lg border border-[#333333] p-5 mr-6">
          <h3 className="text-lg font-semibold text-[var(--color-accent-cyan)] mb-4">Document Navigator</h3>
          <nav>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setCurrentCategory(null)}
                  className={`w-full text-left p-3 rounded transition-all duration-200 ${
                    currentCategory === null
                      ? "font-semibold border-l-4 border-[var(--color-accent-cyan)] bg-[#2C2C2C] text-[var(--color-accent-cyan)]"
                      : "font-medium text-[var(--color-neutral-offwhite)] hover:bg-[#2C2C2C)] hover:font-semibold"
                  }`}
                >
                  All Documents
                </button>
              </li>
              {DOCUMENT_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setCurrentCategory(cat)}
                    className={`w-full text-left p-3 rounded transition-all duration-200 ${
                      currentCategory === cat
                        ? "font-semibold border-l-4 border-[var(--color-accent-cyan)] bg-[#2C2C2C] text-[var(--color-accent-cyan)]"
                        : "font-medium text-[var(--color-neutral-offwhite)] hover:bg-[#2C2C2C] hover:font-semibold"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content with improved table styling */}
        <main className="flex-1 p-6 bg-[#121212] rounded-lg border border-[#333333]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[var(--color-neutral-offwhite)]">
              {currentCategory || "All Documents"}
            </h2>
            <Button 
              onClick={() => setIsDialogOpen(true)} 
              className="bg-[var(--color-accent-green)] hover:brightness-110 text-[var(--color-neutral-offwhite)] transition-colors duration-200 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Upload New Document
            </Button>
          </div>

          <div className="bg-[#1d1d1d] rounded-lg border border-[#333333]">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#2C2C2C] border-b border-[#444444]">
                  <TableHead className="w-[40%] p-3 text-[0.875rem] font-semibold text-[var(--color-accent-cyan)] tracking-wide">File Name</TableHead>
                  <TableHead className="w-[20%] p-3 text-[0.875rem] font-semibold text-[var(--color-accent-cyan)] tracking-wide">Category</TableHead>
                  <TableHead className="w-[15%] p-3 text-[0.875rem] font-semibold text-[var(--color-accent-cyan)] tracking-wide">Version</TableHead>
                  <TableHead className="w-[25%] p-3 text-[0.875rem] font-semibold text-[var(--color-accent-cyan)] tracking-wide">Date Added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <TableRow 
                      key={doc.id}
                      className="border-b border-[#333333] hover:bg-[#2c2c2c]/50"
                    >
                      <TableCell className="p-3 text-[0.875rem] text-[var(--color-neutral-offwhite)] flex items-center gap-2">
                        <FileText size={16} className="text-[var(--color-accent-cyan)]" />
                        {doc.name}
                      </TableCell>
                      <TableCell className="p-3 text-[0.875rem] text-[var(--color-neutral-offwhite)]">{doc.category}</TableCell>
                      <TableCell className="p-3 text-[0.875rem] text-[var(--color-neutral-offwhite)]">{doc.version}</TableCell>
                      <TableCell className="p-3 text-[0.875rem] text-[var(--color-neutral-offwhite)]">{doc.dateAdded}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-[var(--color-neutral-offwhite)]">
                      No document information added yet. Click 'Upload New Document' to start.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>

      {/* Enhanced Upload Document Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-xl shadow-lg bg-[#1e1e1e] border border-[#444444] text-[var(--color-neutral-offwhite)]">
          <DialogHeader className="bg-[#2c2c2c] p-4 rounded-t-xl border-b border-[#444444]">
            <DialogTitle className="text-[1.25rem] font-semibold text-[var(--color-neutral-offwhite)]">Upload New Document Info</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 p-6">
            <div className="grid gap-2">
              <Label htmlFor="docFile" className="font-medium text-[var(--color-neutral-offwhite)]">Document File:</Label>
              <Input 
                id="docFile" 
                type="file" 
                onChange={handleFileChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="docCategory" className="font-medium text-[var(--color-neutral-offwhite)]">Category:</Label>
              <select
                id="docCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value as DocumentCategory)}
                className="flex h-10 w-full rounded-lg border border-[#777777] bg-[#383838] px-3 py-2 text-base text-[var(--color-neutral-offwhite)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-cyan)] focus:border-transparent transition-all"
              >
                {DOCUMENT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="docVersion" className="font-medium text-[var(--color-neutral-offwhite)]">Version:</Label>
              <Input
                id="docVersion"
                placeholder="e.g., v1.0, v0.2-draft"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="docDescription" className="font-medium text-[var(--color-neutral-offwhite)]">Brief Description/Notes (Optional):</Label>
              <textarea
                id="docDescription"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex w-full rounded-lg border border-[#777777] bg-[#383838] px-3 py-2 text-base text-[var(--color-neutral-offwhite)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-cyan)] focus:border-transparent transition-all"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end bg-[#2c2c2c] p-4 rounded-b-xl border-t border-[#444444]">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setIsDialogOpen(false);
                resetForm();
              }}
              className="border border-[var(--color-accent-cyan)] bg-transparent text-[var(--color-accent-cyan)] hover:bg-[var(--color-accent-cyan)]/10"
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              className="bg-[var(--color-accent-green)] hover:brightness-110 text-[var(--color-neutral-offwhite)] transition-colors duration-200"
              onClick={handleSubmit}
            >
              Save Document Info
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentManager;
