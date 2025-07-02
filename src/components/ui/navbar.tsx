"use client";
import { ArrowLeft, CogIcon, User } from "lucide-react";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import Image from "next/image";

enum Roles {
  Admin = "admin",
  Creator = "creator",
}

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Determine title and role based on pathname
  const getTitleAndRole = (path: string) => {
    // Define the paths for which we have created pages
    const validPaths = [
      "/",
      "/reports",
      "/instances/new",
      "/instances/id/update",
      "/registration",
      "/profile",
      "/instances/id/contribution/create",
      "/instances/id/contribution/review",
    ];

    // Check if the current path matches any of our valid paths
    const isValidPath = validPaths.some((validPath) =>
      path.includes(validPath)
    );

    // If it's not a valid path, return null to indicate we shouldn't show the navbar
    if (!isValidPath) {
      return null;
    }

    // For valid paths, return the appropriate title and role
    if (path === "/") {
      return { title: "OHM", role: Roles.Admin };
    }

    if (path === "/reports") {
      return { title: "Meta-Science", role: Roles.Admin };
    }

    if (path === "/instances/new") {
      return { title: "New Instance", role: Roles.Creator };
    }

    if (path === "/instances/id") {
      return { title: "Instance Name", role: Roles.Creator };
    }

    if (path === "/instances/id/update") {
      return { title: "Instance Update", role: Roles.Creator };
    }

    if (path === "/registration") {
      return { title: "New User", role: undefined };
    }

    if (path === "/profile") {
      return { title: "Update Details", role: Roles.Creator };
    }

    if (path === "/instances/id/contribution/create") {
      return { title: "AIMOS", role: undefined };
    }

    if (path === "/instances/id/contribution/review") {
      return { title: "AIMOS", role: undefined };
    }

    // Default case - unhandled pages
    return null;
  };

  const result = getTitleAndRole(pathname);

  // If result is null, don't render the navbar
  if (result === null) {
    return null;
  }

  const { title, role } = result;

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className="relative z-10">
      <div className="flex flex-col h-95 items-center my-3">
        <div className="flex flex-row h-95 items-center w-full max-w-md">
          {/* Back Button */}
          <div className="w-10 flex items-center justify-center ml-2">
            <ArrowLeft
              className="h-6 w-6 cursor-pointer"
              onClick={handleGoBack}
            />
          </div>
          {/* Logo */}
          <div className="w-32 ml-3">
            <div className="w-full size-20 flex items-center justify-center">
              <span className="text-3xl"><Image src="/logo.svg" fill alt={""} className='!relative max-w-[70px] max-h-[70px]' /></span>
            </div>
          </div>
          {/* Title */}
          <div className="flex flex-left ml-10 justify-center">
            <label htmlFor="title" className="block text-3xl mb-2 pr-7">
              {title}
            </label>
          </div>
          {/* Options */}
          <div className="ml-auto flex items-center gap-4 mr-4">
            {role &&
              (role === Roles.Admin ? (
                <CogIcon className="h-8 w-8" />
              ) : (
                <User className="h-8 w-8" />
              ))}

            {/* Auth Profile Dropdown */}
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export { NavBar };
