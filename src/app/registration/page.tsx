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
  const [componentLoaded, setComponentLoaded] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
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
    if (componentLoaded) {
      fetch("/api/terms", {
        headers: {
          'Content-Type': 'text/plain',
          'Accept': 'text/plain'
        }
      }).then(async (res) => await res.text()).then((data: string) => {
        setTermsAndConditions(data)
      });
    }
  }, [componentLoaded])

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
            <Button type="submit" disabled={!agreementAcceptance || isLoading} className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90">
              {!isLoading ? "Create" :
                <div role="status">
                  <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                </div>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
