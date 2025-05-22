
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/layout/Header';
import TriageQAForm from '@/components/review/TriageQAForm';
import SAReviewForm from '@/components/review/SAReviewForm';

const CodeReview = () => {
  const [activeTab, setActiveTab] = useState("triage-qa");
  const [refreshCounter, setRefreshCounter] = useState(0);

  const handleComplete = (success: boolean) => {
    if (success) {
      // Increment refresh counter to cause re-renders of child components
      setRefreshCounter(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 p-6 container mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-accent-cyan)] mb-2">RoboCode Code Review</h2>
          <p className="text-[var(--color-neutral-mid)]">
            Review code quality and enforce architectural standards through Triage QA and Solution Architect review processes.
          </p>
        </div>
        
        <Tabs 
          defaultValue="triage-qa" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="triage-qa" className="text-[var(--color-neutral-offwhite)]">Triage QA</TabsTrigger>
            <TabsTrigger value="sa-review" className="text-[var(--color-neutral-offwhite)]">SA Review</TabsTrigger>
          </TabsList>
          
          <TabsContent value="triage-qa" className="mt-0">
            <TriageQAForm key={`triage-${refreshCounter}`} onComplete={handleComplete} />
          </TabsContent>
          
          <TabsContent value="sa-review" className="mt-0">
            <SAReviewForm key={`sa-review-${refreshCounter}`} onComplete={handleComplete} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CodeReview;
