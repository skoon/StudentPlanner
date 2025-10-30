import { GraduationCap } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 p-2 group-data-[collapsible=icon]:justify-center">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <GraduationCap className="h-5 w-5" />
      </div>
      <h1 className="text-lg font-bold text-foreground group-data-[collapsible=icon]:hidden">
        Student Planner Pro
      </h1>
    </div>
  );
}
