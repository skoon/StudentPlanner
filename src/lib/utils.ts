import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const subjectColorMap: { [key: string]: string } = {
  Math: "text-subject-math",
  Science: "text-subject-science",
  History: "text-subject-history",
  English: "text-subject-english",
  Art: "text-subject-art",
  Other: "text-subject-other",
};

const subjectBgColorMap: { [key: string]: string } = {
  Math: "bg-subject-math/10",
  Science: "bg-subject-science/10",
  History: "bg-subject-history/10",
  English: "bg-subject-english/10",
  Art: "bg-subject-art/10",
  Other: "bg-subject-other/10",
};

export function getSubjectColor(subject: string): string {
  return subjectColorMap[subject] || "text-foreground";
}

export function getSubjectBgColor(subject: string): string {
  return subjectBgColorMap[subject] || "bg-card";
}
