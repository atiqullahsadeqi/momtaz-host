"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-background flex flex-col min-h-screen">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b border-white/5 sticky top-0 z-20 bg-background/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
          </div>
          <div className="flex items-center gap-4">
            {/* Future: Notifications, User Profile Menu */}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
