"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    fullName: "",
    phone: "",
    country: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Example of how you might call your API
    // updateUserDetails(updateData)
  }

  const handleCancel = () => {
    // Reset form or navigate back
    setFormData({
      email: "",
      displayName: "",
      fullName: "",
      phone: "",
      country: "",
    })
  }

  return (
    <div className="flex min-h-screen flex-col w-full max-w-md mx-auto px-10 py-6">
      

      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div>
          <Label htmlFor="email" className="text-sm font-normal">
            Email (Username)
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            disabled={true}
            value={formData.email}
            className="bg-gray-100"
          />
        </div>

        <div>
          <Label htmlFor="displayName" className="text-sm font-normal">
            Display Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            required
            className="bg-gray-100"
          />
        </div>

        <div>
          <Label htmlFor="fullName" className="text-sm font-normal">
            Full Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="bg-gray-100"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm font-normal">
            Phone
          </Label>
          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="bg-gray-100" />
        </div>

        <div>
          <Label htmlFor="country" className="text-sm font-normal">
            Country
          </Label>
          <Input id="country" name="country" value={formData.country} onChange={handleChange} className="bg-gray-100" />
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="flex-1 border-blue-400 text-blue-400"
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600">
            Update
          </Button>
        </div>
      </form>
    </div>
  )
}

