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
    oldPassword: "",
    newPassword: "",
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

    // Prepare the JSON object to be sent to the backend
    const updateData = {
      ...formData,
      // Only include password fields if the user is changing password
      ...(formData.oldPassword && formData.newPassword
        ? {
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
          }
        : {}),
    }

    // Here you would typically send the data to your backend
    console.log("Data to be sent to backend:", updateData)

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
      oldPassword: "",
      newPassword: "",
    })
  }

  return (
    <div className="flex min-h-screen flex-col w-full max-w-md mx-auto px-4 py-6 mt-16">
      

      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div>
          <Label htmlFor="email" className="text-sm font-normal">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
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

        <div className="pt-2">
          <p className="text-sm font-normal mb-2">Change Password</p>

          <div className="space-y-4">
            <div>
              <Label htmlFor="oldPassword" className="text-sm font-normal">
                Old Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="oldPassword"
                name="oldPassword"
                type="password"
                value={formData.oldPassword}
                onChange={handleChange}
                className="bg-gray-100"
              />
            </div>

            <div>
              <Label htmlFor="newPassword" className="text-sm font-normal">
                New Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                className="bg-gray-100"
              />
            </div>
          </div>
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

