"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import LabeledInput from "@/components/ui/labeledInput";
import { NavBar } from "@/components/ui/navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Dimension {
  title: string;
  description: string;
}

interface NewInstanceDetails {
  name: string;
  description: string;
  dimensions: Dimension[];
}

export default function NewInstance() {
  const [newMemberEmail, setNewMemberEmail] = useState<string>("");
  const [details, setDetails] = useState<NewInstanceDetails>({
    name: "",
    description: "",
    dimensions: [
      { title: "Mission", description: "lorem ipsum" },
      { title: "Gratitude", description: "" },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Instance details:", details);
  };

  const handleCancel = () => {
    window.location.href = "/instances";
  };

  return (
    <>
      <div className="flex min-h-screen flex-col w-full max-w-md mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <LabeledInput
                fullWidth={true}
                id="name"
                type="text"
                label="Name"
                isRequired={true}
                value={details.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDetails((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <h2 className="text-lg mb-2">Description</h2>
              <textarea
                id="description"
                className="w-full p-3 border rounded-md min-h-[100px]"
                value={details.description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setDetails((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <h2 className="text-xl mb-4">Dimensions</h2>
              <div className="border rounded-md overflow-hidden">
                {/* Table Headers */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 border-b">
                  <div className="text-lg font-medium">Title</div>
                  <div className="text-lg font-medium">Description</div>
                </div>
                {/* Table Body */}
                {details.dimensions.map((dimension) => (
                  <div
                    key={`dimension-${dimension.title}`}
                    className="grid grid-cols-2 gap-4 p-4 border-b last:border-b-0"
                  >
                    <div className="text-base">{dimension.title}</div>
                    <div className="text-base text-gray-600">
                      {dimension.description}
                    </div>
                  </div>
                ))}
              </div>

              <p className="!text-[17px] !font-normal text-center xs:mt- sm:mt-5 md:mt-5 lg:mt-10">
                Adding members to this instance will be available after creation
              </p>
            </div>

            <div className="justify-self-center fixed xs:bottom-8 sm:bottom-8 lg:bottom-20 xl:bottom-20 left-0 right-0 w-full max-w-md mx-auto">
              <div className="flex gap-6">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 text-[#2196F3] border-[#2196F3] hover:bg-[#2196F3]/10 rounded-lg py-3"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90 rounded-lg py-3"
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
