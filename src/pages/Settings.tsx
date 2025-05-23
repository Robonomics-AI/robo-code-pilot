
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon, Info, User, Globe, Shield, Bell, Palette, Code } from 'lucide-react';

/**
 * Settings Page - Future home for RoboCode platform configurations
 * This is a placeholder page shell for MVP, preparing for user preferences and platform settings
 */
const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header with Information Icon */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold text-[var(--color-accent-cyan)]">Settings</h1>
          <span title="This page will contain user preferences, platform configurations, and customization options">
            <Info className="h-6 w-6 text-[var(--color-accent-cyan)] bg-[var(--color-card-bg)] rounded-full p-1" />
          </span>
        </div>
        <p className="text-lg text-[var(--color-neutral-offwhite)]">
          Platform Configuration & User Preferences
        </p>
      </div>
      
      {/* MVP Placeholder Content - Future Settings Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-[#444444]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--color-neutral-offwhite)]">
              <User className="h-5 w-5 text-[var(--color-accent-cyan)]" />
              User Profile
              <span title="Future: Manage user information and preferences">
                <Info className="h-4 w-4 text-[var(--color-accent-cyan)]" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--color-neutral-mid)]">
              Future home for user profile management, including name, email, role settings, and personal preferences.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-[#444444]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--color-neutral-offwhite)]">
              <Globe className="h-5 w-5 text-[var(--color-accent-green)]" />
              Project Settings
              <span title="Future: Configure project-specific settings and integrations">
                <Info className="h-4 w-4 text-[var(--color-accent-cyan)]" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--color-neutral-mid)]">
              Future home for project-specific configurations, including GitHub App (GA) integrations, repository settings, and project context management.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-[#444444]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--color-neutral-offwhite)]">
              <Shield className="h-5 w-5 text-[var(--color-accent-purple)]" />
              Security & Compliance
              <span title="Future: Security settings and compliance configurations">
                <Info className="h-4 w-4 text-[var(--color-accent-cyan)]" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--color-neutral-mid)]">
              Future home for security preferences, compliance settings, and access controls for regulated software development.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-[#444444]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--color-neutral-offwhite)]">
              <Bell className="h-5 w-5 text-[var(--color-accent-orange)]" />
              Notifications
              <span title="Future: Configure notification preferences and alerts">
                <Info className="h-4 w-4 text-[var(--color-accent-cyan)]" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--color-neutral-mid)]">
              Future home for notification preferences, email alerts, and communication settings for SA reviews and module updates.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-[#444444]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--color-neutral-offwhite)]">
              <Palette className="h-5 w-5 text-[var(--color-accent-cyan)]" />
              User Interface (UI) Preferences
              <span title="Future: Customize UI appearance and layout preferences">
                <Info className="h-4 w-4 text-[var(--color-accent-cyan)]" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--color-neutral-mid)]">
              Future home for User Interface (UI) customization, theme preferences (currently Dark Mode First), and layout configurations.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-[#444444]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--color-neutral-offwhite)]">
              <Code className="h-5 w-5 text-[var(--color-accent-green)]" />
              Development Tools
              <span title="Future: Configure development environment and tool integrations">
                <Info className="h-4 w-4 text-[var(--color-accent-cyan)]" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--color-neutral-mid)]">
              Future home for development tool configurations, Integrated Development Environment (IDE) integrations, and coding environment preferences.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
