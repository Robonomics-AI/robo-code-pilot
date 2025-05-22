
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Header from '@/components/layout/Header';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// IPA Knowledge Base for static responses
const ipaKnowledgeBase: Record<string, string> = {
  "kernel": "The RoboCode Internal Code Kernel is a set of templates and guidelines to help you build RoboCode modules consistently. It defines UI primitives, workflow conventions, configuration structures, and more. Check the Document Management module for detailed documentation.",
  
  "git": "Our Git branching strategy is: main (production), develop (integration), feature/* (new modules), sandbox-review/* (for review). When creating a new module, branch from develop. After passing Triage QA and SA Review, your branch will be merged back to develop.",
  
  "triage": "The Triage QA process involves submitting your code for initial quality assessment. Use the AI Studio prompt to get feedback on your code, then submit it to SA Review if it passes. This helps ensure consistent quality across all RoboCode modules.",
  
  "sa review": "SA (Solution Architect) Review is performed by an expert developer who analyzes your code for architectural consistency, security, performance, and adherence to best practices. They can either approve your code or request revisions.",
  
  "workflow": "The RoboCode development workflow consists of: 1) Create a new module, 2) Develop using Vibe Coding tools, 3) Submit for Triage QA, 4) Submit for SA Review, 5) Merge to develop branch if approved.",
  
  "document": "The Document Management module allows you to store and categorize important project documents like BRDs, PRDs, Technical Specs, and more. Use it to keep all project documentation in one place.",
  
  "help": "I can answer questions about RoboCode's development process, Git workflow, modules, and more. Try asking about 'kernel', 'git', 'triage', 'workflow', or 'document'."
};

const IpaHelp = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm the RoboCode Intelligent Project Assistant (IPA). How can I help you with your RoboCode development today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Process the message and get a response
    setTimeout(() => {
      const response = getIpaResponse(input.toLowerCase());
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 500);
  };
  
  const getIpaResponse = (query: string): string => {
    // Check if the query matches any known keywords
    for (const [keyword, response] of Object.entries(ipaKnowledgeBase)) {
      if (query.includes(keyword)) {
        return response;
      }
    }
    
    // Default response if no match found
    return "I'm still learning! For now, please check the Document Management module or ask the SA. You can also try phrasing your question differently using keywords like 'kernel', 'git', 'triage', 'workflow', or 'document'.";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 p-6 container mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-accent-cyan)] mb-2">RoboCode Intelligent Project Assistant (IPA)</h2>
          <p className="text-[var(--color-neutral-mid)]">
            Get quick answers and guidance about using RoboCode, its kernel, and development processes.
          </p>
        </div>
        
        <Card className="flex flex-col h-[calc(100vh-16rem)] border border-[#444444]">
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div 
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] ${
                    message.role === 'user' 
                      ? 'chat-bubble-user' 
                      : 'chat-bubble-ai'
                  }`}
                >
                  <div className="text-sm mb-1 text-[var(--color-neutral-mid)]">
                    {message.role === 'user' ? 'You' : 'RoboCode IPA'} • {message.timestamp.toLocaleTimeString()}
                  </div>
                  <div>{message.content}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <form onSubmit={handleSendMessage} className="border-t border-[#444444] p-4">
            <div className="flex space-x-2">
              <Input 
                placeholder="Ask RoboCode IPA..." 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={!input.trim()}
                className="bg-[var(--color-accent-cyan)] text-[var(--color-neutral-offwhite)] hover:brightness-110"
              >
                Send
              </Button>
            </div>
            <div className="mt-2 text-xs text-[var(--color-neutral-mid)]">
              Try asking about: "kernel", "git workflow", "triage qa process", "sa review", or "document management"
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default IpaHelp;
