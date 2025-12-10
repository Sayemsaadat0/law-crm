import { Link, useLocation } from "react-router-dom";
import { Scale, Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardNavbar() {
  const { pathname } = useLocation();
  const paths = pathname.split("/").filter(Boolean); // ["dashboard", "home"]

  const page = paths[1] || "home";

  return (
    <header className=" top-0 z-40 w-full  ">
      <div className="flex flex-col gap-3  py-3  md:py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <SidebarTrigger className="-ml-1 text-slate-900  md:hidden" />
            <Link
              to="/"
              className="md:hidden flex items-center gap-2 text-slate-900 "
            >
              <Scale className="h-5 w-5" />
              <span className="text-sm font-semibold">Law Firm</span>
            </Link>
            <nav className="hidden md:flex flex-col text-sm text-slate-500 capitalize">
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard/home"
                  className="hover:text-slate-900 transition-colors"
                >
                  Dashboard
                </Link>
                <span>/</span>
                <span className="font-medium text-slate-800 ">
                  {page}
                </span>
              </div>
              <span className="text-xs text-slate-400">{page}</span>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 text-slate-600 hover:bg-slate-100 "
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-slate-600 hover:bg-slate-100"
            >
              <Bell className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-slate-600 hover:bg-slate-100"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <nav className="flex md:hidden items-center text-sm text-slate-500 capitalize gap-1">
          <Link
            to="/dashboard/home"
            className="hover:text-slate-900 transition-colors"
          >
            Dashboard
          </Link>
          <span>/</span>
          <span className="font-medium text-slate-800 ">
            {page}
          </span>
        </nav>
      </div>
    </header>
  );
}
