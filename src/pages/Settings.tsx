
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Settings as SettingsIcon, Info, User, Bot, GitBranch, Binary } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const settingsCategories = [
  {
    title: 'User Profile',
    description: 'Manage your personal information, role, and display preferences.',
    icon: User,
    link: '#',
    cta: 'Manage Profile',
    disabled: true,
  },
  {
    title: 'AI Model Configuration',
    description: 'Configure LLM vendors and assign specific models to RoboCode tasks.',
    icon: Bot,
    link: '/settings/ai-models',
    cta: 'Manage Models',
    disabled: false,
  },
  {
    title: 'GitHub Integration',
    description: 'Connect and manage your GitHub repositories and app integrations.',
    icon: GitBranch,
    link: '#',
    cta: 'Configure GitHub',
    disabled: true,
  },
  {
    title: 'Kernel Management',
    description: 'Define and version control the Code Kernels used for new modules.',
    icon: Binary,
    link: '#',
    cta: 'Manage Kernels',
    disabled: true,
  },
];

const Settings: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <SettingsIcon className="h-10 w-10 text-[var(--color-accent-cyan)]" />
        <div>
          <h1 className="text-3xl font-bold text-white">Platform Settings</h1>
          <p className="text-lg text-[var(--color-neutral-mid)]">
            Configure integrations, manage models, and set user preferences.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsCategories.map((category) => (
          <Card key={category.title} className="flex flex-col border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors duration-200">
            <CardHeader className="flex-row items-start gap-4 space-y-0 pb-4">
              <div className="p-3 bg-gray-800 rounded-lg">
                <category.icon className="h-6 w-6 text-[var(--color-accent-cyan)]" />
              </div>
              <div>
                <CardTitle className="text-xl text-white">{category.title}</CardTitle>
                <CardDescription className="text-sm text-gray-400 pt-1">{category.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex items-end justify-between">
              <span className="text-xs text-gray-500">{category.disabled ? 'Coming soon' : 'Available'}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div tabIndex={category.disabled ? -1 : undefined}>
                    <Button asChild variant="outline" size="sm" disabled={category.disabled}>
                      <Link to={!category.disabled ? category.link : '#'}>{category.cta}</Link>
                    </Button>
                  </div>
                </TooltipTrigger>
                {category.disabled && (
                  <TooltipContent>
                    <p>This feature is not yet available.</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Settings;
