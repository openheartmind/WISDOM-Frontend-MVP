"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Settings, User, Home } from "lucide-react";
import { ProfileDropdown } from "../ProfileDropdown";

// Map of routes to their titles and icons
const routeConfig = {
  "/": {
    title: "OHM",
    icon: Home,
  },
  "/login": {
    title: "Login",
    icon: User,
  },
  "/registration": {
    title: "New User",
    icon: User,
  },
  "/user-detail": {
    title: "Profile Update",
    icon: User,
  },
  "/instances/new": {
    title: "New Instance",
    icon: User,
  },
  "/instances/[id]": {
    title: "Instance",
    icon: User,
  },
  "/instances/[id]/update": {
    title: "Instance",
    icon: Settings,
  },
  "/instances/[id]/contribution/review": {
    title: "Instance",
    icon: User,
  },
  "/instances/[id]/contribution/create": {
    title: "Instance",
    icon: User,
  },
  "/instances/[id]/reports": {
    title: "Instance",
    icon: User,
  },

  // Add more routes as needed
};

// Default fallback for routes not in the config
const defaultRouteConfig = {
  title: "OHM",
  icon: Home,
};

export function Navbar() {
  const pathname = usePathname();
  // Get the current route config or use default
  const currentRoute = pathname
    ? routeConfig[pathname as keyof typeof routeConfig] || defaultRouteConfig
    : defaultRouteConfig;
  const Icon = currentRoute.icon;

  // Function to handle icon click
  const handleIconClick = () => {
    // You can implement specific functionality based on the icon
    // For example, navigate to a related page or open a modal
    console.log("Icon clicked:", currentRoute.title);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="flex h-16 items-center justify-between px-4 max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/" aria-label="Go back">
            <ArrowLeft className="h-5 w-5 text-black" />
          </Link>

          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="OHM Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
        </div>

        {/* Absolute positioning to ensure true centering regardless of other elements */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-xl font-normal truncate max-w-[150px]">
            {currentRoute.title}
          </h1>
        </div>

        <div className="flex items-center gap-2 space-x-2 ml-auto">
          <button
            type="button"
            onClick={handleIconClick}
            className="flex items-center justify-center cursor-pointer hover:opacity-80"
            aria-label={`${currentRoute.title} icon action`}
          >
            <Icon className="h-8 w-8 text-black" />
          </button>
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
