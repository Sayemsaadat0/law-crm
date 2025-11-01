import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Briefcase,
  Users,
  User,
  Settings,
  Scale,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Cases",
    url: "/cases",
    icon: Briefcase,
  },
  {
    title: "Members",
    url: "/members",
    icon: Users,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function SidebarNavigation() {
  const location = useLocation()

  return (
    <Sidebar className="">
      <SidebarHeader className="border-b px-4 h-16 flex items-center">
        <Link to="/" className="flex items-center gap-3">
          <Scale className="h-5 w-5 text-black" />
          <span className="font-semibold text-sm text-black">Law Firm</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2 py-3">
        <SidebarMenu className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.url

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "h-9 px-3",
                    isActive ? "bg-purple-600 text-white" : "text-black hover:bg-gray-100"
                  )}
                >
                  <Link to={item.url} className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

