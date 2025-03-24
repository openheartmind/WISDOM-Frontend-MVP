"use client";

import { DataTable } from "@/app/table/data-table";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/ui/navbar";
import { useEffect, useState } from "react"
import getData from "./table/page";
import { columns, Payment } from "./table/columns";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [title] = useState<string>('Welcome!')
  const [agreementAcceptance, setAgreementAcceptance] = useState<boolean>(false)
  const [data, setData] = useState<Payment[]>([]);
  // const [details, setDetails] = useState<UserDetails>({
  //   email: "",
  //   display: "",
  //   password: "",
  //   fullName: "",
  //   phone: "",
  //   country: ""
  // })

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
      {/* Navigation Bar */}
      <NavBar title={title} role={'admin'} />

      <div className="w-full max-w-md mt-20 space-y-8">

        <div className="mx-auto py-10 flex flex-col flex-1 justify-between">
          <div className="text-lg font-bold p-3">
            Available Instances
          </div>
          <DataTable columns={columns} data={data} />
        </div>

        {/* Form Section */}
        {/* <form onSubmit={handleSubmit} className="mt-8 space-y-6"> */}
        {/* <div className="space-y-6">
            <LabeledInput
              fullWidth={false}
              id="email"
              type="email"
              label="Email"
              isRequired={true}
              value={details.email}
              onChange={(e: { target: { value: any } }) =>
                setDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              } /> */}

        <div className="flex flex-col justify-self-center w-60 fixed bottom-20 left-0 right-0 ">
          <Button type="submit" className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90">
            Create New
          </Button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}
