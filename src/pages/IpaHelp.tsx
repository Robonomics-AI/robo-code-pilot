
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';

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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 p-4 md:p-6 fade-in">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[var(--color-primary-core)] dark:text-accent">RoboCode IPA Help</h2>
            <p className="text-muted-foreground">
              Get assistance with RoboCode processes, kernels, and development workflow.
            </p>
          </div>
          
          <Card className="h-[600px] flex flex-col overflow-hidden">
            {/* Chat history display area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} slide-in`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%]`}>
                    {!message.isUser && (
                      <div className="bg-accent/20 dark:bg-accent/30 p-2 rounded-full mt-1">
                        <Bot className="h-4 w-4 text-accent dark:text-accent-foreground" />
                      </div>
                    )}
                    
                    <div 
                      className={`p-3 rounded-lg ${
                        message.isUser 
                          ? 'bg-accent/10 dark:bg-accent/20 ml-auto' 
                          : 'bg-card dark:bg-muted'
                      }`}
                    >
                      {message.isUser && (
                        <div className="flex items-center gap-2 mb-1 pb-1 border-b border-border">
                          <User className="h-4 w-4 text-primary dark:text-primary" />
                          <span className="font-medium text-sm">You</span>
                        </div>
                      )}
                      {!message.isUser && (
                        <div className="flex items-center gap-2 mb-1 pb-1 border-b border-border">
                          <Bot className="h-4 w-4 text-accent dark:text-accent" />
                          <span className="font-medium text-sm">RoboCode IPA</span>
                        </div>
                      )}
                      <p className="text-foreground">{message.content}</p>
                    </div>

                    {message.isUser && (
                      <div className="bg-primary/20 dark:bg-primary/30 p-2 rounded-full mt-1">
                        <User className="h-4 w-4 text-primary dark:text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input area */}
            <div className="p-4 border-t border-border bg-card dark:bg-card/50">
              <div className="flex gap-2">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask RoboCode IPA..."
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendQuery}
                  variant="default"
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default IpaHelp;
