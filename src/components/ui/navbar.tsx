"use client";
import { ArrowLeft, CogIcon, User } from "lucide-react";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";

enum Roles {
  Admin = 'admin',
  Creator = 'creator'
}

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Determine title and role based on pathname
  const getTitleAndRole = (path: string) => {
    // Define the paths for which we have created pages
    const validPaths = [
      "/reports",
      "/instances/new",
      "/instances/update",
      "/instances",
      "/registration",
      "/user-detail",
      "/contribution/create"
    ];

    // Check if the current path matches any of our valid paths
    const isValidPath = validPaths.some(validPath => path.includes(validPath));
    
    // If it's not a valid path, return null to indicate we shouldn't show the navbar
    if (!isValidPath) {
      return null;
    }

    // For valid paths, return the appropriate title and role
    if (path.includes("/reports")) {
      return { title: "Meta-Science", role: Roles.Admin };
    } else if (path.includes("/instances/new")) {
      return { title: "New Instance", role: Roles.Creator };
    } else if (path.includes("/instances/update")) {
      return { title: "Instance Update", role: Roles.Creator };
    } else if (path.includes("/instances")) {
      return { title: "Meta-Science", role: Roles.Admin };
    } else if (path.includes("/registration")) {
      return { title: "New User", role: undefined };
    } else if (path.includes("/user-detail")) {
      return { title: "Update Details", role: Roles.Creator };
    } else if (path.includes("/contribution/create")) {
      return { title: "AIMOS", role: undefined };
    }

    // Default case - shouldn't reach here with our validPaths check, but included for safety
    return { title: "Meta-Science", role: undefined };
  };

  const result = getTitleAndRole(pathname);
  
  // If result is null, don't render the navbar
  if (result === null) {
    return null;
  }

  const { title, role } = result;
  
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
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
            <div className="w-full rounded-full size-20 bg-gray-100 flex items-center justify-center">
              <span className="text-3xl">Logo</span>
            </div>
          </div>
          {/* Title */}
          <div className="flex flex-left ml-10 justify-center">
            <label htmlFor="title" className="block text-3xl mb-2 pr-7">
              {title}
            </label>
          </div>
          {/* Options */}
          <div className="mx-auto">
            {role && (role === Roles.Admin ? <CogIcon className="h-10 w-10" /> : <User className="h-10 w-10" />)}
          </div>
        </div>
      </div>
      {/* <div className="md:mb-20 mb-15">
       </div> */}
    </div>
  );
};

export { NavBar };