import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Calendar
} from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Progress
} from "@/components/ui/progress"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Badge
} from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  ScrollArea,
  ScrollBar,
} from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Slider
} from "@/components/ui/slider"
import {
  Switch
} from "@/components/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Skeleton
} from "@/components/ui/skeleton"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Separator
} from "@/components/ui/separator"
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import {
  Progress as RadialProgress
} from "@/components/ui/progress"
import {
  ResizableHandle as SonnerResizableHandle,
  ResizablePanel as SonnerResizablePanel,
  ResizablePanelGroup as SonnerResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Separator as SonnerSeparator
} from "@/components/ui/separator"
import {
  RadioGroup as SonnerRadioGroup,
  RadioGroupItem as SonnerRadioGroupItem
} from "@/components/ui/radio-group"
import {
  NavigationMenu as SonnerNavigationMenu,
  NavigationMenuContent as SonnerNavigationMenuContent,
  NavigationMenuItem as SonnerNavigationMenuItem,
  NavigationMenuLink as SonnerNavigationMenuLink,
  NavigationMenuList as SonnerNavigationMenuList,
  NavigationMenuTrigger as SonnerNavigationMenuTrigger,
  NavigationMenuViewport as SonnerNavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {
  ContextMenu as SonnerContextMenu,
  ContextMenuCheckboxItem as SonnerContextMenuCheckboxItem,
  ContextMenuContent as SonnerContextMenuContent,
  ContextMenuItem as SonnerContextMenuItem,
  ContextMenuLabel as SonnerContextMenuLabel,
  ContextMenuRadioGroup as SonnerContextMenuRadioGroup,
  ContextMenuRadioItem as SonnerContextMenuRadioItem,
  ContextMenuSeparator as SonnerContextMenuSeparator,
  ContextMenuSub as SonnerContextMenuSub,
  ContextMenuSubContent as SonnerContextMenuSubContent,
  ContextMenuSubTrigger as SonnerContextMenuSubTrigger,
  ContextMenuTrigger as SonnerContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  DropdownMenuPortal as SonnerDropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import {
  Progress as SonnerRadialProgress
} from "@/components/ui/progress"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DateCalendar
} from "@/components/ui/calendar"
import {
  Popover as DatePopover,
  PopoverContent as DatePopoverContent,
  PopoverTrigger as DatePopoverTrigger,
} from "@/components/ui/popover"
import {
  Progress as DateRadialProgress
} from "@/components/ui/progress"
import {
  ResizableHandle as DateSonnerResizableHandle,
  ResizablePanel as DateSonnerResizablePanel,
  ResizablePanelGroup as DateSonnerResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Separator as DateSonnerSeparator
} from "@/components/ui/separator"
import {
  RadioGroup as DateSonnerRadioGroup,
  RadioGroupItem as DateSonnerRadioGroupItem
} from "@/components/ui/radio-group"
import {
  NavigationMenu as DateSonnerNavigationMenu,
  NavigationMenuContent as DateSonnerNavigationMenuContent,
  NavigationMenuItem as DateSonnerNavigationMenuItem,
  NavigationMenuLink as DateSonnerNavigationMenuLink,
  NavigationMenuList as DateSonnerNavigationMenuList,
  NavigationMenuTrigger as DateSonnerNavigationMenuTrigger,
  NavigationMenuViewport as DateSonnerNavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {
  ContextMenu as DateSonnerContextMenu,
  ContextMenuCheckboxItem as DateSonnerContextMenuCheckboxItem,
  ContextMenuContent as DateSonnerContextMenuContent,
  ContextMenuItem as DateSonnerContextMenuItem,
  ContextMenuLabel as DateSonnerContextMenuLabel,
  ContextMenuRadioGroup as DateSonnerContextMenuRadioGroup,
  ContextMenuRadioItem as DateSonnerContextMenuRadioItem,
  ContextMenuSeparator as DateSonnerContextMenuSeparator,
  ContextMenuSub as DateSonnerContextMenuSub,
  ContextMenuSubContent as DateSonnerContextMenuSubContent,
  ContextMenuSubTrigger as DateSonnerContextMenuSubTrigger,
  ContextMenuTrigger as DateSonnerContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  DropdownMenuPortal as DateSonnerDropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import {
  Progress as DateSonnerRadialProgress
} from "@/components/ui/progress"
import {
  LucideIcon
} from "lucide-react"
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import React from "react";

type Document = {
  id: string;
  title: string;
  category: string;
  description: string;
  status: "draft" | "published" | "archived";
  createdAt: Date;
  updatedAt: Date;
};

const documents: Document[] = [
  {
    id: "1",
    title: "Project Charter",
    category: "overview",
    description: "Defines the project objectives and scope.",
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Business Requirements Document",
    category: "brd",
    description: "Details the business needs and requirements.",
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Technical Specifications",
    category: "techspec",
    description: "Outlines the technical requirements and specifications.",
    status: "draft",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "User Interface Design",
    category: "design",
    description: "Describes the user interface design and specifications.",
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    title: "Database Schema",
    category: "database",
    description: "Details the database schema and design.",
    status: "archived",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    title: "API Documentation",
    category: "api",
    description: "Provides documentation for the project APIs.",
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    title: "Testing Guidelines",
    category: "testing",
    description: "Provides guidelines for testing the project.",
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "8",
    title: "Deployment Instructions",
    category: "deployment",
    description: "Provides instructions for deploying the project.",
    status: "draft",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "9",
    title: "Security Practices",
    category: "security",
    description: "Describes the security practices for the project.",
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "10",
    title: "Compliance Requirements",
    category: "compliance",
    description: "Details the compliance requirements for the project.",
    status: "archived",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "11",
    title: "User Personas",
    category: "personas",
    description: "Details the compliance requirements for the project.",
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "12",
    title: "Feature Specifications",
    category: "feature-specs",
    description: "Details the compliance requirements for the project.",
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "13",
    title: "Code Kernels",
    category: "kernel",
    description: "Details the compliance requirements for the project.",
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "14",
    title: "Context Summaries",
    category: "context",
    description: "Details the compliance requirements for the project.",
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "15",
    title: "User Flow & Test Scripts",
    category: "userflow",
    description: "Details the compliance requirements for the project.",
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "16",
    title: "Version Control Practices",
    category: "versioncontrol",
    description: "Details the compliance requirements for the project.",
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "17",
    title: "Environment Setup",
    category: "envsetup",
    description: "Details the compliance requirements for the project.",
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "18",
    title: "Product Requirements Documents",
    category: "prd",
    description: "Details the product requirements.",
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "19",
    title: "Architecture Documentation",
    category: "architecture",
    description: "Details the architecture.",
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const getCategoryFromQuery = (search: string) => {
  const params = new URLSearchParams(search);
  return params.get("category");
};

const DocumentManager = () => {
  const location = useLocation();
  const selectedCategory = getCategoryFromQuery(location.search);

  const filteredDocuments = selectedCategory
    ? documents.filter((doc) => doc.category === selectedCategory)
    : documents;

  return (
    <div>
      {/* H2 title reflects current document category */}
      <div className="flex items-center gap-2 mb-5">
        <h2 className="text-2xl font-bold text-[var(--color-accent-cyan)]">
          Documents{selectedCategory ? `: ${selectedCategory.toUpperCase()}` : ""}
        </h2>
      </div>
    </div>
  );
};

export default DocumentManager;
