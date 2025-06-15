
import React, { useState, useMemo } from 'react';
import { Bot, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { VENDOR_DATA, TASK_DATA, Vendor, AIModel, AITask } from '@/utils/ai-config-data';
import VendorCard from '@/components/settings/VendorCard';
import ApiKeyModal from '@/components/settings/ApiKeyModal';
import TaskAssignmentTable from '@/components/settings/TaskAssignmentTable';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export type VendorId = keyof typeof VENDOR_DATA;

export interface VendorState extends Vendor {
  connected: boolean;
  apiKey: string | null;
}

export type TaskId = keyof typeof TASK_DATA;

export interface TaskState extends AITask {
  assignedModel: string; // e.g., "openai/gpt-4o"
  enabled: boolean;
}

const AIModelConfiguration: React.FC = () => {
  const [vendors, setVendors] = useState<Record<VendorId, VendorState>>(
    Object.entries(VENDOR_DATA).reduce((acc, [id, vendor]) => {
      acc[id as VendorId] = { ...vendor, connected: false, apiKey: null };
      return acc;
    }, {} as Record<VendorId, VendorState>)
  );

  const [tasks, setTasks] = useState<Record<TaskId, TaskState>>(
    Object.entries(TASK_DATA).reduce((acc, [id, task]) => {
      acc[id as TaskId] = { ...task, assignedModel: task.defaultModel, enabled: task.defaultEnabled };
      return acc;
    }, {} as Record<TaskId, TaskState>)
  );

  const [modalState, setModalState] = useState<{ isOpen: boolean; vendorId: VendorId | null }>({
    isOpen: false,
    vendorId: null,
  });

  const handleManageClick = (vendorId: VendorId) => {
    setModalState({ isOpen: true, vendorId });
  };

  const handleSaveApiKey = (vendorId: VendorId, apiKey: string) => {
    setVendors(prev => ({
      ...prev,
      [vendorId]: { ...prev[vendorId], connected: true, apiKey },
    }));
    setModalState({ isOpen: false, vendorId: null });
    toast.success(`${vendors[vendorId].name} connected successfully!`);
  };

  const availableModels = useMemo(() => {
    return Object.values(vendors)
      .filter(v => v.connected)
      .flatMap(v => v.models.map(model => ({
        value: `${v.id}/${model.id}`,
        label: `${v.name} / ${model.name}`,
      })));
  }, [vendors]);
  
  const handleTaskChange = (taskId: TaskId, field: keyof TaskState, value: any) => {
    setTasks(prev => ({
      ...prev,
      [taskId]: { ...prev[taskId], [field]: value },
    }));
  };
  
  const handleSaveChanges = () => {
    console.log("Saving changes:", { vendors, tasks });
    toast.success("AI assignments saved successfully!");
  };

  return (
    <div className="space-y-8 text-white">
      <div className="flex items-center gap-4">
        <Bot className="h-10 w-10 text-[var(--color-accent-purple)]" />
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">AI Model Configuration</h1>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-gray-400 hover:text-white" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Configure the Large Language Models (LLMs) used for automated tasks like AI QA and IPA assistance. Changes made here will affect which AI service is called by the RoboCode platform.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-lg text-[var(--color-neutral-mid)]">
            Manage AI vendors and assign models to specific RoboCode workflow tasks.
          </p>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Connected AI Vendors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.entries(vendors).map(([id, vendor]) => (
            <VendorCard key={id} vendor={vendor} onManage={() => handleManageClick(id as VendorId)} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">RoboCode AI Task Assignments</h2>
        <TaskAssignmentTable 
          tasks={tasks} 
          availableModels={availableModels}
          onTaskChange={handleTaskChange}
        />
        <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveChanges}>Save AI Assignments</Button>
        </div>
      </section>
      
      {modalState.vendorId && (
        <ApiKeyModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ isOpen: false, vendorId: null })}
          vendor={vendors[modalState.vendorId]}
          onSave={handleSaveApiKey}
        />
      )}
    </div>
  );
};

export default AIModelConfiguration;
