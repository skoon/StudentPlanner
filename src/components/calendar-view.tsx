'use client';

import { useState } from 'react';
import type { Task } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { DayContent, DayProps } from 'react-day-picker';

interface CalendarViewProps {
  tasks: Task[];
  selectedDate?: Date;
  onDateSelect: (date?: Date) => void;
}

export function CalendarView({ tasks, selectedDate, onDateSelect }: CalendarViewProps) {
  const taskDates = tasks
    .filter(task => !task.completed)
    .map((task) => task.dueDate);

  const modifiers = {
    hasTask: taskDates,
  };

  const CustomDay = (props: DayProps) => {
    const isTaskDay = taskDates.some(taskDate => format(taskDate, 'yyyy-MM-dd') === format(props.date, 'yyyy-MM-dd'));

    return (
        <div className="relative flex justify-center items-center h-full">
            <DayContent {...props} />
            {isTaskDay && <div className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />}
        </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          modifiers={modifiers}
          components={{ DayContent: CustomDay }}
        />
      </CardContent>
    </Card>
  );
}
