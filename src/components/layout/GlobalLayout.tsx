
import React from 'react';
import Header from './Header';
import { Sidebar, SidebarProvider, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';
import { Home, FileText, Code, HelpCircle, Settings, Clock, FileCheck, UserCheck, FolderOpen, BookOpen, Wrench, Palette } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

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
    { title: "Documents", path: "/documents", icon: FileText },
    { title: "Development", path: "/develop", icon: Code },
    { title: "Triage QA", path: "/triage-qa", icon: FileCheck },
    { title: "SA Review", path: "/review", icon: UserCheck },
    { title: "IPA Help", path: "/ipa", icon: HelpCircle }
  ];

  // Document categories for filtering
  const documentCategories = [
    { title: "All Documents", category: "all", icon: FolderOpen },
    { title: "PRDs & BRDs", category: "pr", icon: BookOpen },
    { title: "Code Kernels", category: "kernel", icon: Wrench },
    { title: "Style Guides & Design Docs", category: "design", icon: Palette },
    { title: "Architecture", category: "arch", icon: Settings }
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
                  alt="RoboCode Logo" 
                  className="h-8"
                />
              </div>
              
              {/* Main Navigation */}
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive(item.path)}
                      tooltip={item.title}
                    >
                      <Link to={item.path} className="flex items-center gap-2">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>

            {/* Document Categories - Only show when on documents page */}
            {currentPath === '/documents' && (
              <SidebarGroup>
                <SidebarGroupLabel>Document Categories</SidebarGroupLabel>
                <SidebarMenu>
                  {documentCategories.map((category) => (
                    <SidebarMenuItem key={category.category}>
                      <SidebarMenuButton asChild>
                        <button 
                          className="w-full text-left flex items-center gap-2" 
                          onClick={() => handleCategoryFilter(category.category)}
                          data-category={category.category}
                        >
                          <category.icon className="h-4 w-4" />
                          <span>{category.title}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            )}

            {/* Information Section */}
            <SidebarGroup>
              <SidebarGroupLabel>Information</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/activity" className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      <span>Activity Log</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/settings" className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
            <div className="container flex justify-between">
              <span>© 2025 Robonomics AI</span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-accent">Help</a>
                <a href="#" className="hover:text-accent">Documentation</a>
                <a href="#" className="hover:text-accent">Privacy Policy</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default GlobalLayout;
