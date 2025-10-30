'use server';
import { prioritizeTasks, type PrioritizeTasksInput } from '@/ai/flows/prioritize-tasks-with-ai';
import type { Task } from '@/lib/types';
import { z } from 'zod';

const actionSchema = z.object({
  tasks: z.array(z.any()),
});

export async function getPrioritizedTasks(tasks: Task[]) {
  const activeTasks = tasks.filter(task => !task.completed);

  if (activeTasks.length === 0) {
    return { prioritizedTasks: [], error: null };
  }

  const aiInput: PrioritizeTasksInput = {
    tasks: activeTasks.map(task => ({
      name: task.name,
      dueDate: task.dueDate.toISOString().split('T')[0],
      subject: task.subject,
      type: task.type,
      description: task.description || '',
    })),
  };

  try {
    const result = await prioritizeTasks(aiInput);
    return { prioritizedTasks: result.prioritizedTasks, error: null };
  } catch (error) {
    console.error("AI prioritization failed:", error);
    return { prioritizedTasks: [], error: 'Failed to prioritize tasks. Please try again later.' };
  }
}
