import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  User,
  Settings,
  Scale,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Home",
    url: "/dashboard/home",
    icon: LayoutDashboard,
  },
  {
    title: "Cases",
    url: "/dashboard/cases",
    icon: Briefcase,
  },
  {
    title: "Members",
    url: "/dashboard/members",
    icon: Users,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Courts",
    url: "/dashboard/courts",
    icon: Scale,
  },
];

export function SidebarNavigation() {
  const location = useLocation();

  return (
    <Sidebar className="m-4 rounded-xl border max-h-[calc(100vh-32px)] bg-gradient-to-b  from-gray-900 to-gray-800">
      <Link to="/" className=" p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-primary/50 to-primary p-2 rounded-lg">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">LegalCase</h1>
            <p className="text-gray-400 text-xs">Case Management</p>
          </div>
        </div>
      </Link>
      <SidebarContent className="px-4 py-3">
        <SidebarMenu className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "h-12 px-3 rounded-lg",
                    isActive
                      ? "bg-primary text-white"
                      : "text-white hover:bg-gray-600"
                  )}
                >
                  <Link to={item.url} className="flex items-center gap-3">
                    <Icon strokeWidth={2.7} className="h-6 w-6" />
                    <span className="text-lg">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
