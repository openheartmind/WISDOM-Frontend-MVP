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
    <div className="flex flex-auto mx-auto justify-between">
      <div className="items-center block text-lg mb-2">
        {props.label} {props.isRequired ? <span style={{ color: 'red' }}>(*)</span> : ''}
      </div>
      <div className="flex mx-30">
        <Input
          id={props.id}
          type={props.type}
          required={props.isRequired}
          className="w-full border-gray-300"
          value={props.value}
          onChange={props.onChange}
          style={{ maxWidth: props.fullWidth ? 'unset' : '190px' }}
        />
      </div>
    </div>
  )
}
