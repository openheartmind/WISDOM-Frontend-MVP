"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import LabeledInput from "@/components/ui/labeledInput"
import LabeledCheckbox from "@/components/ui/labeledcheckbox"
import { CustomDialog } from "@/components/ui/customdialog"
import { redirect } from 'next/navigation';
import { CustomToastie } from "@/components/ui/customtoastie"
import { useToast } from "@/hooks/use-toast"

interface UserDetails {
  email: string
  display: string
  password: string
  fullName: string
  phone: string
  country: string
}

interface ApiResponse {
  status: number;
  data: {
    status?: number;
    success?: boolean;
    message?: string;
    details?: string;
  };
}

export default function RegistrationForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [agreementAcceptance, setAgreementAcceptance] = useState<boolean>(false)
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [termsAndConditions, setTermsAndConditions] = useState<string>()
  const [details, setDetails] = useState<UserDetails>({
    email: "",
    display: "",
    password: "",
    fullName: "",
    phone: "",
    country: ""
  })

  useEffect(() => {
    if (isLoading) {
      fetch("/api/terms", {
        headers: {
          'Content-Type': 'text/plain',
          'Accept': 'text/plain'
        }
      }).then(async (res) => await res.text()).then((data: string) => {
        setTermsAndConditions(data)
      });
    }
  }, [isLoading])

  useEffect(() => {
    apiResponse && apiResponse?.data.success === true ? redirect('/login?new') :
      apiResponse && CustomToastie(toast, {
        style: 'red',
        description: "Server error. User failed to be created",
      })
  }, [apiResponse])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setApiResponse(null);

    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: details.email,
          display: details.display,
          password: details.password,
          fullName: details.fullName,
          phone: details.phone,
          country: details.country,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();
      setApiResponse({
        status: response.status,
        data: data,
      });
    } catch (error) {
      setApiResponse({
        status: 500,
        data: {
          message: "Failed to connect to API",
          details: "Could not connect to the server",
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center m-5 mt-10">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
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
              } />

            <LabeledInput
              fullWidth={false}
              id="displayname"
              type="text"
              label="Display Name"
              isRequired={true}
              value={details.display}
              onChange={(e: { target: { value: any } }) =>
                setDetails((prev) => ({
                  ...prev,
                  display: e.target.value,
                }))
              } />

            <LabeledInput
              fullWidth={false}
              id="password"
              type="password"
              label="Password"
              isRequired={true}
              value={details.password}
              onChange={(e: { target: { value: any } }) =>
                setDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              } />

            <LabeledInput
              fullWidth={false}
              id="fullname"
              type="text"
              label="Full Name"
              isRequired={false}
              value={details.fullName}
              onChange={(e: { target: { value: any } }) =>
                setDetails((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              } />

            <LabeledInput
              fullWidth={false}
              id="phone"
              type="text"
              label="Phone"
              isRequired={false}
              value={details.phone}
              onChange={(e: { target: { value: any } }) =>
                !isNaN(e.target.value) ?
                  setDetails((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  })) : null
              } />

            <LabeledInput
              fullWidth={false}
              id="country"
              type="text"
              label="Country"
              isRequired={false}
              value={details.country}
              onChange={(e: { target: { value: any } }) =>
                setDetails((prev) => ({
                  ...prev,
                  country: e.target.value,
                }))
              } />
          </div>

          <div className="flex self-center m-w-full w-60 justify-self-center gap-4 pt-4">
            <LabeledCheckbox id="TnCs" label={'By ticking this box I accept the Terms & Conditions'} onChangeHandler={setAgreementAcceptance} />
          </div>

          <div className="flex justify-center">
            <CustomDialog title="Terms & Conditions" content={termsAndConditions || ''}>
              <span className="text-blue-600 underline">Click here to view the Terms & Conditions</span>
            </CustomDialog>
          </div>

          <div className="flex justify-between gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 text-[#2196F3] border-[#2196F3] hover:bg-[#2196F3]/10"
              onClick={() => (window.location.href = "/login")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!agreementAcceptance} className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
