'use client';

import type { Task } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, Trash2, Calendar as CalendarIcon, ClipboardList, Lightbulb, FileText } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import { Badge } from './ui/badge';
import { getSubjectIcon } from './icons';
import { Separator } from './ui/separator';
import { cn, getSubjectColor, getSubjectBgColor } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const taskTypeIcons = {
  Assignment: <ClipboardList className="h-4 w-4" />,
  Test: <FileText className="h-4 w-4" />,
  Project: <Lightbulb className="h-4 w-4" />,
};

export function TaskList({ tasks, onEditTask, onDeleteTask, onToggleComplete }: TaskListProps) {
  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center">
        <h3 className="text-xl font-semibold">No tasks here!</h3>
        <p className="text-muted-foreground">Add a new task to get started.</p>
      </div>
    );
  }

  const TaskItem = ({ task }: { task: Task }) => {
    const isOverdue = !task.completed && isPast(task.dueDate) && !isToday(task.dueDate);
    const isDueToday = isToday(task.dueDate);
    
    return (
      <Card key={task.id} className={cn(
        "transition-all",
        task.completed ? 'bg-muted/50' : getSubjectBgColor(task.subject),
        isOverdue && 'border-destructive/50'
      )}>
        <CardHeader className="flex flex-row items-start justify-between gap-4 p-4">
          <div className="flex items-start gap-4">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => onToggleComplete(task.id)}
              className={cn("mt-1", task.completed ? '' : getSubjectColor(task.subject))}
            />
            <div className="grid gap-1">
              <CardTitle className={cn("text-lg", task.completed && 'text-muted-foreground line-through')}>
                {task.name}
              </CardTitle>
              {task.description && (
                <CardDescription className={cn(task.completed && 'line-through')}>{task.description}</CardDescription>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEditTask(task)}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDeleteTask(task.id)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">{getSubjectIcon(task.subject)} {task.subject}</div>
            <div className="flex items-center gap-2">{taskTypeIcons[task.type]} {task.type}</div>
          </div>
          <Badge variant={isOverdue ? "destructive" : isDueToday ? "default" : "secondary"} className={isDueToday ? 'bg-accent text-accent-foreground' : ''}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {isOverdue ? 'Overdue' : format(task.dueDate, 'MMM d')}
          </Badge>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      {activeTasks.length > 0 && (
        <div className="space-y-2">
          {activeTasks.map((task) => <TaskItem key={task.id} task={task} />)}
        </div>
      )}
      {completedTasks.length > 0 && activeTasks.length > 0 && (
        <div className="flex items-center">
            <Separator className="flex-1" />
            <span className="mx-4 text-sm text-muted-foreground">Completed</span>
            <Separator className="flex-1" />
        </div>
      )}
      {completedTasks.length > 0 && (
        <div className="space-y-2">
          {completedTasks.map((task) => <TaskItem key={task.id} task={task} />)}
        </div>
      )}
    </div>
  );
}
