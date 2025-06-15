
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Code, Users, CheckCircle, Activity, Folder, ChevronRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  // Enhanced SDLC steps with stage grouping and better navigation
  const sdlcSteps = [
    // IDEATION STAGE
    { 
      id: 1, 
      name: 'Requirement Analysis', 
      description: 'Define project requirements and business goals',
      stage: 'ideation',
      navigateTo: '/documents?category=brd',
      color: 'bg-purple-500/20 text-purple-400'
    },
    { 
      id: 2, 
      name: 'User Story Creation', 
      description: 'Create detailed user stories and acceptance criteria',
      stage: 'ideation',
      navigateTo: '/documents?category=userflow',
      color: 'bg-purple-500/20 text-purple-400'
    },
    { 
      id: 3, 
      name: 'Technical Planning', 
      description: 'Architecture planning and technical specifications',
      stage: 'ideation',
      navigateTo: '/documents?category=techspec',
      color: 'bg-purple-500/20 text-purple-400'
    },
    
    // SETUP STAGE
    { 
      id: 4, 
      name: 'Environment Setup', 
      description: 'Configure development environment and tools',
      stage: 'setup',
      navigateTo: '/develop',
      color: 'bg-blue-500/20 text-blue-400'
    },
    { 
      id: 5, 
      name: 'Kernel Application', 
      description: 'Apply code standards and architectural patterns',
      stage: 'setup',
      navigateTo: '/documents?category=kernel',
      color: 'bg-blue-500/20 text-blue-400'
    },
    
    // DEVELOPMENT STAGE
    { 
      id: 6, 
      name: 'Vibe Coding (UI)', 
      description: 'Rapid UI development using AI-assisted tools',
      stage: 'development',
      navigateTo: '/develop',
      color: 'bg-green-500/20 text-green-400'
    },
    { 
      id: 7, 
      name: 'Logic Implementation', 
      description: 'Business logic and functionality development',
      stage: 'development',
      navigateTo: '/develop',
      color: 'bg-green-500/20 text-green-400'
    },
    { 
      id: 8, 
      name: 'Integration Testing', 
      description: 'Test component integration and data flow',
      stage: 'development',
      navigateTo: '/ai-qa',
      color: 'bg-green-500/20 text-green-400'
    },
    
    // QA STAGE
    { 
      id: 9, 
      name: 'AI Quality Assurance', 
      description: 'AI-assisted code review and quality checks',
      stage: 'qa',
      navigateTo: '/ai-qa',
      color: 'bg-yellow-500/20 text-yellow-400'
    },
    { 
      id: 10, 
      name: 'User Testing', 
      description: 'User acceptance testing and feedback collection',
      stage: 'qa',
      navigateTo: '/documents?category=testing',
      color: 'bg-yellow-500/20 text-yellow-400'
    },
    
    // REVIEW STAGE
    { 
      id: 11, 
      name: 'SA Code Review', 
      description: 'Solution Architect technical review and approval',
      stage: 'review',
      navigateTo: '/review',
      color: 'bg-orange-500/20 text-orange-400'
    },
    { 
      id: 12, 
      name: 'Security Review', 
      description: 'Security validation and compliance checks',
      stage: 'review',
      navigateTo: '/documents?category=security',
      color: 'bg-orange-500/20 text-orange-400'
    },
    
    // INTEGRATION STAGE
    { 
      id: 13, 
      name: 'Integration', 
      description: 'Merge approved code into main branch',
      stage: 'integration',
      navigateTo: '/review',
      color: 'bg-cyan-500/20 text-cyan-400'
    },
    
    // PRODUCTION STAGE
    { 
      id: 14, 
      name: 'Deployment', 
      description: 'Deploy to production environment',
      stage: 'production',
      navigateTo: '/documents?category=deployment',
      color: 'bg-red-500/20 text-red-400'
    }
  ];

  const getStageColor = (stage: string) => {
    const stageColors = {
      ideation: 'border-purple-500/30 bg-purple-500/5',
      setup: 'border-blue-500/30 bg-blue-500/5',
      development: 'border-green-500/30 bg-green-500/5',
      qa: 'border-yellow-500/30 bg-yellow-500/5',
      review: 'border-orange-500/30 bg-orange-500/5',
      integration: 'border-cyan-500/30 bg-cyan-500/5',
      production: 'border-red-500/30 bg-red-500/5'
    };
    return stageColors[stage as keyof typeof stageColors] || 'border-gray-500/30 bg-gray-500/5';
  };

  // Enhanced project statistics
  const projectStats = [
    { 
      label: 'Active Modules', 
      value: '12', 
      icon: Code,
      tooltip: 'Number of modules currently in development'
    },
    { 
      label: 'Documents', 
      value: '47', 
      icon: FileText,
      tooltip: 'Total project documents across all categories'
    },
    { 
      label: 'Pending Reviews', 
      value: '4', 
      icon: CheckCircle,
      tooltip: 'Modules awaiting Solution Architect review'
    },
    { 
      label: 'Team Members', 
      value: '3', 
      icon: Users,
      tooltip: 'Active team members on RoboCode Internal Build'
    }
  ];

  // Enhanced module navigation cards
  const moduleCards = [
    {
      title: 'Document Management',
      description: 'Access and organize all project documentation with advanced categorization and search.',
      icon: Folder,
      path: '/documents',
      buttonText: 'Manage Documents',
      stats: '47 docs'
    },
    {
      title: 'Coding Environment Setup',
      description: 'Set up development environment with Kernel guidance and Git workflow configuration.',
      icon: Code,
      path: '/develop',
      buttonText: 'Setup Environment',
      stats: 'Kernel v0.1'
    },
    {
      title: 'SA Code Review',
      description: 'Submit code for Solution Architect review using the Integrated Review Environment (IRE).',
      icon: CheckCircle,
      path: '/review',
      buttonText: 'Review Code',
      stats: '4 pending'
    },
    {
      title: 'Project Assistant (IPA)',
      description: 'Get intelligent assistance for project guidance, documentation, and troubleshooting.',
      icon: Activity,
      path: '/ipa',
      buttonText: 'Get Help',
      stats: 'Always available'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Project Statistics - Moved to top for prominence */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {projectStats.map((stat, index) => (
          <Card key={index} className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--color-neutral-mid)] mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-[var(--color-accent-cyan)]">{stat.value}</p>
                </div>
                <span title={stat.tooltip}>
                  <stat.icon className="h-8 w-8 text-[var(--color-accent-cyan)]/50" />
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced SDLC Process Flow Diagram */}
      <Card className="robo-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-2xl font-bold text-[var(--color-accent-cyan)]">
              AI-First SDLC Process Flow
            </CardTitle>
            <span title="Interactive 14-step Software Development Lifecycle optimized for AI-assisted development">
              <Info className="h-6 w-6 text-[var(--color-accent-cyan)]" />
            </span>
          </div>
          <p className="text-[var(--color-neutral-light)]">
            Interactive workflow diagram showing the complete AI-first development process. Click any step to navigate to the relevant module.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Stage-grouped SDLC steps with enhanced visuals */}
            {['ideation', 'setup', 'development', 'qa', 'review', 'integration', 'production'].map(stage => (
              <div key={stage} className={`p-4 rounded-lg border-2 ${getStageColor(stage)}`}>
                <h3 className="text-lg font-semibold text-[var(--color-neutral-offwhite)] mb-3 capitalize">
                  {stage} Stage
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sdlcSteps.filter(step => step.stage === stage).map((step, index, stageSteps) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <Link 
                        to={step.navigateTo}
                        className={`flex-1 p-3 rounded-lg border ${step.color} border-current/30 hover:border-current hover:scale-105 transition-all duration-200 cursor-pointer group`}
                        title={`Navigate to ${step.name}: ${step.description}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{step.name}</p>
                            <p className="text-xs opacity-80 mt-1">{step.description}</p>
                          </div>
                          <span className="opacity-50 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="h-4 w-4" />
                          </span>
                        </div>
                      </Link>
                      {index < stageSteps.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-[var(--color-neutral-mid)] flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Module Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {moduleCards.map((module, index) => (
          <Card key={index} className="hover-lift">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span title={`Navigate to ${module.title}`}>
                  <module.icon className="h-6 w-6 text-[var(--color-accent-cyan)]" />
                </span>
                <CardTitle className="text-xl">{module.title}</CardTitle>
                <span className="text-xs bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] px-2 py-1 rounded-full">
                  {module.stats}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--color-neutral-light)] mb-4">{module.description}</p>
              <Button asChild className="w-full robo-button-primary">
                <Link to={module.path}>{module.buttonText}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Recent Activity */}
      <Card className="robo-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
            <span title="Latest project activities and updates">
              <Info className="h-5 w-5 text-[var(--color-accent-cyan)]" />
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-[var(--color-hover-bg)] rounded-lg">
              <span title="Document uploaded successfully">
                <FileText className="h-5 w-5 text-[var(--color-accent-green)]" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium">PRD v1.2 uploaded to Core Project Docs</p>
                <p className="text-xs text-[var(--color-neutral-mid)]">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[var(--color-hover-bg)] rounded-lg">
              <span title="Code review completed">
                <CheckCircle className="h-5 w-5 text-[var(--color-accent-cyan)]" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium">SA Review completed for DocumentManager_UI_Enhancement</p>
                <p className="text-xs text-[var(--color-neutral-mid)]">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[var(--color-hover-bg)] rounded-lg">
              <span title="Development environment setup">
                <Code className="h-5 w-5 text-[var(--color-accent-orange)]" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium">Coding environment configured for new module development</p>
                <p className="text-xs text-[var(--color-neutral-mid)]">6 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
