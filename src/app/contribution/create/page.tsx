"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle } from "lucide-react"

export default function ContributionForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [contributor, setContributor] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState<string | null>(null)
  const [contributors, setContributors] = useState<string[]>([])
  const [jsonResponse, setJsonResponse] = useState<string | null>(null)

  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const handleAddEmail = () => {
    // Reset previous error
    setEmailError(null)

    // Check if email is empty
    if (!email.trim()) {
      setEmailError("Email cannot be empty")
      return
    }

    // Validate email format
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }

    // Check if email already exists in the list
    if (contributors.includes(email)) {
      setEmailError("This email has already been added")
      return
    }

    // Add valid email to the list
    setContributors([...contributors, email])
    setEmail("")
  }

  const handleSubmit = async () => {
    // Create the JSON payload
    const payload = {
      title,
      description,
      contributor,
      contributors,
    }

    // Display the JSON for demonstration
    setJsonResponse(JSON.stringify(payload, null, 2))

    // In a real application, you would send this to your backend:
    // const response = await fetch('/api/contributions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // })
    // const data = await response.json()
    // console.log('Response from server:', data)
  }

  return (
    <div className="max-w-md mx-auto min-h-screen">
      <div className="p-4">
    

        <div className="bg-white p-4 rounded-md shadow-sm">
         

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block mb-2 font-medium">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded-md w-full"
              />
            </div>

            <div>
              <label htmlFor="description" className="block mb-2 font-medium">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded-md w-full h-24"
              />
            </div>

            <div>
              <label htmlFor="contributor" className="block mb-2 font-medium">
                Contributor
              </label>
              <Input
                id="contributor"
                value={contributor}
                onChange={(e) => setContributor(e.target.value)}
                className="border rounded-md w-full"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                Search by email
              </label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setEmailError(null) // Clear error when typing
                    }}
                    className={`border rounded-md w-full ${emailError ? "border-red-500" : ""}`}
                  />
                  {emailError && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      <span>{emailError}</span>
                    </div>
                  )}
                </div>
                <Button onClick={handleAddEmail} className="bg-blue-500 hover:bg-blue-600 text-white px-4">
                  Add
                </Button>
              </div>
            </div>

            {contributors.length > 0 && (
              <div className="mt-2">
                <ul className="space-y-1">
                  {contributors.map((contributor, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <span className="inline-block w-4 h-4 bg-green-100 text-green-800 rounded-full mr-2 flex items-center justify-center text-xs">
                        ✓
                      </span>
                      {contributor}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" className="border border-blue-500 text-blue-500 px-8">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white px-8">
            Create
          </Button>
        </div>

        {jsonResponse && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h3 className="font-medium mb-2">JSON Response:</h3>
            <pre className="text-xs overflow-auto p-2 bg-white border rounded">{jsonResponse}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

