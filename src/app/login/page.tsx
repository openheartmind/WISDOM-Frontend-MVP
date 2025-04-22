"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

interface LoginCredentials {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [verified, setVerified] = useState<string>();

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
    setError(null);

    try {
      const result = await login(credentials.email, credentials.password);

      if (result.success) {
        // Redirect to dashboard or home page after successful login
        router.push("/");
      } else {
        setError(result.error || "Failed to sign in");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo Section */}
        <div className="mx-auto w-32 h-32">
          <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-3xl">Logo</span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 rounded bg-red-100 text-red-800 text-sm">
            {error}
          </div>
        )}

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
                disabled={isLoading}
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
                disabled={isLoading}
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
              disabled={isLoading}
              className="flex-1 text-[#2196F3] border-[#2196F3] hover:bg-[#2196F3]/10"
              onClick={() => {
                window.location.href = "/signup";
              }}
            >
              New User
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>
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
