import { User } from "lucide-react"
import * as React from "react"

interface Props {
  title: string,
  role?: string
}

enum Roles {
  Admin='admin',
  Creator='creator'
}

const NavBar = (props: Props) => {
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
          <div className="flex flex-left ml-10 justify-center">
            <label htmlFor="title" className="block text-3xl mb-2 pr-7">
              {props.title}
            </label>
          </div>

          {/* Options */}
          <div className="mx-auto">
              { props.role && props.role === Roles.Admin && <User className="h-10 w-10"  /> }
          </div>
        </div>
      </div>
      {/* <div className="md:mb-20 mb-15">
      </div> */}
    </div>
  )
}

export { NavBar }
