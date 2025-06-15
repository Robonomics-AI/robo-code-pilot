
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { TaskState, TaskId } from '@/pages/settings/AIModelConfiguration';
import { Badge } from '../ui/badge';

interface TaskAssignmentTableProps {
  tasks: Record<TaskId, TaskState>;
  availableModels: { value: string; label: string }[];
  onTaskChange: (taskId: TaskId, field: keyof TaskState, value: any) => void;
}

const TaskAssignmentTable: React.FC<TaskAssignmentTableProps> = ({ tasks, availableModels, onTaskChange }) => {
  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700 hover:bg-gray-800/50">
            <TableHead className="w-[25%] text-white font-semibold">RoboCode Task</TableHead>
            <TableHead className="w-[35%] text-white font-semibold">Assigned Vendor & Model</TableHead>
            <TableHead className="w-[30%] text-white font-semibold">Description</TableHead>
            <TableHead className="text-right text-white font-semibold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(tasks).map(([id, task]) => (
            <TableRow key={id} className="border-gray-700 hover:bg-gray-800/50">
              <TableCell className="font-medium text-gray-200">{task.name}</TableCell>
              <TableCell>
                {availableModels.length > 0 ? (
                  <Select
                    value={task.assignedModel}
                    onValueChange={(value) => onTaskChange(id as TaskId, 'assignedModel', value)}
                    disabled={!task.enabled}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a model..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableModels.map(model => (
                        <SelectItem key={model.value} value={model.value}>{model.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant="destructive" className="bg-orange-600/20 text-orange-400 border-orange-500/30">
                    No connected vendors
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-gray-400 text-sm">{task.description}</TableCell>
              <TableCell className="text-right">
                <Switch
                  checked={task.enabled}
                  onCheckedChange={(checked) => onTaskChange(id as TaskId, 'enabled', checked)}
                  aria-label={`Enable/disable ${task.name}`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskAssignmentTable;
