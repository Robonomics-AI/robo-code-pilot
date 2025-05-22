
import { Document, DocumentCategory, Module, ModuleStatus, TriageQA, SAReview } from "./types";

// Generate unique IDs for our data items
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Document Management Service
export const DocumentService = {
  // Sample documents for initial state
  sampleDocuments: [
    {
      id: generateId(),
      name: "RoboCode_Project_Vision.md",
      category: "PRD (Product Requirements)",
      version: "v1.0",
      dateAdded: new Date().toLocaleDateString(),
      description: "Initial product vision document for RoboCode platform"
    },
    {
      id: generateId(),
      name: "Internal_Kernel_Architecture.pdf",
      category: "Kernel (Code Kernel)",
      version: "v0.1",
      dateAdded: new Date().toLocaleDateString(),
      description: "Architecture document for RoboCode internal kernel"
    }
  ] as Document[],

  // Add a new document
  addDocument: (document: Omit<Document, "id">): Document => {
    const newDocument = {
      id: generateId(),
      ...document
    };
    
    // In a real implementation, this would be saved to JSON
    console.log("DOCUMENT_MANIFEST_UPDATE: Adding document", newDocument);
    console.log("JSON structure would be:", 
      JSON.stringify({
        documents: [...DocumentService.sampleDocuments, newDocument]
      }, null, 2)
    );
    
    DocumentService.sampleDocuments.push(newDocument);
    return newDocument;
  },

  // Get all documents
  getAllDocuments: (): Document[] => {
    // In a real implementation, this would load from the JSON file
    console.log("DOCUMENT_MANIFEST_READ: Getting all documents");
    return DocumentService.sampleDocuments;
  },

  // Get documents by category
  getDocumentsByCategory: (category: DocumentCategory): Document[] => {
    // In a real implementation, this would filter from the loaded JSON
    console.log(`DOCUMENT_MANIFEST_READ: Getting documents in category ${category}`);
    return DocumentService.sampleDocuments.filter(doc => doc.category === category);
  }
};

// Module Management Service
export const ModuleService = {
  // Sample modules for initial state
  sampleModules: [
    {
      id: generateId(),
      name: "DocumentManager_UI",
      status: "MergedToDevelop" as ModuleStatus,
      creationDate: "2025-05-01",
      lastUpdated: "2025-05-05",
      assignedTo: "Samir Sinha",
      branchName: "feature/DocumentManager_UI",
      kernelVersionUsed: "internal_stable_v0.1",
      triageQA: {
        id: generateId(),
        moduleId: "",
        submittedBy: "Samir Sinha",
        submissionDate: "2025-05-03",
        llmOutput: "The document manager UI meets all requirements and follows the design guidelines.",
        assessment: "Pass" as const
      },
      saReview: {
        id: generateId(),
        moduleId: "",
        reviewedBy: "Priya Sharma",
        reviewDate: "2025-05-05",
        feedback: "Code is clean and follows our architectural guidelines. Approved for merge.",
        decision: "SA Approved (Ready for Dev Merge)" as const
      }
    }
  ] as Module[],

  // Create a new module
  createModule: (moduleName: string): Module => {
    const newModule = {
      id: generateId(),
      name: moduleName,
      status: "Created" as ModuleStatus,
      creationDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      assignedTo: "Samir Sinha",
      branchName: `feature/${moduleName}`,
      kernelVersionUsed: "internal_stable_v0.1"
    };
    
    // In a real implementation, this would be saved to JSON
    console.log("MODULE_MANIFEST_UPDATE: Creating module", newModule);
    console.log("JSON structure would be:", 
      JSON.stringify({
        modules: [...ModuleService.sampleModules, newModule]
      }, null, 2)
    );
    
    ModuleService.sampleModules.push(newModule);
    return newModule;
  },

  // Update module status
  updateModuleStatus: (moduleId: string, status: ModuleStatus): Module | null => {
    const moduleIndex = ModuleService.sampleModules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) return null;
    
    ModuleService.sampleModules[moduleIndex].status = status;
    ModuleService.sampleModules[moduleIndex].lastUpdated = new Date().toISOString().split('T')[0];
    
    // In a real implementation, this would be saved to JSON
    console.log(`MODULE_MANIFEST_UPDATE: Updated module ${moduleId} status to ${status}`);
    
    return ModuleService.sampleModules[moduleIndex];
  },

  // Add triage QA to a module
  addTriageQA: (moduleId: string, triageQA: Omit<TriageQA, "id" | "moduleId">): Module | null => {
    const moduleIndex = ModuleService.sampleModules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) return null;
    
    const newTriageQA = {
      id: generateId(),
      moduleId,
      ...triageQA
    };
    
    ModuleService.sampleModules[moduleIndex].triageQA = newTriageQA;
    ModuleService.sampleModules[moduleIndex].status = triageQA.assessment === "Pass" ? "TriageQAPassed" : "TriageQAFailed";
    ModuleService.sampleModules[moduleIndex].lastUpdated = new Date().toISOString().split('T')[0];
    
    // In a real implementation, this would be saved to JSON
    console.log(`MODULE_MANIFEST_UPDATE: Added triage QA to module ${moduleId}`);
    
    return ModuleService.sampleModules[moduleIndex];
  },

  // Add SA review to a module
  addSAReview: (moduleId: string, saReview: Omit<SAReview, "id" | "moduleId">): Module | null => {
    const moduleIndex = ModuleService.sampleModules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) return null;
    
    const newSAReview = {
      id: generateId(),
      moduleId,
      ...saReview
    };
    
    ModuleService.sampleModules[moduleIndex].saReview = newSAReview;
    ModuleService.sampleModules[moduleIndex].status = saReview.decision === "SA Approved (Ready for Dev Merge)" ? "SAApproved" : "SARevisionRequested";
    ModuleService.sampleModules[moduleIndex].lastUpdated = new Date().toISOString().split('T')[0];
    
    // In a real implementation, this would be saved to JSON
    console.log(`MODULE_MANIFEST_UPDATE: Added SA review to module ${moduleId}`);
    
    return ModuleService.sampleModules[moduleIndex];
  },

  // Get all modules
  getAllModules: (): Module[] => {
    // In a real implementation, this would load from the JSON file
    console.log("MODULE_MANIFEST_READ: Getting all modules");
    return ModuleService.sampleModules;
  },

  // Get module by ID
  getModuleById: (moduleId: string): Module | undefined => {
    // In a real implementation, this would look up in the loaded JSON
    console.log(`MODULE_MANIFEST_READ: Getting module with ID ${moduleId}`);
    return ModuleService.sampleModules.find(m => m.id === moduleId);
  }
};
