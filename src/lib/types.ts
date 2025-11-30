import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Task name is required."),
  subject: z.string().min(1, "Subject is required."),
  type: z.enum(["Assignment", "Test", "Project"]),
  dueDate: z.date({ required_error: "Due date is required." }),
  reminder: z.date().optional(),
  description: z.string().optional(),
  completed: z.boolean(),
});

export type Task = z.infer<typeof taskSchema>;

export const subjects = ["Math", "Science", "History", "English", "Art", "Other"];
