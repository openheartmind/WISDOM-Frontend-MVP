"use client";

import { DataTable } from "@/app/table/data-table";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/ui/navbar";
import { useEffect, useState } from "react";
import { columns, Payment } from "../table/columns";
import { ArrowRightFromLine } from "lucide-react";
import getData from "../table/page";

export default function Instances() {
  const [title] = useState<string>("Meta-Science");
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div className="flex min-h-screen flex-row justify-center p-4">
      <NavBar title={title} role={"admin"} />

      <div className="w-full max-w-md mt-20">
        <div className="mx-auto py-2 flex flex-col flex-1 justify-between">
          <div className="text-lg font-bold p-3">Members</div>
          <DataTable columns={columns} data={data} />
        </div>

        <div className="mx-auto py-2 flex flex-col flex-1 justify-between">
          <div className="text-lg font-bold p-3">Contributions</div>
          <DataTable columns={columns} data={data} />
        </div>

        <div className="flex flex-col space-y-6 justify-self-center w-60 fixed bottom-20 h-fit left-0 right-0">
          <div className="flex">
            <Button
              type="submit"
              className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90"
            >
              Create Contribution
            </Button>
          </div>
          <div className="flex">
            <Button
              type="submit"
              className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90"
            >
              Review Contributions
            </Button>
          </div>
          <div className="flex">
            <Button
              type="submit"
              className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90"
            >
              Review MetaValue Contributions
            </Button>
          </div>
          <div className="flex">
            <Button
              type="submit"
              className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90"
            >
              Reports
            </Button>
          </div>
        </div>
        <div className="mx-auto absolute right-40 bottom-5">
          <ArrowRightFromLine className="h-10 w-10" />
        </div>
      </div>
    </div>
  );
}
