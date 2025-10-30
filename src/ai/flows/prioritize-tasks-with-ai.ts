'use server';
/**
 * @fileOverview This file contains a Genkit flow that prioritizes tasks based on urgency and importance.
 *
 * - prioritizeTasks - A function that takes a list of tasks and returns a prioritized list.
 * - Task - The input type for the prioritizeTasks function.
 * - PrioritizedTask - The return type for the prioritizeTasks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TaskSchema = z.object({
  name: z.string().describe('The name of the task.'),
  dueDate: z.string().describe('The due date of the task (YYYY-MM-DD).'),
  subject: z.string().describe('The subject or course the task belongs to.'),
  type: z.string().describe('The type of task (e.g., assignment, test, project).'),
  description: z.string().describe('A brief description of the task.'),
});

export type Task = z.infer<typeof TaskSchema>;

const PrioritizedTaskSchema = TaskSchema.extend({
  priority: z.number().describe('The priority of the task (1 being highest).'),
  reason: z.string().describe('The reason for the assigned priority.'),
});

export type PrioritizedTask = z.infer<typeof PrioritizedTaskSchema>;

const PrioritizeTasksInputSchema = z.object({
  tasks: z.array(TaskSchema).describe('A list of tasks to prioritize.'),
});

export type PrioritizeTasksInput = z.infer<typeof PrioritizeTasksInputSchema>;

const PrioritizeTasksOutputSchema = z.object({
  prioritizedTasks: z.array(PrioritizedTaskSchema).describe('A list of tasks with assigned priorities.'),
});

export type PrioritizeTasksOutput = z.infer<typeof PrioritizeTasksOutputSchema>;

export async function prioritizeTasks(input: PrioritizeTasksInput): Promise<PrioritizeTasksOutput> {
  return prioritizeTasksFlow(input);
}

const prioritizeTasksPrompt = ai.definePrompt({
  name: 'prioritizeTasksPrompt',
  input: {schema: PrioritizeTasksInputSchema},
  output: {schema: PrioritizeTasksOutputSchema},
  prompt: `You are an AI assistant helping students prioritize their tasks.

  Analyze the following tasks and provide a prioritized list with a reason for each task's priority.
  Consider urgency (due date), importance (type of task), and subject.

  Tasks:
  {{#each tasks}}
  - Name: {{name}}
    Due Date: {{dueDate}}
    Subject: {{subject}}
    Type: {{type}}
    Description: {{description}}
  {{/each}}

  Prioritized Tasks:
  {{~#each prioritizedTasks as |task| ~}}
  - Priority: {{task.priority}}
    Name: {{task.name}}
    Due Date: {{task.dueDate}}
    Subject: {{task.subject}}
    Type: {{task.type}}
    Description: {{task.description}}
    Reason: {{task.reason}}
  {{~/each~}}
  `,
});

const prioritizeTasksFlow = ai.defineFlow(
  {
    name: 'prioritizeTasksFlow',
    inputSchema: PrioritizeTasksInputSchema,
    outputSchema: PrioritizeTasksOutputSchema,
  },
  async input => {
    const {output} = await prioritizeTasksPrompt(input);
    return output!;
  }
);
