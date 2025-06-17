"use client";

import { ArrowLeftToLine, CogIcon, User } from "lucide-react";
import { ReactElement, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import Image from "next/image";

const APP_TITLE = process.env.NEXT_PUBLIC_APP_TITLE || "";
const TITLE_CHAR_LIMIT = 18;
const GUID_PATTERN = new RegExp(
  "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$",
  "i"
);

interface Role {
  roleId: string;
  roleTitle: string;
}

enum Roles {
  Admin = "admin",
  Creator = "creator",
  Reviewer = "reviewer",
  MetaReviewer = "metareviewer",
}

interface ApiResponse {
  createdAt?: string;
  createdBy?: string;
  description?: string;
  id?: string;
  title?: string;
  updatedAt?: string;
}

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { isAuthenticated, token } = useAuth();
  const [role, setRole] = useState<Role | null>({
    roleId: "blah",
    roleTitle: Roles.Admin,
  });
  const [instanceTitle, setInstanceTitle] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const screensPath = {
    login: "/login",
    instancesList: "/",
    newUser: "/registration",
    userUpdate: "/profile",
    Instance: "/instances/[id]",
    InstanceCreation: "/instances/new",
    InstanceUpdate: "/instances/[id]/update",
    InstanceContributionsReview: "/instances/[id]/contribution/review",
    InstanceNewContribution: "/instances/[id]/contribution/create",
    InstanceReports: "/instances/[id]/reports",
  };

  // Logoff if user isn't authorized
  useEffect(() => {
    pathname !== screensPath.newUser &&
      !isAuthenticated &&
      router.push("/login");
  }, []);

  // Fetch instance ID if needed
  useEffect(() => {
    if (
      !apiResponse &&
      pathname.toLowerCase().includes("instances/") &&
      pathname !== screensPath.InstanceCreation
    ) {
      const instanceId = pathname
        .toLowerCase()
        .replace("instances/", "")
        .split("/")
        .slice(1, 2);
      if (
        instanceId.length !== 1 ||
        (instanceId.length === 1 && !GUID_PATTERN.test(instanceId[0]))
      ) {
        console.log("Failed getting instance id from path");
        router.push("/");
      } else {
        fetch(`/api/instance/${instanceId[0]}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then(async (res) => await res.json())
          .then((data: ApiResponse) => {
            if ("id" in data === false) {
              router.push("/");
            } else {
              setApiResponse(data);
              setInstanceTitle(data.title || "");
            }
          })
          .catch((err) => {
            console.log(`ERROR: ${err}`);
            router.push("/");
          });
      }
    }
  }, [pathname, apiResponse]);

  // Set screen title for valid paths
  const setScreenTitle = (path: string): string | null => {
    const validPaths = [
      screensPath.instancesList,
      screensPath.newUser,
      screensPath.userUpdate,
      screensPath.InstanceReports,
      screensPath.InstanceCreation,
      screensPath.Instance,
      screensPath.InstanceUpdate,
      screensPath.InstanceContributionsReview,
      screensPath.InstanceNewContribution,
    ];

    const isValidPath = validPaths.some((validPath) => {
      const validationCheck = path.includes("instance")
        ? path
            .split("/")
            .map((val, idx) => (idx === 2 ? "[id]" : val))
            .join("/")
        : path;
      return validationCheck === validPath;
    });

    if (!isValidPath) {
      return null;
    }
    function classify(val: string) {
      const res =
        val.includes("/instances") && val.split("/").length > 2
          ? GUID_PATTERN.test(val.split("/")[2])
            ? val
                .split("/")
                .map((val, idx) => (idx === 2 ? "[id]" : val))
                .join("/")
            : val.split("/")[2] !== "new"
              ? "/"
              : val
          : val;
      return res;
    }
    switch (classify(path)) {
      case screensPath.instancesList:
      case screensPath.InstanceCreation:
        return APP_TITLE;

      case screensPath.newUser:
        return "New User";

      case screensPath.userUpdate:
        return "Profile Update";

      case screensPath.Instance:
      case screensPath.InstanceUpdate:
      case screensPath.InstanceNewContribution:
      case screensPath.InstanceReports:
        return instanceTitle;

      case "/":
        return APP_TITLE;

      default:
        return "";
    }
  };

  let title = setScreenTitle(pathname);
  title =
    title && title.length > TITLE_CHAR_LIMIT
      ? `${title?.slice(0, TITLE_CHAR_LIMIT)}..`
      : title;

  if (!title) return null;

  const handleIsntanceSettings = () => {
    router.push(`${pathname}/update`);
  };

  const handleGoBack = () => {
    router.back();
  };

  const spinner = (
    <div role="status">
      <svg
        aria-hidden="true"
        className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );

  return (
    <div className="relative z-10">
      <div className="flex flex-col h-95 items-center my-3">
        <div className="flex flex-row h-95 items-center w-full max-w-md">
          {pathname === screensPath.instancesList ? null : (
            <div className="flex items-center justify-center ml-2 absolute">
              <ArrowLeftToLine
                className="h-6 w-6 cursor-pointer"
                onClick={handleGoBack}
              />
            </div>
          )}
          {/* Logo */}
          <div className="w-32 ml-3">
            <div className="w-full size-20 flex items-center justify-center">
              <span className="text-3xl">
                <Image
                  src="/logo.svg"
                  fill
                  alt={""}
                  className="!relative max-w-[70px] max-h-[70px]"
                />
              </span>
            </div>
          </div>
          {/* Title */}
          {!title ? (
            <div className="flex flex-1 justify-center">{spinner}</div>
          ) : (
            <div className="flex flex-left">
              <label htmlFor="title" className="block text-3xl mb-2 pr-7">
                {title}
              </label>
            </div>
          )}
          {/* Options */}
          <div className="ml-auto flex items-center gap-4 mr-4">
            {pathname.includes("/instances") &&
              !pathname.includes("new") &&
              pathname.split("/").length == 3 &&
              role &&
              (role.roleTitle === Roles.Admin ||
                role.roleTitle === Roles.Creator) && (
                <CogIcon className="h-8 w-8" onClick={handleIsntanceSettings} />
              )}

            {/* Auth Profile Dropdown */}
            {pathname === screensPath.instancesList && <ProfileDropdown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export { NavBar };
