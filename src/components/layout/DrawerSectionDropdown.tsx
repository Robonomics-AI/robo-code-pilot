
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface DrawerSectionDropdownProps {
  title: string;
  icon: React.ElementType;
  subLinks: { title: string; to: string; icon?: React.ElementType }[];
  basePath: string;
}

const DrawerSectionDropdown: React.FC<DrawerSectionDropdownProps> = ({ title, icon: Icon, subLinks, basePath }) => {
  const location = useLocation();
  const expanded = location.pathname.startsWith(basePath);
  return (
    <Collapsible defaultOpen={expanded}>
      <CollapsibleTrigger asChild>
        <button
          className="flex items-center w-full justify-between px-2 py-1 rounded hover:bg-[var(--color-accent-cyan)]/5 outline-none focus:ring-1 focus:ring-accent transition"
          title={title}
          type="button"
        >
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            <span className="font-medium">{title}</span>
          </div>
          <ChevronRight className={`h-4 w-4 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="ml-6 my-1 flex flex-col gap-1">
          {subLinks.map((sub, idx) => (
            <li key={sub.to || idx}>
              <Link
                to={sub.to}
                className="flex items-center gap-2 px-2 py-1 rounded text-sm hover:bg-[var(--color-accent-cyan)]/10 transition truncate"
                title={sub.title}
              >
                {sub.icon && <sub.icon className="h-4 w-4" />}
                <span>{sub.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DrawerSectionDropdown;
