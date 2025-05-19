import React, { useState } from 'react';
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
import { Plus, X } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface Document {
  name: string;
  category: string;
  version: string;
  dateAdded: string;
  description?: string;
}

const DOCUMENT_CATEGORIES = [
  "BRD (Business Requirements)",
  "PRD (Product Requirements)",
  "TechSpec (Technical Specs)",
  "Kernel (Code Kernel)",
  "ContextSummary",
  "UserFlowTestScript"
];

const DocumentManager = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form state
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState(DOCUMENT_CATEGORIES[0]);
  const [version, setVersion] = useState("");
  const [description, setDescription] = useState("");

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

    const newDocument: Document = {
      name: fileName,
      category,
      version,
      dateAdded: new Date().toLocaleDateString(),
      description: description || undefined
    };

    setDocuments([...documents, newDocument]);
    setIsDialogOpen(false);
    resetForm();
    toast.success("Document information added successfully");
  };

  return (
    <div className="flex flex-col min-h-screen font-inter">
      {/* Enhanced Header with shadow and improved visual hierarchy */}
      <header 
        className="bg-gradient-to-r from-[var(--color-primary-core)] to-[#002244] text-[var(--color-neutral-offwhite)] p-6 shadow-md"
      >
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-[2rem] font-bold text-[var(--color-neutral-offwhite)] tracking-tight">
              RoboCode <span className="text-[1.25rem] font-medium opacity-80">Document Manager</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 text-[0.875rem] text-[var(--color-neutral-offwhite)]">
            <div className="w-8 h-8 rounded-full bg-[var(--color-neutral-offwhite)]/20 flex items-center justify-center">
              <span className="text-sm font-medium">SS</span>
            </div>
            <span className="font-medium">Samir Sinha</span>
          </div>
        </div>
      </header>

      <div className="container flex flex-1">
        {/* Sidebar with refined styling */}
        <aside className="w-64 bg-[var(--color-neutral-light)] p-6">
          <h3 className="text-[1.125rem] font-semibold text-[var(--color-neutral-dark)] mb-4">Document Navigator</h3>
          <nav>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setCurrentCategory(null)}
                  className={`w-full text-left p-3 rounded transition-all duration-200 ${
                    currentCategory === null
                      ? "font-semibold border-l-4 border-[var(--color-accent-cyan)] bg-[var(--color-neutral-light)] text-[var(--color-primary-core)]"
                      : "font-medium text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)] hover:font-semibold"
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
                        ? "font-semibold border-l-4 border-[var(--color-accent-cyan)] bg-[var(--color-neutral-light)] text-[var(--color-primary-core)]"
                        : "font-medium text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)] hover:font-semibold"
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
        <main className="flex-1 p-6 bg-[var(--color-neutral-offwhite)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[var(--color-neutral-dark)]">
              {currentCategory || "All Documents"}
            </h2>
            <Button 
              onClick={() => setIsDialogOpen(true)} 
              className="bg-[var(--color-accent-green)] hover:bg-[#218838] text-white transition-colors duration-200 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Upload New Document
            </Button>
          </div>

          <div className="bg-white rounded-md border-[var(--color-neutral-mid)]">
            <Table>
              <TableHeader>
                <TableRow className="bg-[var(--color-neutral-light)]">
                  <TableHead className="w-[40%] p-3 text-[0.875rem] font-semibold text-[var(--color-neutral-dark)] tracking-wide">File Name</TableHead>
                  <TableHead className="w-[20%] p-3 text-[0.875rem] font-semibold text-[var(--color-neutral-dark)] tracking-wide">Category</TableHead>
                  <TableHead className="w-[15%] p-3 text-[0.875rem] font-semibold text-[var(--color-neutral-dark)] tracking-wide">Version</TableHead>
                  <TableHead className="w-[25%] p-3 text-[0.875rem] font-semibold text-[var(--color-neutral-dark)] tracking-wide">Date Added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc, index) => (
                    <TableRow 
                      key={`${doc.name}-${index}`}
                      className={index % 2 === 0 ? "bg-white" : "bg-[var(--color-neutral-light)]/30 border-b border-[var(--color-neutral-mid)]"}
                    >
                      <TableCell className="p-3 text-[0.875rem] text-[var(--color-neutral-dark)]">{doc.name}</TableCell>
                      <TableCell className="p-3 text-[0.875rem] text-[var(--color-neutral-dark)]">{doc.category}</TableCell>
                      <TableCell className="p-3 text-[0.875rem] text-[var(--color-neutral-dark)]">{doc.version}</TableCell>
                      <TableCell className="p-3 text-[0.875rem] text-[var(--color-neutral-dark)]">{doc.dateAdded}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-[var(--color-neutral-dark)]">
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
        <DialogContent className="sm:max-w-md rounded-xl shadow-lg">
          <DialogHeader className="bg-[var(--color-neutral-light)] p-4 rounded-t-xl border-b border-[var(--color-neutral-mid)]">
            <DialogTitle className="text-[1.25rem] font-semibold text-[var(--color-neutral-dark)]">Upload New Document Info</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 bg-[var(--color-neutral-offwhite)] p-6">
            <div className="grid gap-2">
              <Label htmlFor="docFile" className="font-medium">Document File:</Label>
              <Input 
                id="docFile" 
                type="file" 
                onChange={handleFileChange} 
                className="border border-[var(--color-neutral-mid)] rounded-md p-2 focus:border-[var(--color-accent-cyan)] focus:border-2 outline-none transition-all"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="docCategory" className="font-medium">Category:</Label>
              <select
                id="docCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-10 w-full rounded-md border border-[var(--color-neutral-mid)] bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[var(--color-accent-cyan)] focus:border-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all"
              >
                {DOCUMENT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="docVersion" className="font-medium">Version:</Label>
              <Input
                id="docVersion"
                placeholder="e.g., v1.0, v0.2-draft"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="border border-[var(--color-neutral-mid)] rounded-md p-2 focus:border-[var(--color-accent-cyan)] focus:border-2 outline-none transition-all"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="docDescription" className="font-medium">Brief Description/Notes (Optional):</Label>
              <textarea
                id="docDescription"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex w-full rounded-md border border-[var(--color-neutral-mid)] bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:border-[var(--color-accent-cyan)] focus:border-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end bg-[var(--color-neutral-offwhite)] p-4 rounded-b-xl border-t border-[var(--color-neutral-mid)]">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setIsDialogOpen(false);
                resetForm();
              }}
              className="border border-[var(--color-neutral-mid)] bg-transparent text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)] transition-colors duration-200"
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              className="bg-[var(--color-button-confirm)] hover:bg-[#0059b3] text-white transition-colors duration-200"
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
