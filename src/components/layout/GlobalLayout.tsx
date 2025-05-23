
import React from 'react';
import Header from './Header';
import { Sidebar, SidebarProvider, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from '@/components/ui/sidebar';
import { Home, FileText, Code, HelpCircle, Settings, Clock, FileCheck, UserCheck, FolderOpen, BookOpen, Wrench, Palette, Database, Shield, TestTube, Rocket, User, Globe, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';

interface GlobalLayoutProps {
  children: React.ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => {
    return currentPath === path;
  };
  
  const mainNavItems = [
    { title: "Dashboard", path: "/", icon: Home },
    { title: "Document Manager", path: "/documents", icon: FileText, hasSubItems: true },
    { title: "Development", path: "/develop", icon: Code },
    { title: "Triage QA", path: "/triage-qa", icon: FileCheck },
    { title: "SA Review", path: "/review", icon: UserCheck },
    { title: "IPA Help", path: "/ipa", icon: HelpCircle },
    { title: "Activity Log", path: "/activity", icon: Clock },
    { title: "Settings", path: "/settings", icon: Settings }
  ];

  // Expanded document categories from PRD v1.2
  const documentCategories = [
    { title: "All Documents", category: "all", icon: FolderOpen },
    { title: "Business Requirements Documents (BRDs)", category: "brd", icon: BookOpen },
    { title: "Product Requirements Documents (PRDs)", category: "prd", icon: BookOpen },
    { title: "Technical Specifications", category: "techspec", icon: Wrench },
    { title: "Code Kernels", category: "kernel", icon: Code },
    { title: "Context Summaries", category: "context", icon: Info },
    { title: "User Flow & Test Scripts", category: "userflow", icon: TestTube },
    { title: "Style Guides & Design Docs", category: "design", icon: Palette },
    { title: "API Documentation", category: "api", icon: Globe },
    { title: "Database Schema", category: "database", icon: Database },
    { title: "Version Control Practices", category: "versioncontrol", icon: Code },
    { title: "Security Practices", category: "security", icon: Shield },
    { title: "Compliance Requirements", category: "compliance", icon: Shield },
    { title: "Testing Guidelines", category: "testing", icon: TestTube },
    { title: "Deployment Instructions", category: "deployment", icon: Rocket },
    { title: "Environment Setup", category: "envsetup", icon: Settings },
    { title: "Project Overview", category: "overview", icon: FolderOpen },
    { title: "User Personas", category: "personas", icon: User }
  ];

  const handleCategoryFilter = (category: string) => {
    // Emit custom event for document filtering
    const event = new CustomEvent('documentCategoryChange', { detail: { category } });
    window.dispatchEvent(event);
    console.log(`[ROBOCODE][GlobalLayout]: Document category filter changed to: ${category}`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar>
          <SidebarContent>
            {/* Logo Section */}
            <SidebarGroup className="pt-0">
              <div className="flex items-center justify-center p-3 mb-4">
                <img 
                  src="/lovable-uploads/411ab4ed-6ae1-4704-b5b2-0b6910940aa6.png" 
                  alt="RoboCode Logo - AI-First SDLC Orchestration Platform" 
                  className="h-8"
                  title="RoboCode Platform - Robonomics AI"
                />
              </div>
              
              {/* Main Navigation */}
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.hasSubItems && item.path === '/documents' ? (
                      <Collapsible defaultOpen={currentPath === '/documents'}>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton 
                            isActive={isActive(item.path)}
                            tooltip={item.title}
                            className="w-full justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <item.icon className="h-5 w-5" title={`Navigate to ${item.title}`} />
                              <span>{item.title}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            <SidebarGroupLabel className="text-xs text-muted-foreground px-2 py-1">
                              Document Categories
                              <Info className="inline h-3 w-3 ml-1 text-[var(--color-accent-cyan)]" title="Filter documents by category type" />
                            </SidebarGroupLabel>
                            {documentCategories.map((category) => (
                              <SidebarMenuSubItem key={category.category}>
                                <SidebarMenuSubButton asChild>
                                  <button 
                                    className="w-full text-left flex items-center gap-2" 
                                    onClick={() => handleCategoryFilter(category.category)}
                                    data-category={category.category}
                                    title={`Filter to show ${category.title.toLowerCase()}`}
                                  >
                                    <category.icon className="h-4 w-4" />
                                    <span className="text-xs">{category.title}</span>
                                  </button>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive(item.path)}
                        tooltip={item.title}
                      >
                        <Link to={item.path} className="flex items-center gap-2">
                          <item.icon className="h-5 w-5" title={`Navigate to ${item.title}`} />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col w-full overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
          <footer className="p-4 bg-background text-xs text-muted-foreground border-t border-border">
            <div className="container flex justify-between items-center">
              <span>© 2025 Robonomics AI</span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-accent" title="Get help for this specific page">Help for this Page</a>
                <a href="#" className="hover:text-accent" title="Access platform documentation">Documentation</a>
                <a href="#" className="hover:text-accent" title="View privacy policy">Privacy Policy</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default GlobalLayout;
