"use client"

import { Input } from "@/components/ui/input"

interface Props {
  label: string
  id: string
  type: string
  isRequired: boolean
  value: string
  onChange: any
  fullWidth: boolean
}

export default function LabeledInput(props: Props) {
  return (
    <div className="flex flex-row">
      <div  className="flex flex-auto mx-auto">
        <label htmlFor={props.id} className="block text-xl mb-2">
          {props.label} {props.isRequired ? <span style={{ color: 'red' }}>(*)</span> : ''}
        </label>
      </div>
      <div className="flex mx-30">
        <Input
          id={props.id}
          type={props.type}
          required={props.isRequired}
          className="w-full border-gray-300"
          value={props.value}
          onChange={props.onChange}
          style={{maxWidth: props.fullWidth ? 'unset' : '190px'}}
        />
      </div>
    </div>
  )
}
