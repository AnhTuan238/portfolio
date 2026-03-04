import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
import { Outlet } from "react-router";

import { AdminSidebar } from "./AdminSidebar";

export const AdminLayout = () => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="relative w-full flex flex-col  bg-gray-12">
        <div className="sticky top-0 z-2 h-15 flex items-center border-b border-gray-8 bg-white">
          <SidebarTrigger className="cursor-pointer" />
        </div>
        <div className="w-full max-w-7xl mx-auto px-8 pt-4 pb-8">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};
