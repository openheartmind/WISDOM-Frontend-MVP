"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode } from "react"

export function CustomDialog({ title, content, children }: { title: string, content: string, children: ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        <span dangerouslySetInnerHTML={{ __html: `<pre>${content}</pre>` }} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}