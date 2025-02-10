"use client"

import { Dispatch, SetStateAction } from "react"

interface Props {
  title: string
  setTitle: Dispatch<SetStateAction<string>>
}

export default function NavBar(props: Props) {
  return (
    <div>
      <div className="flex flex-col h-95 items-center justify-top absolute top-5 left-0 right-0">
        <div className="flex flex-row h-95 items-center w-full max-w-md">
          {/* Logo */}
          <div className="w-32 ml-5">
            <div className="w-full rounded-full size-20 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-3xl">Logo</span>
            </div>
          </div>

          {/* Title */}
          <div className="mx-auto">
            <label htmlFor="title" className="block text-3xl mb-2 pr-7">
              {props.title}
            </label>
          </div>
        </div>
      </div>
    <div className="md:mb-20 mb-15">
    </div>
    </div>
  )
}
