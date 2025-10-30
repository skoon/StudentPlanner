'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { PrioritizedTask } from '@/ai/flows/prioritize-tasks-with-ai';
import { format } from 'date-fns';

interface PrioritizedTasksDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  tasks: PrioritizedTask[];
}

export function PrioritizedTasksDialog({ isOpen, setIsOpen, tasks }: PrioritizedTasksDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>AI Prioritized Tasks</DialogTitle>
          <DialogDescription>
            Here's a suggested order to tackle your tasks, based on urgency and importance.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Priority</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <TableRow key={task.name + task.priority}>
                    <TableCell>
                      <Badge className="text-lg" variant={task.priority <= 3 ? "destructive" : task.priority <= 6 ? "default" : "secondary"}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{task.name}</TableCell>
                    <TableCell>{format(new Date(task.dueDate), 'PPP')}</TableCell>
                    <TableCell className="text-muted-foreground">{task.reason}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No active tasks to prioritize.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
