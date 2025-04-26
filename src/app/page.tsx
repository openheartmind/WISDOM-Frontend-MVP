"use client";

import { DataTable } from "@/app/table/data-table";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/ui/navbar";
import { useEffect, useState } from "react"
import getData from "./table/page";
import { columns, Payment } from "./table/columns";

export default function Home() {
  const [title] = useState<string>('Welcome!')
  const [data, setData] = useState<Payment[]>([]);

  // Data loading for the table
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div className="flex min-h-screen flex-row justify-center p-4">
      <div className="w-full max-w-md space-y-8">

        <div className="mx-auto py-10 flex flex-col flex-1 justify-between">
          <div className="text-lg font-bold p-3">
            Available Instances
          </div>
          <DataTable columns={columns} data={data} />
        </div>

        <div className="flex flex-col justify-self-center w-60 fixed bottom-20 left-0 right-0 ">
          <Button type="submit" className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90">
            Create New
          </Button>
        </div>
      </div>
    </div>
  );
}
