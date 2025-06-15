
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Home, FolderOpen, Terminal, Search, CheckCircle, Bot, List, Settings, BookOpen, Wrench, Code, Info, Globe, Database, TestTube, Shield, FileCheck, Palette, Rocket, User } from "lucide-react";
import DrawerSectionDropdown from "./DrawerSectionDropdown";

const DOC_CATEGORIES = [
  {
    title: "BRDs",
    icon: BookOpen,
    to: "/documents?category=brd",
  },
  {
    title: "PRDs",
    icon: BookOpen,
    to: "/documents?category=prd",
  },
  {
    title: "Project Overview",
    icon: FolderOpen,
    to: "/documents?category=overview",
  },
  {
    title: "User Personas",
    icon: User,
    to: "/documents?category=personas",
  },
  {
    title: "Style Guides & Design Docs",
    icon: Palette,
    to: "/documents?category=design",
  },
  {
    title: "Feature Specifications",
    icon: BookOpen,
    to: "/documents?category=feature-specs",
  },
  {
    title: "Technical Specifications",
    icon: Wrench,
    to: "/documents?category=techspec",
  },
  {
    title: "Architecture Documentation",
    icon: Code,
    to: "/documents?category=architecture",
  },
  {
    title: "Code Kernels",
    icon: Code,
    to: "/documents?category=kernel",
  },
  {
    title: "Context Summaries",
    icon: Info,
    to: "/documents?category=context",
  },
  {
    title: "API Documentation",
    icon: Globe,
    to: "/documents?category=api",
  },
  {
    title: "Database Schema",
    icon: Database,
    to: "/documents?category=database",
  },
  {
    title: "User Flow & Test Scripts",
    icon: TestTube,
    to: "/documents?category=userflow",
  },
  {
    title: "Testing Guidelines",
    icon: TestTube,
    to: "/documents?category=testing",
  },
  {
    title: "Version Control Practices",
    icon: Code,
    to: "/documents?category=versioncontrol",
  },
  {
    title: "Environment Setup",
    icon: Wrench,
    to: "/documents?category=envsetup",
  },
  {
    title: "Deployment Instructions",
    icon: Rocket,
    to: "/documents?category=deployment",
  },
  {
    title: "Security Practices",
    icon: Shield,
    to: "/documents?category=security",
  },
  {
    title: "Compliance Requirements",
    icon: FileCheck,
    to: "/documents?category=compliance",
  },
];

const PAGE_SECTIONS = [
  {
    title: "Dashboard",
    path: "/",
    icon: Home,
    sub: [],
  },
  {
    title: "Document Management",
    path: "/documents",
    icon: FolderOpen,
    sub: DOC_CATEGORIES,
  },
  {
    title: "Coding Environment",
    path: "/develop",
    icon: Terminal,
    sub: [
      { title: "Setup Instructions", icon: Terminal, to: "/develop/setup" },
      { title: "Kernel Usage", icon: Code, to: "/develop/kernel" },
    ],
  },
  {
    title: "AI QA",
    path: "/ai-qa",
    icon: Search,
    sub: [
      { title: "Current QA Items", icon: Search, to: "/ai-qa/items" },
    ],
  },
  {
    title: "SA Review",
    path: "/review",
    icon: CheckCircle,
    sub: [
      { title: "Module List", icon: List, to: "/review/modules" },
      { title: "Review Archive", icon: CheckCircle, to: "/review/archive" },
    ],
  },
  {
    title: "RoboCode IPA",
    path: "/ipa",
    icon: Bot,
    sub: [
      { title: "Ask IPA", icon: Bot, to: "/ipa/ask" },
    ],
  },
  {
    title: "Activity Log",
    path: "/activity",
    icon: List,
    sub: [],
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
    sub: [],
  },
];

const NavDrawer: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="pt-0">
          <div className="flex items-center justify-center p-4 mb-2">
            <Link to="/" title="RoboCode Platform - AI-First SDLC Orchestration">
              <img
                src="/lovable-uploads/411ab4ed-6ae1-4704-b5b2-0b6910940aa6.png"
                alt="RoboCode Logo"
                className="h-8"
              />
            </Link>
          </div>
          <SidebarGroupLabel className="flex items-center gap-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarMenu>
            {PAGE_SECTIONS.map((section) =>
              section.sub && section.sub.length > 0 ? (
                <SidebarMenuItem key={section.title}>
                  <DrawerSectionDropdown
                    title={section.title}
                    icon={section.icon}
                    subLinks={section.sub}
                    basePath={section.path}
                  />
                </SidebarMenuItem>
              ) : (
                <SidebarMenuItem key={section.title}>
                  <SidebarMenuButton asChild isActive={isActive(section.path)}>
                    <Link to={section.path} className="flex items-center gap-2">
                      <section.icon className="h-5 w-5" />
                      <span>{section.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default NavDrawer;
