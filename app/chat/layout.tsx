import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import SessionWatcher from "@/components/SessionWatcher";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionWatcher>
      <SidebarProvider defaultOpen={true}>
        <div className="flex w-full h-screen overflow-hidden bg-[#FAF9F6] dark:bg-[#0F1117] text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
          <AppSidebar />
          <SidebarInset className="flex-1 flex flex-col h-screen min-h-0 min-w-0 overflow-hidden bg-transparent">
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </SessionWatcher>
  );
}
