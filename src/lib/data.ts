import type { Task } from "./types";

export const initialTasks: Task[] = [
  {
    id: "1",
    name: "Algebra II Homework",
    subject: "Math",
    type: "Assignment",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    description: "Complete problems 1-20 on page 35.",
    completed: false,
  },
  {
    id: "2",
    name: "World War II Essay",
    subject: "History",
    type: "Project",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 10)),
    description: "Write a 5-page essay on the turning points of WWII.",
    completed: false,
  },
  {
    id: "3",
    name: "Biology Midterm Exam",
    subject: "Science",
    type: "Test",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    description: "Chapters 5-9. Focus on cellular respiration and photosynthesis.",
    completed: false,
  },
  {
    id: "4",
    name: "Read 'The Great Gatsby'",
    subject: "English",
    type: "Assignment",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    description: "Read chapters 1-3 and prepare for a quiz.",
    completed: true,
  },
  {
    id: "5",
    name: "Final Art Portfolio",
    subject: "Art",
    type: "Project",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 20)),
    description: "Submit a portfolio of 10 best pieces from the semester.",
    completed: false,
  },
];
