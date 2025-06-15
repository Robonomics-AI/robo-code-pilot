import React from 'react';
import Header from './Header';
import { Sidebar, SidebarProvider, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from '@/components/ui/sidebar';
import { Home, FileText, Code, Settings, Clock, CheckCircle, FolderOpen, BookOpen, Wrench, Palette, Database, Shield, TestTube, Rocket, User, Globe, Info, Search, Bot, Lightbulb, List, Terminal, ChevronRight, FileCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

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
    { 
      title: "Dashboard", 
      path: "/", 
      icon: Home,
      tooltip: "Project overview & SDLC process"
    },
    { 
      title: "Document Management", 
      path: "/documents", 
      icon: FolderOpen, 
      hasSubItems: true,
      tooltip: "Manage all project documentation"
    },
    { 
      title: "Coding Environment", 
      path: "/develop", 
      icon: Terminal,
      tooltip: "Setup environment with Kernel"
    },
    { 
      title: "AI QA", 
      path: "/ai-qa", 
      icon: Search,
      tooltip: "AI-assisted quality assurance"
    },
    { 
      title: "SA Review", 
      path: "/review", 
      icon: CheckCircle,
      tooltip: "Solution Architect review dashboard"
    },
    { 
      title: "RoboCode IPA", 
      path: "/ipa", 
      icon: Bot,
      tooltip: "Intelligent Project Assistant"
    },
    { 
      title: "Activity Log", 
      path: "/activity", 
      icon: List,
      tooltip: "Project activity & history"
    },
    { 
      title: "Settings", 
      path: "/settings", 
      icon: Settings,
      tooltip: "Configure platform settings"
    }
  ];

  const documentCategories = [
    { 
      title: "Core Project Docs", 
      category: "core", 
      icon: FolderOpen,
      subcategories: [
        { title: "Business Requirements Documents (BRDs)", category: "brd", icon: BookOpen },
        { title: "Product Requirements Documents (PRDs)", category: "prd", icon: BookOpen },
        { title: "Project Overview", category: "overview", icon: FolderOpen },
        { title: "User Personas", category: "personas", icon: User }
      ]
    },
    { 
      title: "Design & UI/UX", 
      category: "design", 
      icon: Palette,
      subcategories: [
        { title: "Style Guides & Design Docs", category: "design", icon: Palette },
        { title: "Feature Specifications", category: "feature-specs", icon: FileText }
      ]
    },
    { 
      title: "Technical Specifications", 
      category: "technical", 
      icon: Wrench,
      subcategories: [
        { title: "Technical Specifications", category: "techspec", icon: Wrench },
        { title: "Architecture Documentation", category: "architecture", icon: Code },
        { title: "Code Kernels", category: "kernel", icon: Code },
        { title: "Context Summaries", category: "context", icon: Info },
        { title: "API Documentation", category: "api", icon: Globe },
        { title: "Database Schema", category: "database", icon: Database }
      ]
    },
    { 
      title: "Dev & QA Process", 
      category: "dev-qa", 
      icon: TestTube,
      subcategories: [
        { title: "User Flow & Test Scripts", category: "userflow", icon: TestTube },
        { title: "Testing Guidelines", category: "testing", icon: TestTube },
        { title: "Version Control Practices", category: "versioncontrol", icon: Code },
        { title: "Environment Setup", category: "envsetup", icon: Settings },
        { title: "Deployment Instructions", category: "deployment", icon: Rocket }
      ]
    },
    { 
      title: "Governance & Compliance", 
      category: "governance", 
      icon: Shield,
      subcategories: [
        { title: "Security Practices", category: "security", icon: Shield },
        { title: "Compliance Requirements", category: "compliance", icon: FileCheck }
      ]
    }
  ];

  const handleCategoryFilter = (category: string) => {
    const event = new CustomEvent('documentCategoryChange', { detail: { category } });
    window.dispatchEvent(event);
    console.log(`[ROBOCODE][GlobalLayout]: Document category filter changed to: ${category}`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup className="pt-0">
              <div className="flex items-center justify-center p-4 mb-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/" title="RoboCode Platform - AI-First SDLC Orchestration">
                        <img 
                          src="/lovable-uploads/411ab4ed-6ae1-4704-b5b2-0b6910940aa6.png" 
                          alt="RoboCode Logo" 
                          className="h-8"
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Go to Dashboard</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <SidebarGroupLabel className="flex items-center gap-2">
                Navigation
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-[var(--color-accent-cyan)]" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Primary platform navigation</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SidebarGroupLabel>
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.hasSubItems && item.path === '/documents' ? (
                      <Collapsible defaultOpen={currentPath.startsWith(item.path)}>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton 
                            isActive={isActive(item.path)}
                            tooltip={item.tooltip}
                            className="w-full justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <item.icon className="h-5 w-5" />
                              <span>{item.title}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            <SidebarGroupLabel className="text-xs text-muted-foreground px-2 py-1 flex items-center gap-2">
                              Doc Categories
                               <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="inline h-3 w-3 text-[var(--color-accent-cyan)]" />
                                  </TooltipTrigger>
                                  <TooltipContent side="right">
                                    <p>Filter documents by category</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </SidebarGroupLabel>
                            {documentCategories.map((category) => (
                              <div key={category.category}>
                                <SidebarMenuSubItem>
                                  <SidebarMenuSubButton asChild>
                                    <Collapsible>
                                      <CollapsibleTrigger asChild>
                                        <button 
                                          className="w-full text-left flex items-center gap-2 justify-between" 
                                          title={`Expand ${category.title} subcategories`}
                                        >
                                          <div className="flex items-center gap-2">
                                            <category.icon className="h-4 w-4" />
                                            <span className="text-xs font-medium">{category.title}</span>
                                          </div>
                                          <ChevronRight className="h-3 w-3 transition-transform data-[state=open]:rotate-90" />
                                        </button>
                                      </CollapsibleTrigger>
                                      <CollapsibleContent className="ml-4">
                                        {category.subcategories.map((subcategory) => (
                                          <SidebarMenuSubItem key={subcategory.category}>
                                            <SidebarMenuSubButton asChild>
                                               <TooltipProvider>
                                                <Tooltip>
                                                  <TooltipTrigger asChild>
                                                    <button 
                                                      className="w-full text-left flex items-center gap-2" 
                                                      onClick={() => handleCategoryFilter(subcategory.category)}
                                                      data-category={subcategory.category}
                                                    >
                                                      <subcategory.icon className="h-3 w-3" />
                                                      <span className="text-xs">{subcategory.title}</span>
                                                    </button>
                                                  </TooltipTrigger>
                                                  <TooltipContent side="right">
                                                    <p>Filter to show {subcategory.title.toLowerCase()}</p>
                                                  </TooltipContent>
                                                </Tooltip>
                                              </TooltipProvider>
                                            </SidebarMenuSubButton>
                                          </SidebarMenuSubItem>
                                        ))}
                                      </CollapsibleContent>
                                    </Collapsible>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              </div>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive(item.path)}
                        tooltip={item.tooltip}
                      >
                        <Link to={item.path} className="flex items-center gap-2">
                          <item.icon className="h-5 w-5" />
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
          <main className="flex-1 overflow-auto p-6 bg-[#121212]">
            {children}
          </main>
          <footer className="p-4 bg-background text-xs text-muted-foreground border-t border-border">
            <div className="container flex justify-between items-center">
              <span>© 2025 Robonomics AI</span>
              <div className="flex gap-4">
                <button 
                  className="hover:text-accent transition-colors" 
                  title="Get contextual help for the current page and its features"
                  onClick={() => console.log(`[ROBOCODE][Help]: Context help requested for ${currentPath}`)}
                >
                  Help for this Page
                </button>
                <a href="#" className="hover:text-accent" title="Access comprehensive platform documentation">Documentation</a>
                <a href="#" className="hover:text-accent" title="View privacy policy and data handling practices">Privacy Policy</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default GlobalLayout;
