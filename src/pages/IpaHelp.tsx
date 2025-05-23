
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, HelpCircle, BookOpen, Code, Settings } from 'lucide-react';

/**
 * IPA (Intelligent Project Assistant) Help Interface
 * Provides keyword-based responses about RoboCode processes and best practices
 */

interface ChatMessage {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const IpaHelp: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your RoboCode Intelligent Project Assistant. I can help you with information about RoboCode processes, development workflows, and best practices. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  /**
   * Knowledge base for keyword-based responses
   * This simulates a simple Q&A system for MVP functionality
   */
  const ipaKnowledgeBase: { [key: string]: string } = {
    // Workflow and Process
    'workflow': 'The RoboCode development workflow follows these steps: 1) Document Review, 2) Environment Setup, 3) Development with Vibe Coding, 4) Triage QA with AI assistance, 5) SA Review and approval, 6) Merge to develop branch.',
    'process': 'RoboCode uses an AI-first SDLC process. Start by reviewing documents, set up your development environment, use Vibe Coding tools (Lovable for UI, Replit for JS), then submit for Triage QA review followed by Solution Architect approval.',
    'git': 'Git workflow: Create feature branch (git checkout -b feature/module-name), develop your module, commit changes, push to remote, then submit for review. Always work on feature branches, never directly on main or develop.',
    
    // Development Tools
    'lovable': 'Lovable is used for UI development in RoboCode. Always use the robo_page_template.html as your base structure and apply dark mode CSS classes from robo_styles.css. Follow Robonomics AI branding guidelines.',
    'replit': 'Replit handles client-side JavaScript logic. Use console.log with [ROBOCODE][ModuleName] prefix for debugging. Follow JSDoc commenting standards and implement proper error handling.',
    'vibe coding': 'Vibe Coding refers to using AI-assisted development tools like Lovable and Replit. Always follow the RoboCode Internal Kernel guidelines and maintain consistency with established patterns.',
    
    // Design and UI
    'dark mode': 'RoboCode uses a Dark Mode First approach. Primary background: #1A1A1A, content areas: #2C2C2C, text: #FAFAFA. Use CSS variables from robo_styles.css for consistent theming.',
    'design': 'Follow the Robonomics AI branding: Deep IntelliBlue (#003366), Clarity Cyan (#00AEEF), Growth Green (#28A745), Connection Orange (#FD7E14), Innovation Purple (#6A0DAD). Use Inter font family.',
    'ui': 'UI components should use the robo-card, robo-button-primary, and robo-input-field CSS classes. Ensure high contrast, proper spacing (24px padding for cards), and responsive design.',
    
    // Quality Assurance
    'triage qa': 'Triage QA uses external LLM (Google AI Studio) for code review. Copy the master prompt, paste with your code, then submit the AI response through the Triage QA form. Assessment levels: Pass, Conditional Pass, or Fail.',
    'sa review': 'Solution Architect review is the final approval step. SA reviews use categorized checklists covering functionality, design, code quality, and architecture. Only SA-approved code can be merged.',
    'review': 'Code review has two stages: Triage QA (AI-assisted) and SA Review (human expert). Both must pass before code can be merged to the develop branch.',
    
    // Documentation
    'kernel': 'The RoboCode Internal Kernel provides foundational templates, CSS styles, and guidelines. Always copy the latest kernel version to your module directory as a starting point.',
    'documentation': 'Key documents include PRDs, BRDs, Code Kernels, Style Guides, and Architecture docs. Access them through the Document Manager, organized by category.',
    'prd': 'The Product Requirements Document (PRD) defines features, user stories, design principles, and development processes. Current version is v1.2 with Dark Mode specifications.',
    
    // Common Issues
    'error': 'Common errors: Header duplication (remove from pages using GlobalLayout), Router conflicts (check nested Router components), Theme context issues (ensure ThemeProvider wrapping). Check console logs for details.',
    'debugging': 'Use console.log with [ROBOCODE][ModuleName] prefix for debugging. Check browser dev tools, verify component props, and ensure CSS variables are properly defined.',
    'help': 'For help: Check the IPA knowledge base, review documentation in Document Manager, consult the RoboCode Internal Kernel guidelines, or ask specific questions about workflows, tools, or design patterns.'
  };

  /**
   * Find relevant response based on keywords in user input
   */
  const findResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();
    
    // Check for exact matches first
    for (const [keyword, response] of Object.entries(ipaKnowledgeBase)) {
      if (lowercaseQuery.includes(keyword)) {
        return response;
      }
    }

    // If no match found, return default response
    return "I'm still learning about that topic. Try asking about: workflow, git, lovable, replit, dark mode, design, ui, triage qa, sa review, kernel, documentation, prd, debugging, or help. You can also check the Document Manager for detailed guides and specifications.";
  };

  /**
   * Handle sending a new message
   */
  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);

    // Generate assistant response
    const response = findResponse(inputValue);
    const assistantMessage: ChatMessage = {
      id: messages.length + 2,
      type: 'assistant',
      content: response,
      timestamp: new Date()
    };

    // Add assistant response after a brief delay
    setTimeout(() => {
      setMessages(prev => [...prev, assistantMessage]);
    }, 500);

    // Clear input
    setInputValue('');
    
    // Log interaction
    console.log(`[ROBOCODE][IPA]: User query: "${inputValue}" | Response: "${response}"`);
  };

  /**
   * Handle Enter key press
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /**
   * Auto-scroll to bottom when new messages are added
   */
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="space-y-6 h-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-accent-cyan)] mb-3">RoboCode IPA</h1>
        <p className="text-lg text-[var(--color-neutral-offwhite)]">
          Intelligent Project Assistant for RoboCode processes and guidance
        </p>
      </div>

      {/* Quick Help Topics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors cursor-pointer"
              onClick={() => setInputValue('workflow')}>
          <CardContent className="p-4 text-center">
            <Code className="h-8 w-8 text-[var(--color-accent-green)] mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-[var(--color-neutral-offwhite)]">Development Workflow</h3>
            <p className="text-xs text-[var(--color-neutral-mid)]">Step-by-step development process</p>
          </CardContent>
        </Card>
        
        <Card className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors cursor-pointer"
              onClick={() => setInputValue('design')}>
          <CardContent className="p-4 text-center">
            <Settings className="h-8 w-8 text-[var(--color-accent-purple)] mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-[var(--color-neutral-offwhite)]">Design Guidelines</h3>
            <p className="text-xs text-[var(--color-neutral-mid)]">Dark mode and branding standards</p>
          </CardContent>
        </Card>
        
        <Card className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors cursor-pointer"
              onClick={() => setInputValue('documentation')}>
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 text-[var(--color-accent-orange)] mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-[var(--color-neutral-offwhite)]">Documentation</h3>
            <p className="text-xs text-[var(--color-neutral-mid)]">Access guides and specifications</p>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <Card className="border border-[#444444] flex-1 flex flex-col h-[600px]">
        <CardHeader className="pb-3">
          <CardTitle className="text-[var(--color-neutral-offwhite)] flex items-center gap-2">
            <Bot className="h-5 w-5 text-[var(--color-accent-cyan)]" />
            Chat with IPA
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex items-start gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-[var(--color-accent-cyan)]/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-[var(--color-accent-cyan)]" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-[var(--color-accent-green)]/20 text-[var(--color-neutral-offwhite)]' 
                      : 'bg-[#1e1e1e] text-[var(--color-neutral-offwhite)] border border-[#333333]'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs text-[var(--color-neutral-mid)] mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>

                  {message.type === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-[var(--color-accent-green)]/20 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-[var(--color-accent-green)]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-[#333333] p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about RoboCode workflows, tools, or best practices..."
                className="flex-1"
              />
              <Button 
                onClick={sendMessage}
                disabled={!inputValue.trim()}
                className="bg-[var(--color-accent-green)] text-[var(--color-neutral-offwhite)] hover:brightness-110"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-[var(--color-neutral-mid)] mt-2">
              Try asking about: workflow, git, design, triage qa, documentation, or debugging
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IpaHelp;
