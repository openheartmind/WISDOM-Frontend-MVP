"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

export default function UpdateProfile() {
  const router = useRouter();
  const { user, setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [initialFormData, setInitialFormData] = useState({
    email: user?.email || "",
    displayName: user?.displayName || "",
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    country: user?.country || "",
  });
  const [formData, setFormData] = useState({
    email: user?.email || "",
    displayName: user?.displayName || "",
    fullName: "",
    phone: "",
    country: "",
  });

  // Add check for authentication
  useEffect(() => {
    if (!user) {
      console.log("No user found, redirecting to login");
      router.push("/login");
      return;
    }
    console.log("Initial user data from auth context:", user);
  }, [user, router]);

  // Fetch user details when component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log("Fetching user details...");
        setIsLoading(true);

        const response = await fetch("/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Received user data:", data);

        if (response.ok) {
          const newData = {
            email: data.email || user?.email || "",
            displayName: data.displayName || user?.displayName || "",
            fullName: data.fullName || "",
            phone: data.phone || "",
            country: data.country || "",
          };
          setFormData(newData);
          setInitialFormData(newData);
          console.log("Form data updated successfully");
        } else {
          console.error("Failed to fetch user details:", data.message);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load profile details. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile details. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hasChanges = () => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasChanges()) {
      toast({
        variant: "destructive",
        title: "No Changes",
        description: "Please make some changes before updating.",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (!user) {
          console.error("No user data found");
          return;
        }

        const updatedUser = {
          ...user,
          email: formData.email,
          displayName: formData.displayName,
          updatedAt: new Date().toISOString(),
        };
        setAuth(localStorage.getItem("auth_token"), updatedUser);

        toast({
          variant: "default",
          title: "Success",
          description: "Profile updated successfully!",
          className: "bg-green-500 text-white",
        });

        setInitialFormData(formData);
      } else {
        console.error("Failed to update profile:", data.message);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            data.message || "Failed to update profile. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while updating your profile.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    toast({
      variant: "default",
      title: "Success",
      description: "Changes discarded successfully.",
      className: "bg-green-500 text-white",
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-150px)] flex-col w-full max-w-md mx-auto px-10 py-6 relative">
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
            disabled={isLoading}
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
            disabled={isLoading}
            className="bg-gray-100"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm font-normal">
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={isLoading}
            className="bg-gray-100"
          />
        </div>

        <div>
          <Label htmlFor="country" className="text-sm font-normal">
            Country
          </Label>
          <Input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            disabled={isLoading}
            className="bg-gray-100"
          />
        </div>

        <div className="flex gap-4 pt-2 absolute inset-x-0 bottom-0 p-5">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1 border-black text-black"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-[#f48646] hover:bg-[#f48646]/90"
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
}
