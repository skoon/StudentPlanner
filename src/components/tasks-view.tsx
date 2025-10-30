'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TaskList } from '@/components/task-list';
import type { Task } from '@/lib/types';
import { subjects } from '@/lib/types';
import { getSubjectIcon } from './icons';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { format } from 'date-fns';
import { X } from 'lucide-react';

interface TasksViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string) => void;
  selectedDate?: Date;
  onClearDateFilter: () => void;
}

const allSubjects = ['All', ...subjects];

export function TasksView({ tasks, selectedDate, onClearDateFilter, ...rest }: TasksViewProps) {
  const filteredTasks = selectedDate
    ? tasks.filter((task) => format(task.dueDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
    : tasks;

  return (
    <div>
      {selectedDate && (
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            Tasks for <span className="text-primary">{format(selectedDate, 'PPP')}</span>
          </h2>
          <Button variant="ghost" size="sm" onClick={onClearDateFilter}>
            <X className="mr-2 h-4 w-4" /> Clear Filter
          </Button>
        </div>
      )}
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
          {allSubjects.map((subject) => {
            const subjectTasks = subject === 'All' ? filteredTasks : filteredTasks.filter((t) => t.subject === subject);
            const activeCount = subjectTasks.filter(t => !t.completed).length;

            return (
              <TabsTrigger key={subject} value={subject} disabled={subjectTasks.length === 0}>
                <div className="flex items-center gap-2">
                  {subject !== 'All' && getSubjectIcon(subject)}
                  <span>{subject}</span>
                  {activeCount > 0 && <Badge variant="secondary" className="h-5">{activeCount}</Badge>}
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
        {allSubjects.map((subject) => {
          const subjectTasks = subject === 'All' ? filteredTasks : filteredTasks.filter((t) => t.subject === subject);
          return (
            <TabsContent key={subject} value={subject}>
              <TaskList tasks={subjectTasks} {...rest} />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
