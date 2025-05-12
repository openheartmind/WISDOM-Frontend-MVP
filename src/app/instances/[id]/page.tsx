"use client";

import { DataTable } from "@/app/table/data-table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { columns, type Payment } from "../../table/columns";
import getData from "../../table/page";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Instances() {
  const router = useRouter();
  const [data, setData] = useState<Payment[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    !isAuthenticated && router.push('/login');

    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen flex-row justify-center p-4">
      <div className="w-full max-w-md mt-3 relative z-0">
        <div className="mx-auto py-2 flex flex-col flex-1 justify-between">
          <div className="text-lg font-bold p-3">Members</div>
          <DataTable columns={columns} data={data} />
        </div>

        <div className="mx-auto py-2 flex flex-col flex-1 justify-between">
          <div className="text-lg font-bold p-3">Contributions</div>
          <DataTable columns={columns} data={data} />
        </div>

        <div className="flex flex-col space-y-6 mt-10 justify-self-center w-60 h-fit">
          <div className="flex">
            <Button
              type="button"
              className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90"
            >
              Create Contribution
            </Button>
          </div>
          <div className="flex">
            <Button
              type="button"
              className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90"
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
            >
              Reports
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
