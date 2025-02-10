"use client"

import { Input } from "@/components/ui/input"
import { Checkbox } from "./checkbox"

interface Props {
  label: string
  id: string
  onChange: any
}

export default function LabeledCheckbox(props: Props) {
  return (
    <div className="flex flex-row gap-3">
      <div className="self-center">
        <Checkbox type={'checkbox'} id={props.id} onChange={props.onChange} />
      </div>
      <div className="self-center">
        <label htmlFor={props.id}>
          {props.label}
        </label>
      </div>
    </div>
  )
}
