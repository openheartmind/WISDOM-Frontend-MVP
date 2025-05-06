"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import LOGO from "/public/logo.svg"
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

  const param = useSearchParams();
  useEffect(() => {
    if (param) {
      if ((param.get("verified") as string) === "true") {
        setVerified("true");
      } else if ((param.get("verified") as string) === "false") {
        setVerified("false");
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
      setApiResponse({
        status: response.status,
        data: data,
      });
    } catch (error) {
      setApiResponse({
        status: 500,
        data: {
          message: "Failed to connect to API",
          details: "Could not connect to the server",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo Section */}
        <div className="mx-auto">
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-3xl"><Image src={LOGO} alt={""} className='w-[250px]' /></span>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xl mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                required
                className="w-full border-gray-300"
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
              <label htmlFor="password" className="block text-xl mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                required
                className="w-full border-gray-300"
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

          <div className="flex justify-between gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 text-[#2196F3] border-[#2196F3] hover:bg-[#2196F3]/10"
              onClick={() => {
                window.location.href = "/registration";
              }}
            >
              New User
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>

          {/* API Response Display */}
          {apiResponse && (
            <div
              className={`mt-4 p-4 rounded ${apiResponse.status === 401
                  ? "bg-red-50 border border-red-200"
                  : apiResponse.data.success
                    ? "bg-green-50 border border-green-200"
                    : "bg-gray-50 border border-gray-200"
                }`}
            >
              <div className="text-sm">
                <p
                  className={`font-semibold mb-2 ${apiResponse.data.status === 401
                      ? "text-red-700"
                      : apiResponse.data.success
                        ? "text-green-700"
                        : "text-gray-700"
                    }`}
                >
                  Status: {apiResponse.data.status}
                </p>
                {apiResponse.data.details && (
                  <p
                    className={`font-medium mb-1 ${apiResponse.data.status === 401
                        ? "text-red-600"
                        : apiResponse.data.success
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                  >
                    {apiResponse.data.details}
                  </p>
                )}
                {apiResponse.data.message && (
                  <p
                    className={`text-sm ${apiResponse.data.status === 401
                        ? "text-red-500"
                        : apiResponse.data.success
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                  >
                    {apiResponse.data.message}
                  </p>
                )}
                {apiResponse.data.success && apiResponse.data.user && (
                  <div className="mt-2 p-2 bg-white rounded">
                    <p className="text-gray-600">
                      User ID: {apiResponse.data.user.authId}
                    </p>
                    <p className="text-gray-600">
                      Email: {apiResponse.data.user.email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div>
            {verified === "false" ? (
              <div className="text-red-700 text-sm justify-self-center">
                User verification failed, please contact an administrator
              </div>
            ) : verified === "true" ? (
              <div className="text-green-500 text-sm justify-self-center">
                User has been verified successfully !
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
