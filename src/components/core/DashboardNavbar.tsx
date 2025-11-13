import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardNavbar() {
  const [searchValue, setSearchValue] = useState("");
  const { pathname } = useLocation();
  const paths = pathname.split("/").filter(Boolean); // ["dashboard", "home"]

  const page = paths[1] || "home";

  return (
    <header className="sticky top-0 z-40 w-full border-slate-200/60 dark:border-slate-700/60 dark:bg-slate-900/80">
      <div className="flex flex-col gap-2 py-4 pr-4">
        {/* Top Row */}
        <div className="flex  items-center justify-between gap-3">
          {/* Left: Sidebar + Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <SidebarTrigger className="-ml-1 text-black dark:text-slate-100 md:hidden" />

            {/* Breadcrumbs (Desktop) */}
            <nav className="hidden md:flex capitalize items-center text-sm text-slate-600 ">
              <div>
                <div className="flex items-center gap-2">
                  <Link
                    to="/dashboard/home"
                    className=" hover:text-primary transition-colors"
                  >
                    Dashboard
                  </Link>
                  <span className=" text-slate-400">/</span>
                  <span className=" font-medium text-slate-900 dark:text-slate-100">
                    {page}
                  </span>
                </div>
                <p className="font-bold">{page}</p>
              </div>
            </nav>
          </div>

          {/* Right: Search, Bell, Profile */}
          <div className="flex items-center gap-2 flex-1 md:flex-initial">
            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <Input
                type="search"
                placeholder="Search cases, members, documents..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-9 h-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all"
              />
            </div>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Bell className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
            </Button>

            {/* Profile */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
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

        {/* Breadcrumbs (Mobile) */}
        <nav className="flex md:hidden items-center text-sm text-slate-600 dark:text-slate-300 flex-wrap ">
          <div>
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard/home"
                className=" hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <span className=" text-slate-400">/</span>
              <span className=" font-medium text-slate-900 dark:text-slate-100">
                {page}
              </span>
            </div>
            <p className="font-bold">{page}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
