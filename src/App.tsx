
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalLayout from "./components/layout/GlobalLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DocumentManager from "./pages/DocumentManager";
import DevelopRoboCode from "./pages/DevelopRoboCode";
import CodeReview from "./pages/CodeReview";
import IntegratedReviewEnvironment from "./pages/IntegratedReviewEnvironment";
import IpaHelp from "./pages/IpaHelp";
import TriageQA from "./pages/TriageQA";
import SAReviewList from "./pages/SAReviewList";
import AIQualityAssurance from "./pages/AIQualityAssurance";
import ActivityLog from "./pages/ActivityLog";
import Settings from "./pages/Settings";
import AIModelConfiguration from "./pages/settings/AIModelConfiguration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GlobalLayout><Index /></GlobalLayout>} />
          <Route path="/documents" element={<GlobalLayout><DocumentManager /></GlobalLayout>} />
          <Route path="/develop" element={<GlobalLayout><DevelopRoboCode /></GlobalLayout>} />
          <Route path="/ai-qa" element={<GlobalLayout><AIQualityAssurance /></GlobalLayout>} />
          <Route path="/review" element={<GlobalLayout><SAReviewList /></GlobalLayout>} />
          <Route path="/review/:id" element={<GlobalLayout><IntegratedReviewEnvironment /></GlobalLayout>} />
          <Route path="/ipa" element={<GlobalLayout><IpaHelp /></GlobalLayout>} />
          <Route path="/triage-qa" element={<GlobalLayout><TriageQA /></GlobalLayout>} />
          <Route path="/activity" element={<GlobalLayout><ActivityLog /></GlobalLayout>} />
          <Route path="/settings" element={<GlobalLayout><Settings /></GlobalLayout>} />
          <Route path="/settings/ai-models" element={<GlobalLayout><AIModelConfiguration /></GlobalLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<GlobalLayout><NotFound /></GlobalLayout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
