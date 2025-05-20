
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot } from 'lucide-react';
import Header from '@/components/layout/Header';

// Simple static knowledge base for MVP
const ipaKnowledgeBase = {
  "kernel": "The RoboCode Internal Code Kernel is a set of templates and guidelines to help you build RoboCode modules consistently. It includes UI primitives, workflow conventions, and error handling patterns.",
  "git": "Our Git strategy is: main, develop, feature/*, sandbox-review/*. Feature branches are used for new module development and should be created from develop.",
  "branching": "Our Git branching strategy includes main (production), develop (integration), feature/MODULE_NAME (for new features), and sandbox-review/MODULE_NAME (for code pending SA review).",
  "triage": "The Triage QA process involves using an external LLM (like Google AI Studio) to review your code before submitting it to the SA. Copy your new module code and use the standard prompt template.",
  "prompt": "The Triage QA master prompt template guides the external LLM through reviewing your code. It asks for clarity, modularity, adherence to kernel principles, error handling, complexity issues, and security considerations.",
  "workflow": "The RoboCode development workflow is: 1) Create feature branch, 2) Copy Kernel to module directory, 3) Vibe Code your module, 4) Submit for Triage QA, 5) Pass to SA review, 6) Merge when approved.",
  "document": "Documents in RoboCode are organized as BRDs, PRDs, TechSpecs, Kernels, ContextSummaries, and UserFlowTestScripts. Access them through the Document Management module.",
  "phase": "RoboCode development is divided into phases: 1) Foundation & Kernel, 2) Vibe Coding Enablement, 3) Human SA Oversight & Basic IPA, 4) Iterative Enhancement."
};

type Message = {
  isUser: boolean;
  content: string;
};

const IpaHelp = () => {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { isUser: false, content: "Welcome to RoboCode IPA Help! I can answer questions about kernels, Git workflow, triage QA process, and more. How can I help you?" }
  ]);

  const handleSendQuery = () => {
    if (!query.trim()) return;
    
    const userMessage = { isUser: true, content: query };
    setChatHistory(prev => [...prev, userMessage]);
    
    // Process the query
    const lowerQuery = query.toLowerCase();
    let foundResponse = false;
    let response = '';
    
    // Look for matches in knowledge base
    for (const [keyword, answer] of Object.entries(ipaKnowledgeBase)) {
      if (lowerQuery.includes(keyword)) {
        response = answer;
        foundResponse = true;
        break;
      }
    }
    
    // Default response if no match
    if (!foundResponse) {
      response = "I'm still learning! For now, please check the Document Management module or ask the SA. You can also try phrasing your question differently using keywords like 'kernel', 'git', 'triage', 'prompt', 'workflow', or 'document'.";
    }
    
    // Add IPA response to chat history
    setTimeout(() => {
      setChatHistory(prev => [...prev, { isUser: false, content: response }]);
    }, 500);
    
    setQuery('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendQuery();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-neutral-offwhite)]">
      <Header />
      
      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-primary-core)] mb-2">RoboCode IPA Help</h2>
            <p className="text-[var(--color-neutral-dark)]/80">
              Get assistance with RoboCode processes, kernels, and development workflow.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-soft border border-[var(--color-neutral-light)] h-[600px] flex flex-col">
            {/* Chat history display area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser 
                        ? 'bg-[var(--color-primary-core)] text-white' 
                        : 'bg-[var(--color-neutral-light)] text-[var(--color-neutral-dark)]'
                    }`}
                  >
                    {!message.isUser && (
                      <div className="flex items-center gap-2 mb-1 pb-1 border-b border-[var(--color-neutral-mid)]/20">
                        <Bot className="h-4 w-4" />
                        <span className="font-medium text-sm">RoboCode IPA</span>
                      </div>
                    )}
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input area */}
            <div className="p-4 border-t border-[var(--color-neutral-light)]">
              <div className="flex gap-2">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask RoboCode IPA..."
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendQuery}
                  className="bg-[var(--color-primary-core)] hover:bg-[#00254D]"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IpaHelp;
