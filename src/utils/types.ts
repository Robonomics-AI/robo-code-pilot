
// Define interfaces for the application data structures

// Document Manager types
export interface Document {
  id: string;
  name: string;
  category: string;
  version: string;
  dateAdded: string;
  description?: string;
}

export type DocumentCategory = 
  | "BRD (Business Requirements)" 
  | "PRD (Product Requirements)" 
  | "TechSpec (Technical Specs)" 
  | "Kernel (Code Kernel)" 
  | "ContextSummary" 
  | "UserFlowTestScript";

// Module types
export interface Module {
  id: string;
  name: string;
  status: ModuleStatus;
  creationDate: string;
  lastUpdated: string;
  assignedTo?: string;
  branchName: string;
  kernelVersionUsed: string;
  triageQA?: TriageQA;
  saReview?: SAReview;
}

export type ModuleStatus = 
  | "Created" 
  | "SetupInstructionsProvided"
  | "PendingTriageQA" 
  | "TriageQAPassed" 
  | "TriageQAFailed" 
  | "PendingSAReview" 
  | "SAApproved" 
  | "SARevisionRequested" 
  | "MergedToDevelop";

// Triage QA types
export interface TriageQA {
  id: string;
  moduleId: string;
  submittedBy: string;
  submissionDate: string;
  llmOutput: string;
  screenshots?: string[];
  assessment: "Pass" | "Fail";
}

// SA Review types
export interface SAReview {
  id: string;
  moduleId: string;
  reviewedBy: string;
  reviewDate: string;
  feedback: string;
  decision: "SA Approved (Ready for Dev Merge)" | "SA Revision Requested";
}
