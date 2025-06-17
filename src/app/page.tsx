"use client";

import { DataTable } from "@/app/table/data-table";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import getData from "./table/page";
import { columns, type Payment } from "./table/columns";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "lucide-react";

export default function Home() {
  const [title] = useState<string>("Welcome!");
  const [data, setData] = useState<Payment[]>([]);
  const router = useRouter();
  const { setAuth, isAuthenticated } = useAuth();

  // Redirect to home if already logged in
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Data loading for the table
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
  }, []);
  const handleCreateNewInstance = useCallback(() => {
    router.push("/instances/new");
  }, [router]);
  return (
    <div className="flex flex-col px-4 min-h-[calc(100vh-150px)] md:px-6 md:py-8">
      <div className="w-full max-w-2xl mx-auto flex flex-col">
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold">Available Instances</h1>
        </div>

        <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-auto mb-6">
          <DataTable columns={columns} data={data} />
        </div>

        <div className="flex gap-4 pt-2 absolute inset-x-0 bottom-0 p-5 justify-center mb-6">
          <Button
            type="button"
            className="h-10 md:h-12 bg-[#f48646] hover:bg-[#f48646]/90 text-sm md:text-base font-medium flex items-center gap-2 px-6 "
            onClick={handleCreateNewInstance}
          >
            <PlusCircleIcon className="w-5 h-5 md:w-6 md:h-6" />
            Create New
          </Button>
        </div>
      </div>
    </div>
  );
}
