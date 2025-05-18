
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
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-robonomics-intelliblue text-robonomics-off-white p-4">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold">RoboCode</h1>
          <div>User: Samir Sinha</div>
        </div>
      </header>

      <div className="container flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-robonomics-light-grey p-4">
          <nav>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentCategory(null)}
                  className={`w-full text-left p-2 ${
                    currentCategory === null
                      ? "font-bold border-l-4 border-robonomics-clarity-cyan"
                      : ""
                  }`}
                >
                  All Documents
                </button>
              </li>
              {DOCUMENT_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setCurrentCategory(cat)}
                    className={`w-full text-left p-2 ${
                      currentCategory === cat
                        ? "font-bold border-l-4 border-robonomics-clarity-cyan"
                        : ""
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 bg-robonomics-off-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-robonomics-dark-grey">
              {currentCategory || "All Documents"}
            </h2>
            <Button 
              onClick={() => setIsDialogOpen(true)} 
              className="bg-robonomics-growth-green hover:bg-robonomics-growth-green/90 text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Upload New Document
            </Button>
          </div>

          <div className="bg-white rounded-md border border-robonomics-mid-grey">
            <Table>
              <TableHeader>
                <TableRow className="bg-robonomics-light-grey">
                  <TableHead className="w-[40%]">File Name</TableHead>
                  <TableHead className="w-[20%]">Category</TableHead>
                  <TableHead className="w-[15%]">Version</TableHead>
                  <TableHead className="w-[25%]">Date Added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc, index) => (
                    <TableRow 
                      key={`${doc.name}-${index}`}
                      className={index % 2 === 0 ? "bg-white" : "bg-robonomics-light-grey/30"}
                    >
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.category}</TableCell>
                      <TableCell>{doc.version}</TableCell>
                      <TableCell>{doc.dateAdded}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No document information added yet. Click 'Upload New Document' to start.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>

      {/* Upload Document Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-robonomics-intelliblue">Upload New Document Info</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="docFile">Document File:</Label>
              <Input id="docFile" type="file" onChange={handleFileChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="docCategory">Category:</Label>
              <select
                id="docCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                {DOCUMENT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="docVersion">Version:</Label>
              <Input
                id="docVersion"
                placeholder="e.g., v1.0, v0.2-draft"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="docDescription">Brief Description/Notes (Optional):</Label>
              <textarea
                id="docDescription"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setIsDialogOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              className="bg-robonomics-intelliblue hover:bg-robonomics-intelliblue/90 text-white"
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
