import { useState } from "react"
import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function DashboardNavbar() {
  const [searchValue, setSearchValue] = useState("")

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        {/* Sidebar Toggle */}
        <SidebarTrigger   className="-ml-1 text-black" />
        
        {/* Separator */}
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />

        {/* Search Bar */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <Input
              type="search"
              placeholder="Search cases, members, documents..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-9 h-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bell className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-linear-to-r from-pink-500 to-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
          </Button>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="h-7 w-7 rounded-full bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </Button>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                John Doe
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Administrator
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

