import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  // User,
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
  // {
  //   title: "Profile",
  //   url: "/dashboard/profile",
  //   icon: User,
  // },
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
    <Sidebar className="m-2 rounded-xl bg-[#1F2937] border border-gray-700/50 shadow-xl max-h-[calc(100vh-16px)]">
      <Link to="/" className="p-4 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-green shadow-lg">
            <Scale className="w-5 h-5 text-black" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white">LegalCase</h1>
            <p className="text-xs text-gray-400">Case Management</p>
          </div>
        </div>
      </Link>
      <SidebarContent className="px-3 py-4">
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
                    "h-11 px-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary-green text-black shadow-md"
                      : "text-gray-300 hover:bg-primary-green hover:text-black"
                  )}
                >
                  <Link to={item.url} className="flex items-center gap-3">
                    <Icon
                      strokeWidth={2.5}
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isActive ? "text-white" : "text-gray-400"
                      )}
                    />
                    <span className="text-sm font-medium">{item.title}</span>
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
