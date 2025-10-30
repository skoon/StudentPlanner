'use client';

import { useState } from 'react';
import type { Task } from '@/lib/types';
import { initialTasks } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { PlusCircle, Sparkles } from 'lucide-react';
import { TasksView } from '@/components/tasks-view';
import { CalendarView } from '@/components/calendar-view';
import { TaskDialog } from '@/components/task-dialog';
import { getPrioritizedTasks } from '@/app/actions';
import type { PrioritizedTask } from '@/ai/flows/prioritize-tasks-with-ai';
import { PrioritizedTasksDialog } from './prioritized-tasks-dialog';
import { useToast } from '@/hooks/use-toast';

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isTaskDialogOpen, setTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [prioritizedTasks, setPrioritizedTasks] = useState<PrioritizedTask[]>([]);
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);

  const { toast } = useToast();

  const handleOpenTaskDialog = (task?: Task) => {
    setEditingTask(task);
    setTaskDialogOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...t, ...taskData } : t)));
    } else {
      const newTask: Task = {
        ...taskData,
        id: crypto.randomUUID(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handlePrioritize = async () => {
    setIsAiLoading(true);
    const { prioritizedTasks, error } = await getPrioritizedTasks(tasks);
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    } else {
      setPrioritizedTasks(prioritizedTasks);
      setIsAiDialogOpen(true);
    }
    setIsAiLoading(false);
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex items-center justify-between border-b p-4">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button onClick={handlePrioritize} disabled={isAiLoading}>
            {isAiLoading ? <Sparkles className="animate-spin" /> : <Sparkles />}
            Prioritize with AI
          </Button>
          <Button onClick={() => handleOpenTaskDialog()}>
            <PlusCircle />
            New Task
          </Button>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TasksView
              tasks={tasks}
              onEditTask={handleOpenTaskDialog}
              onDeleteTask={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
              selectedDate={selectedDate}
              onClearDateFilter={() => setSelectedDate(undefined)}
            />
          </div>
          <div className="lg:col-span-1">
            <CalendarView tasks={tasks} selectedDate={selectedDate} onDateSelect={setSelectedDate} />
          </div>
        </div>
      </main>
      <TaskDialog
        isOpen={isTaskDialogOpen}
        setIsOpen={setTaskDialogOpen}
        onSave={handleSaveTask}
        task={editingTask}
      />
      <PrioritizedTasksDialog
        isOpen={isAiDialogOpen}
        setIsOpen={setIsAiDialogOpen}
        tasks={prioritizedTasks}
      />
    </div>
  );
}
