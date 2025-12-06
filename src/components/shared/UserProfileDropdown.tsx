import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, LogOut, Settings, Shield, User, User2 } from "lucide-react";

interface UserProfileDropdownProps {
  userName: string;
}

export default function UserProfileDropdown({
  userName,
}: UserProfileDropdownProps) {
  const profileImg = "";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-10 w-10 cursor-pointer rounded-full p-0 flex items-center justify-center  border">
          {profileImg ? (
            <img src={profileImg} alt="user" height={24} width={24} />
          ) : (
            <User2 size={24} />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-96 py-7 px-6 border-border-gray rounded-xl"
      >
        {/* User Info */}
        <DropdownMenuLabel className="flex items-center justify-between gap-3">
          <div className="flex flex-1 items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border-gray">
              {profileImg ? (
                <img src={profileImg} alt="user" height={24} width={24} />
              ) : (
                <User2 size={24} />
              )}
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-black">{userName}</p>
              <p className="text-[16px] text-light-muted">@username</p>
            </div>
          </div>
          <button>
            <Edit className="h-4 w-4" />
          </button>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="border border-border-gray my-6" />

        {/* Menu Items */}
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2">
          <User className="h-4 w-4" />
          <span>Switch Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2">
          <Settings className="h-4 w-4" />
          <span>User Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2">
          <Shield className="h-4 w-4" />
          <span>Security & Protection</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="border border-border-gray my-6" />

        {/* Logout */}
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2 text-destructive focus:text-destructive focus:bg-destructive/10">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
