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
    if (path.includes("/reports")) {
      return { title: "Meta-Science", role: Roles.Admin };
    } else if (path.includes("/instances/new")) {
      return { title: "New Instance", role: Roles.Creator };
    }
    else if (path.includes("/instances/update")) {
      return { title: "Instance Update", role: Roles.Creator };
    }
    else if (path.includes("/instances")) {
      return { title: "Meta-Science", role: Roles.Admin };
    }
    else if (path.includes("/registration")) {
      return { title: "New User", role: Roles.Creator };
    }
    // Default or other paths
    return { title: "Meta-Science", role: undefined };
  };

  const { title, role } = getTitleAndRole(pathname);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      <div className="flex flex-col h-95 items-center justify-top absolute top-5 left-0 right-0">
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