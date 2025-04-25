"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import LabeledInput from "@/components/ui/labeledInput"
import LabeledCheckbox from "@/components/ui/labeledcheckbox"
import { NavBar } from "@/components/ui/navbar"

interface UserDetails {
  email: string
  display: string
  password: string
  fullName: string
  phone: string
  country: string
}

export default function RegistrationForm() {
  const [agreementAcceptance, setAgreementAcceptance] = useState<boolean>(false)
  const [details, setDetails] = useState<UserDetails>({
    email: "",
    display: "",
    password: "",
    fullName: "",
    phone: "",
    country: ""
  })

  useEffect(()=> console.debug(`Checkbox: ${agreementAcceptance}`), [agreementAcceptance])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare auth object for the endpoint
    const authPayload = {
      email: details.email,
      display: details.display,
      password: details.password,
      fullName: details.fullName,
      phone: details.phone,
      country: details.country,
      timestamp: new Date().toISOString(),
    }

    // Here you would typically send the authPayload to your authentication endpoint
    console.log("Auth payload ready:", authPayload)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md ">
       

        {/* Form Section */}
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
                  email: e.target.value,
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
                  email: e.target.value,
                }))
              } />

            <LabeledInput
              fullWidth={false}
              id="fullname"
              type="text"
              label="Full Name"
              isRequired={false}
              value={details.display}
              onChange={(e: { target: { value: any } }) =>
                setDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              } />

            <LabeledInput
              fullWidth={false}
              id="phone"
              type="text"
              label="Phone"
              isRequired={false}
              value={details.display}
              onChange={(e: { target: { value: any } }) =>
                setDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              } />

            <LabeledInput
              fullWidth={false}
              id="country"
              type="text"
              label="Country"
              isRequired={false}
              value={details.display}
              onChange={(e: { target: { value: any } }) =>
                setDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              } />
          </div>

          <div className="flex self-center m-w-full w-60 justify-self-center gap-4 pt-4">
            <LabeledCheckbox id="TnCs" label={'By ticking this box I accept the Terms & Conditions'} onChangeHandler={setAgreementAcceptance} />
          </div>

          <div className="flex justify-center">
            <span className="text-blue-600 underline">Click here to view the Terms & Conditions</span>
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
            <Button type="submit" className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90">
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
