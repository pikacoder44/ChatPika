import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import SessionWatcher from "@/components/SessionWatcher";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionWatcher>
      <SidebarProvider className="fixed md:z-[100]">
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </SessionWatcher>
  );
}
