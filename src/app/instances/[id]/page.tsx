"use client";

import { DataTable } from "@/app/table/data-table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { columns, type Payment } from "../../table/columns";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";

interface InstanceData {
  id: string;
  title: string;
  members?: Payment[];
  contributions?: Payment[];
}

export default function InstancePage() {
  const router = useRouter();
  const params = useParams();
  const instanceId = params?.instanceId as string;
  const [instance, setInstance] = useState<InstanceData | null>(null);
  const [members, setMembers] = useState<Payment[]>([]);
  const [contributions, setContributions] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!instanceId) {
      console.error("No instance ID provided");
      router.push("/");
      return;
    }

    const fetchInstanceData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/instances/${instanceId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching instance: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);
        setInstance(data);

        // Placeholder for members and contributions
        // In a real app, you might have separate API calls for these
        // or they might be included in the instance data
        setMembers(data.members || []);
        setContributions(data.contributions || []);
      } catch (error) {
        console.error("Error fetching instance data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstanceData();
  }, [instanceId, isAuthenticated, router, token]);

  const handleCreateContribution = () => {
    router.push(`/instances/${instanceId}/contribution/create`);
  };

  const handleReviewContributions = () => {
    router.push(`/instances/${instanceId}/contribution/review`);
  };

  const handleReports = () => {
    router.push(`/instances/${instanceId}/reports`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-row justify-center p-4">
      <div className="w-full max-w-md mt-3 relative z-0">
        {instance && (
          <div className="mb-4">
            <h2 className="text-xl font-bold">{instance.title}</h2>
          </div>
        )}

        {/* API Debug Panel */}
        <div className="mb-6 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-bold mb-2">API Debug Info</h3>
          <div className="overflow-auto max-h-60 text-xs">
            <pre>{JSON.stringify(instance, null, 2)}</pre>
          </div>
        </div>

        <div className="mx-auto py-2 flex flex-col flex-1 justify-between">
          <div className="text-lg font-bold p-3">Members</div>
          <DataTable columns={columns} data={members} />
        </div>

        <div className="mx-auto py-2 flex flex-col flex-1 justify-between">
          <div className="text-lg font-bold p-3">Contributions</div>
          <DataTable columns={columns} data={contributions} />
        </div>

        <div className="flex flex-col space-y-6 mt-10 justify-self-center w-60 h-fit">
          <div className="flex">
            <Button
              type="button"
              className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90"
              onClick={handleCreateContribution}
            >
              Create Contribution
            </Button>
          </div>
          <div className="flex">
            <Button
              type="button"
              className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90"
              onClick={handleReviewContributions}
            >
              Review Contributions
            </Button>
          </div>
          <div className="flex">
            <Button
              type="button"
              className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90"
            >
              Review MetaValue Contributions
            </Button>
          </div>
          <div className="flex">
            <Button
              type="button"
              className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90"
              onClick={handleReports}
            >
              Reports
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
