"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

interface LoginCredentials {
  email: string;
  password: string;
}

interface ApiResponse {
  status: number;
  data: {
    status?: number;
    success?: boolean;
    message?: string;
    details?: string;
    accessToken?: string;
    user?: {
      authId: string;
      email: string;
      displayName: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export default function LoginForm() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [verified, setVerified] = useState<string>();
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setAuth, isAuthenticated } = useAuth();

  const param = useSearchParams();

  // Redirect to home if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      console.log("User already logged in, redirecting to home");
      router.push("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (param) {
      if ((param.get("verified") as string) === "true") {
        setVerified("true");
      } else if ((param.get("verified") as string) === "false") {
        setVerified("false");
      } else if ((param.get("new") as string) === "") {
        setVerified("new");
      } else {
        setVerified("");
      }
    }
  }, [param]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiResponse(null);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      // Handle successful login - accept both 200 and 201 status codes
      if (
        (response.status === 200 || response.status === 201) &&
        data.accessToken
      ) {
        // Extract user data from the response
        const userData = data.user || {
          authId: data.authId || data.userId || data.id,
          email: data.email || credentials.email,
          displayName: data.displayName || data.username || null,
          createdAt: data.createdAt || new Date().toISOString(),
          updatedAt: data.updatedAt || new Date().toISOString(),
        };

        // Store token and user data in the auth context
        setAuth(data.accessToken, userData);

        // Redirect to the home page
        router.push("/");
      } else {
        // Handle various error cases with appropriate messages
        setApiResponse({
          status: response.status,
          data: {
            success: false,
            message: getErrorMessage(response.status, data),
          },
        });
      }
    } catch (error) {
      setApiResponse({
        status: 500,
        data: {
          success: false,
          message:
            "Unable to connect to the server. Please check your internet connection and try again.",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get appropriate error messages
  const getErrorMessage = (status: number, data: { message?: string }) => {
    switch (status) {
      case 401:
        return "Invalid email or password credentials. Please try again.";
      case 403:
        return "Your account is not authorized. Please contact support.";
      case 404:
        return "Account not found. Please check your email or create a new account.";
      case 429:
        return "Too many login attempts. Please try again later.";
      case 500:
        return "Server error. Please try again later.";
      default:
        return (
          data.message || "An unexpected error occurred. Please try again."
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8 md:py-12">
      <div className="w-full max-w-md space-y-6 md:space-y-8">
        {/* Logo Section */}
        <div className="mx-auto">
          <div className="flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={200}
              height={80}
              className="w-[200px] md:w-[250px] h-auto"
              priority
            />
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          <div className="space-y-4 md:space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-base md:text-lg font-medium mb-1.5"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                required
                className="w-full h-10 md:h-12 text-base"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-base md:text-lg font-medium mb-1.5"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                required
                className="w-full h-10 md:h-12 text-base"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="flex justify-between gap-3 md:gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-10 md:h-12 text-sm md:text-base text-black border-black hover:bg-[#f48646]/10"
              onClick={() => {
                window.location.href = "/registration";
              }}
            >
              New User
            </Button>
            <Button
              type="submit"
              className="flex-1 h-10 md:h-12 text-sm md:text-base bg-[#f48646] hover:bg-[#f48646]/90"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>

          {/* Error Message Container - Fixed Height */}
          <div className="h-[72px] md:h-[80px] mt-4">
            {apiResponse && !apiResponse.data.success && (
              <div className="p-3 md:p-4 text-center h-full flex flex-col justify-center">
                <p className="text-red-700 text-sm md:text-base">
                  {apiResponse.data.message}
                </p>
                {(apiResponse.status === 401 || apiResponse.status === 404) && (
                  <p className="text-sm mt-2">
                    Don't have an account?{" "}
                    <a
                      href="/registration"
                      className="text-black hover:underline font-medium"
                    >
                      Click "New User"
                    </a>
                  </p>
                )}
                {apiResponse.status === 500 && (
                  <p className="text-sm mt-2">
                    If this problem persists, please{" "}
                    <a
                      href="mailto:support@wisdom.com"
                      className="text-[#f48646] hover:underline font-medium"
                    >
                      contact support
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Verification Messages - Fixed Height Container */}
          <div className="h-[72px] md:h-[80px]">
            {verified && (
              <div className="h-full flex items-center justify-center">
                {verified === "false" ? (
                  <div className="text-red-700 text-sm p-2 bg-red-50 rounded-md w-full text-center">
                    Account verification failed. Please contact support for
                    assistance.
                  </div>
                ) : verified === "true" ? (
                  <div className="text-green-500 text-sm p-2 bg-green-50 rounded-md w-full text-center">
                    Your account has been verified successfully! You can now log
                    in.
                  </div>
                ) : verified === "new" ? (
                  <div className="text-blue-900 text-sm p-2 bg-blue-50 rounded-md w-full text-center">
                    Account created successfully! Please check your email for
                    verification instructions.
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
