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
  const { login } = useAuth();
  const router = useRouter();
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
    setError(null);
    setIsSubmitting(true);

    try {
      const success = await login(credentials.email, credentials.password);

      if (success) {
        router.push("/"); // Redirect to homepage or dashboard
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewUser = () => {
    router.push("/signup");
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

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

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
              onClick={handleNewUser}
              disabled={isSubmitting}
            >
              New User
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
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
