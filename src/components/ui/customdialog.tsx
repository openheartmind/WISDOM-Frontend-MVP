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
            <DialogContent style={{overflowWrap: 'anywhere'}} className="w-full max-w-[95%] h-5/6 overflow-y-auto rounded-lg">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className="h-full overflow-y-auto relative text-left">
                        <span dangerouslySetInnerHTML={{ __html: `<pre style="text-wrap: auto">${content}</pre>` }} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}