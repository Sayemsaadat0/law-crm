import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SidebarNavigation } from "@/components/core/SidebarNavigation";
import { DashboardNavbar } from "@/components/core/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <SidebarNavigation />
      <SidebarInset className="bg-blue-50/50">
        <DashboardNavbar />
        <div className="flex flex-1 flex-col py-4 pr-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
