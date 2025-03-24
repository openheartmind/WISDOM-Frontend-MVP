"use client"

import { Checkbox } from "./checkbox"
import { Dispatch, SetStateAction } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem } from "./form"

interface Props {
  label: string
  id: string
  onChangeHandler: Dispatch<SetStateAction<boolean>>
}

export default function LabeledCheckbox(props: Props) {
  const formSchema = z.object({
    agreement: z.boolean().default(false).optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agreement: false,
    },
  })

  return (
    <div className="flex flex-row gap-3">
      <div className="self-center">
        <Form {...form}>
            <FormField
              control={form.control}
              name={"agreement"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox id={props.id} checked={field.value} onCheckedChange={(event: boolean) => { field.onChange(event); props.onChangeHandler(event) }} />
                  </FormControl>
                </FormItem>
              )} />
        </Form>
      </div>
      <div className="flex items-center space-x-2">
        {props.label}
      </div>
    </div>
  )
}
