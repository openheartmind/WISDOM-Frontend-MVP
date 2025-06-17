"use client";

import { DataTable } from "@/app/table/data-table";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/ui/navbar";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import getData from "./table/page";
import { type Payment } from "./table/columns";

// Define a type for dynamic data
type DynamicData = Record<string, string | number>;

export default function Home() {
  const [title] = useState<string>("Welcome!");
  const [data, setData] = useState<DynamicData[]>([]);
  const [columns, setColumns] = useState<ColumnDef<DynamicData, unknown>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Fetch data from local mock data function
        const result = await getData();
        console.log("Local data result:", result);

        // If we have data, dynamically create columns based on first item
        if (result && result.length > 0) {
          // Get all property names from the first item
          const firstItem = result[0];
          const dynamicColumns = Object.keys(firstItem)
            // Optionally exclude the "id" field from displaying
            .filter((key) => key !== "id")
            .map((key) => ({
              accessorKey: key,
              header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
            })) as ColumnDef<DynamicData, unknown>[];

          setColumns(dynamicColumns);
          setData(result);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle row click
  const handleRowClick = (row: DynamicData) => {
    alert(`Selected: ${row.instance}`);
  };

  return (
    <div className="flex min-h-screen flex-row justify-center p-4">
      <div className="w-full max-w-full md:max-w-5xl space-y-8">
        <div className="mx-auto py-6 flex flex-col flex-1 justify-between">
          <div className="text-lg font-bold px-4 py-2">Available Instances</div>
          <DataTable
            columns={columns}
            data={data}
            isLoading={isLoading}
            onRowClick={handleRowClick}
            rowStyle="hover:bg-gray-50"
            showSearch={true}
            searchPlaceholder="Search instances..."
            paginationThreshold={10}
          />
        </div>

        <div className="flex flex-col justify-self-center w-60 fixed bottom-20 left-0 right-0 mx-auto">
          <Button
            type="submit"
            className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90"
          >
            Create New
          </Button>
        </div>
      </div>
    </div>
  );
}
