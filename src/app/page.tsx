import { Dashboard } from '@/components/dashboard';
import { Logo } from '@/components/logo';
import { PomodoroTimer } from '@/components/pomodoro-timer';
import {
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';

export default function HomePage() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <PomodoroTimer />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Dashboard />
      </SidebarInset>
    </SidebarProvider>
  );
}
