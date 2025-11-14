import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Scale, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardNavbar() {
  const [searchValue, setSearchValue] = useState("");
  const { pathname } = useLocation();
  const paths = pathname.split("/").filter(Boolean); // ["dashboard", "home"]

  const page = paths[1] || "home";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white dark:bg-slate-900">
      <div className="flex flex-col gap-3 px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <SidebarTrigger className="-ml-1 text-slate-900 dark:text-slate-100 md:hidden" />
            <Link to="/" className="md:hidden flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <Scale className="h-5 w-5" />
              <span className="text-sm font-semibold">Law Firm</span>
            </Link>
            <nav className="hidden md:flex flex-col text-sm text-slate-500 capitalize">
              <div className="flex items-center gap-2">
                <Link to="/dashboard/home" className="hover:text-slate-900 transition-colors">
                  Dashboard
                </Link>
                <span>/</span>
                <span className="font-medium text-slate-800 dark:text-slate-100">{page}</span>
              </div>
              <span className="text-xs text-slate-400">{page}</span>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Search className="h-5 w-5" />
            </Button>
            <div className="relative hidden md:block md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
              <Input
                type="search"
                placeholder="Search cases, members, documents..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 h-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {/* sss */}
              <Bell className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-slate-400 ring-2 ring-white dark:ring-slate-900" />
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-white dark:bg-slate-700">
                  <User className="h-5 w-5 text-white" />
                </div>
              </Button>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">John Doe</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Administrator</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex md:hidden items-center text-sm text-slate-500 capitalize gap-1">
          <Link to="/dashboard/home" className="hover:text-slate-900 transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span className="font-medium text-slate-800 dark:text-slate-100">{page}</span>
        </nav>
      </div>
    </header>
  );
}

