"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import LabeledInput from "@/components/ui/labeledInput";
import { NavBar } from "@/components/ui/navbar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Member {
  name: string;
  role: string;
}

interface Dimension {
  title: string;
  description: string;
}

interface NewInstanceDetails {
  name: string;
  description: string;
  members: Member[];
  dimensions: Dimension[];
}

// Available roles for members (excluding Owner as it's only for instance creator)
const AVAILABLE_ROLES = ["Manager", "Reviewer", "Metaviewer"];

export default function NewInstance() {
 
  const [newMemberEmail, setNewMemberEmail] = useState<string>("");
  const [details, setDetails] = useState<NewInstanceDetails>({
    name: "",
    description: "",
    members: [
      { name: "Coops", role: "Owner" },
      { name: "Alex", role: "Reviewer" },
    ],
    dimensions: [
      { title: "Mission", description: "lorem ipsum" },
      { title: "Gratitude", description: "" },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Instance details:", details);
  };

  const handleAddMember = () => {
    if (newMemberEmail) {
      setDetails((prev) => ({
        ...prev,
        members: [...prev.members, { name: newMemberEmail, role: "Reviewer" }],
      }));
      // Reset email input after adding
      setNewMemberEmail("");
      // TODO: In the future, this would trigger sending an email to the user
    }
  };

  const handleRoleChange = (memberName: string, newRole: string) => {
    setDetails((prev) => ({
      ...prev,
      members: prev.members.map((member) =>
        member.name === memberName ? { ...member, role: newRole } : member
      ),
    }));
  };

  const handleCancel = () => {
    window.location.href = "/instances";
  };

  return (
    <>
      <div className="flex min-h-screen flex-col w-full max-w-md mx-auto px-4 py-6 mt-16">
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
              <h2 className="text-xl mb-4">Members</h2>
              <div className="border rounded-md overflow-hidden">
                {/* Table Headers */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 border-b">
                  <div className="text-lg font-medium">Username</div>
                  <div className="text-lg font-medium">Role</div>
                </div>
                {/* Table Body */}
                {details.members.map((member) => (
                  <div
                    key={`member-${member.name}-${member.role}`}
                    className="grid grid-cols-2 gap-4 p-4 border-b last:border-b-0 items-center"
                  >
                    <div className="text-xl">{member.name}</div>
                    <Select
                      value={member.role}
                      onValueChange={(value) =>
                        handleRoleChange(member.name, value)
                      }
                      disabled={member.role === "Owner"}
                    >
                      <SelectTrigger className="bg-gray-50">
                        <SelectValue>{member.role}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {member.role === "Owner" ? (
                          <SelectItem value="Owner">Owner</SelectItem>
                        ) : (
                          AVAILABLE_ROLES.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
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
            </div>

            <div>
              <h2 className="text-xl mb-4">Add new member by email</h2>
              <div className="flex items-center gap-2 w-full">
                <div className="flex-grow min-w-0">
                  <Input
                    id="newMemberEmail"
                    type="email"
                    value={newMemberEmail}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setNewMemberEmail(e.target.value)
                    }
                    className="w-full"
                  />
                </div>
                <Button
                  type="button"
                  className="bg-[#2196F3] hover:bg-[#2196F3]/90 px-8 rounded-lg shrink-0"
                  onClick={handleAddMember}
                >
                  Add
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
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
        </form>
      </div>
    </>
  );
}
