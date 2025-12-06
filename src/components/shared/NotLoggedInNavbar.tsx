"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Search, Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { GrChat } from "react-icons/gr";
import { RiShoppingBag4Line } from "react-icons/ri";
import taskIcon from "@/assets/navbar/task.svg";
import { FaUserAlt } from "react-icons/fa";

interface NotLoggedInNavbarProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export default function NotLoggedInNavbar({
  isLoggedIn = false,
  onLogout,
}: NotLoggedInNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileServices = () => {
    setMobileServicesOpen(!mobileServicesOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  // Navigation items for better reusability
  const navigationItems = (
    <>
      <Link
        href="/"
        className="block py-2 text-lg font-medium text-gray-900 hover:text-primary transition-colors"
        onClick={closeMobileMenu}
      >
        Home
      </Link>

      {/* Desktop Dropdown */}
      <div className="hidden lg:block">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 py-2 text-lg font-medium text-gray-900 hover:text-primary transition-colors">
            All Services
            <ChevronDown className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Service 1</DropdownMenuItem>
            <DropdownMenuItem>Service 2</DropdownMenuItem>
            <DropdownMenuItem>Service 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile & Tablet Services Accordion */}
      <div className="lg:hidden">
        <button
          onClick={toggleMobileServices}
          className="flex items-center justify-between w-full py-2 text-lg font-medium text-gray-900 hover:text-primary transition-colors"
        >
          <span>All Services</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              mobileServicesOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-200 ${
            mobileServicesOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pl-4 space-y-2 border-l-2 border-gray-200 ml-2 mt-2">
            <Link
              href="#"
              className="block py-1 text-gray-600 hover:text-primary"
            >
              Service 1
            </Link>
            <Link
              href="#"
              className="block py-1 text-gray-600 hover:text-primary"
            >
              Service 2
            </Link>
            <Link
              href="#"
              className="block py-1 text-gray-600 hover:text-primary"
            >
              Service 3
            </Link>
          </div>
        </div>
      </div>

      {isLoggedIn ? (
        <Link
          href="/custom-service"
          className="block py-2 text-lg font-medium text-primary hover:text-primary/90 transition-colors"
          onClick={closeMobileMenu}
        >
          Custom Service
        </Link>
      ) : (
        <Link
          href="/start-earning"
          className="block py-2 text-lg font-medium text-primary hover:text-primary/90 transition-colors"
          onClick={closeMobileMenu}
        >
          Start Earning
        </Link>
      )}
    </>
  );

  const authButtons = (
    <div className="flex flex-row gap-3 w-full xs:w-auto">
      <Link href="/login" className="w-full xs:w-auto">
        <Button
          variant="ghost"
          size="lg"
          className="w-full xs:w-auto text-secondary hover:text-secondary/90 hover:bg-secondary/10 font-medium text-base sm:text-lg rounded-full py-2 px-4"
          onClick={closeMobileMenu}
        >
          Login
        </Button>
      </Link>
      <Link href="/signup" className="w-full xs:w-auto">
        <Button
          variant={"rounded"}
          size={"lg"}
          className="w-full xs:w-auto bg-primary hover:bg-primary/90 text-white font-medium text-base sm:text-lg rounded-full py-2 px-6"
          onClick={closeMobileMenu}
        >
          Sign Up
        </Button>
      </Link>
    </div>
  );

  const userIcons = (
    <div className="hidden lg:flex items-center justify-center gap-4">
      <Button
        variant="link"
        size={"icon"}
        className="text-[#430380] hover:text-[#430380]/90 font-medium relative"
      >
        <GrChat className="size-5 sm:size-6 transform -scale-x-100" />
      </Button>
      <Button
        variant={"link"}
        size={"icon"}
        className="text-[#430380] hover:text-[#430380]/90 font-medium relative"
      >
        <RiShoppingBag4Line className="size-5 sm:size-6" />
        <span className="absolute -top-1 -right-1 size-3 sm:size-4 bg-red-500 text-xs text-white rounded-full flex items-center justify-center">
          0
        </span>
      </Button>
      <Button
        variant={"link"}
        size={"icon"}
        className="text-[#430380] hover:text-[#430380]/90 font-medium relative"
      >
        <Image
          src={taskIcon}
          alt="Calendar"
          width={20}
          height={20}
          className="sm:w-6 sm:h-6"
        />
        <span className="absolute -top-1 -right-1 size-3 sm:size-4 bg-red-500 text-xs text-white rounded-full flex items-center justify-center">
          0
        </span>
      </Button>
      <Button
        variant={"link"}
        size={"icon"}
        className="relative text-[#430380] hover:text-[#430380]/90 font-medium"
      >
        <Bell className="size-5 sm:size-6" />
        <span className="absolute -top-1 -right-1 size-3 sm:size-4 bg-red-500 text-xs text-white rounded-full flex items-center justify-center">
          3
        </span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger className="text-primary bg-primary-foreground rounded-full hover:bg-primary-foreground/90 transition-colors">
          <FaUserAlt className="size-8 sm:size-10 p-2" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  const mobileUserCards = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Messages Card */}
        <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="flex justify-center mb-2">
            <GrChat className="size-6 text-[#430380] transform -scale-x-100" />
          </div>
          <span className="text-sm font-medium text-gray-900">Messages</span>
        </div>

        {/* Orders Card */}
        <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="flex justify-center mb-2 relative">
            <RiShoppingBag4Line className="size-6 text-[#430380]" />
          </div>
          <span className="text-sm font-medium text-gray-900">Orders</span>
        </div>

        {/* Tasks Card */}
        <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="flex justify-center mb-2">
            <Image src={taskIcon} alt="Tasks" width={24} height={24} />
          </div>
          <span className="text-sm font-medium text-gray-900">Tasks</span>
        </div>

        {/* Notifications Card */}
        <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="flex justify-center mb-2 relative">
            <Bell className="size-6 text-[#430380]" />
            <span className="absolute -top-1 -right-2 size-4 bg-red-500 text-xs text-white rounded-full flex items-center justify-center">
              3
            </span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            Notifications
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <nav
        className={`${
          isLoggedIn
            ? "border-b"
            : "container border rounded-3xl top-4 border-gradient-custom my-5"
        } border-gray-200 sticky top-0 shadow-sm bg-white z-50`}
      >
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Main NotLoggedInNavbar Row */}
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              {/* Mobile & Tablet Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary mr-2"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              {/* Logo */}
              <Link href="/" className=" w-auto">
                <Image
                  src="/logo.svg"
                  alt="MyGenie Logo"
                  width={120}
                  height={40}
                  className="object-contain w-auto -mb-4"
                />
              </Link>
            </div>

            {/*  tablet auth buttons */}
            {!isLoggedIn && (
              <div className="hidden md:flex lg:hidden ml-4">{authButtons}</div>
            )}

            {isLoggedIn ? (
              <>
                {/* Search Bar - For Tablet (md) in same line */}
                <div className="hidden md:flex lg:hidden flex-1 mx-4">
                  <div className="relative w-full max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:border-primary focus:bg-white"
                    />
                  </div>
                </div>

                {/* Desktop Search Bar - After Login */}
                <div className="hidden lg:flex flex-1 mx-4 xl:mx-8">
                  <div className="relative w-full max-w-lg">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search your desire service..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:border-primary focus:bg-white"
                    />
                  </div>
                </div>

                {/* Desktop Navigation - After Login */}
                <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-accent hover:text-accent/90 font-medium text-sm xl:text-base">
                  {navigationItems}
                </div>

                {/* Desktop Icons - After Login */}
                {userIcons}

                {/* Mobile & Tablet Icons - Keep Notification + Profile */}
                <div className="lg:hidden flex items-center gap-2">
                  {/* Notification Bell for Mobile & Tablet */}
                  <Button
                    variant={"link"}
                    size={"icon"}
                    className="relative text-[#430380] hover:text-[#430380]/90 font-medium"
                  >
                    <Bell className="size-5 sm:size-6" />
                    <span className="absolute -top-1 -right-1 size-3 sm:size-4 bg-red-500 text-xs text-white rounded-full flex items-center justify-center">
                      3
                    </span>
                  </Button>

                  {/* Profile for Mobile & Tablet */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-primary bg-primary-foreground rounded-full hover:bg-primary-foreground/90 transition-colors">
                      <FaUserAlt className="size-8 p-2" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuItem onClick={onLogout}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <>
                {/* Desktop Navigation - Before Login */}
                <div className="hidden lg:flex flex-1 items-center justify-between ml-8">
                  <div className="flex items-center gap-6 xl:gap-8 text-accent hover:text-accent/90 font-medium text-base xl:text-lg">
                    {navigationItems}
                  </div>

                  {/* Desktop Auth Buttons */}
                  <div className="hidden lg:flex items-center gap-4">
                    {authButtons}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Search Bar - Second line for small devices */}
          {isLoggedIn && (
            <div className="md:hidden pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your desire service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile & Tablet Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeMobileMenu}
          />

          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-80 max-w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/" onClick={closeMobileMenu}>
                <Image
                  src="/logo.svg"
                  alt="MyGenie Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </Link>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="p-6 h-[calc(100%-80px)] overflow-y-auto">
              <div className="space-y-6">
                {navigationItems}

                {/* User Icons Cards for Mobile & Tablet - Only when logged in */}
                {isLoggedIn && (
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      Quick Actions
                    </h3>
                    {mobileUserCards}

                    <div className="mt-6 space-y-2">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 py-2 text-gray-700 hover:text-primary transition-colors"
                        onClick={closeMobileMenu}
                      >
                        <FaUserAlt className="size-5 text-gray-400" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 py-2 text-gray-700 hover:text-primary transition-colors"
                        onClick={closeMobileMenu}
                      >
                        <svg
                          className="size-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={() => {
                          onLogout?.();
                          closeMobileMenu();
                        }}
                        className="flex items-center gap-3 w-full text-left py-2 text-gray-700 hover:text-primary transition-colors"
                      >
                        <svg
                          className="size-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Auth Buttons for Mobile & Tablet - Only when not logged in */}
                {!isLoggedIn && (
                  <div className="pt-6 border-t border-gray-200">
                    <div className="space-y-3">{authButtons}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
