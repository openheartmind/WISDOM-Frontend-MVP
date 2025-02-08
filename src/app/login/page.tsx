"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginCredentials {
  email: string
  password: string
}

export default function LoginForm() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare auth object for the endpoint
    const authPayload = {
      email: credentials.email,
      password: credentials.password,
      timestamp: new Date().toISOString(),
    }

    // Here you would typically send the authPayload to your authentication endpoint
    console.log("Auth payload ready:", authPayload)
  }

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
              onClick={() => (window.location.href = "/signup")}
            >
              New User
            </Button>
            <Button type="submit" className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

