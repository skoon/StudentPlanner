'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Coffee, Briefcase } from 'lucide-react';

const WORK_MINS = 25;
const SHORT_BREAK_MINS = 5;
const LONG_BREAK_MINS = 15;

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>('work');
  const [time, setTime] = useState(WORK_MINS * 60);
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);

  const totalTime = (mode === 'work' ? WORK_MINS : mode === 'shortBreak' ? SHORT_BREAK_MINS : LONG_BREAK_MINS) * 60;
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = useCallback(() => {
    setIsActive(false);
    if (mode === 'work') {
      setTime(WORK_MINS * 60);
    } else if (mode === 'shortBreak') {
      setTime(SHORT_BREAK_MINS * 60);
    } else {
      setTime(LONG_BREAK_MINS * 60);
    }
  }, [mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      if (mode === 'work') {
        const newCycles = cycles + 1;
        setCycles(newCycles);
        if (newCycles % 4 === 0) {
          setMode('longBreak');
          setTime(LONG_BREAK_MINS * 60);
        } else {
          setMode('shortBreak');
          setTime(SHORT_BREAK_MINS * 60);
        }
      } else {
        setMode('work');
        setTime(WORK_MINS * 60);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, mode, cycles]);

  useEffect(() => {
    resetTimer();
  }, [mode, resetTimer]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (time / totalTime) * 100;

  const modeText = {
    work: 'Focus Time',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  }[mode];

  const ModeIcon = mode === 'work' ? Briefcase : Coffee;

  return (
    <Card className="bg-sidebar border-sidebar-border group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:border-none">
      <CardHeader className="p-4 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:hidden">
        <CardTitle className="text-base flex items-center gap-2">
            <ModeIcon className="h-4 w-4" />
            <span>{modeText}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex flex-col items-center gap-4 group-data-[collapsible=icon]:p-0">
        <div className="relative w-full group-data-[collapsible=icon]:hidden">
          <Progress value={progress} className="h-2" />
          <div className="absolute top-4 text-center w-full text-3xl font-bold font-mono tracking-tighter">
            {formatTime(time)}
          </div>
        </div>
        <div className="flex gap-2 group-data-[collapsible=icon]:flex-col">
          <Button onClick={toggleTimer} size="icon" variant="ghost" className="group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8">
            {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button onClick={resetTimer} size="icon" variant="ghost" className="group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8">
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
