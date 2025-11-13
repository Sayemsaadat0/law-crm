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
];

export function SidebarNavigation() {
  const location = useLocation();

  return (
    <Sidebar className="m-4 rounded-xl border max-h-[calc(100vh-32px)] bg-white">
      <Link
        to="/"
        className="flex items-center justify-center gap-3 w-full p-4"
      >
        <Scale className="h-5 w-5 text-black" />
        <span className="font-semibold text-lg text-black">Law Firm</span>
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
                      ? "bg-purple-600 text-white"
                      : "text-black hover:bg-gray-100"
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
