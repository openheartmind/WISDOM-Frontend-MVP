"use client"

interface ToastieProps {
    description: string
    title?: string
    style?: 'green' | 'red' | null
    seconds?: number
    isBold?: boolean
}

const toastieStyles = {
    green: { backgroundColor: '#62bc68', border: 0, boxShadow: '2px 2px 8px 1px #366d3b' },
    red: { backgroundColor: '#bc6262', border: 0, boxShadow: '2px 2px 8px 1px #6d3636', color: '#ffff' },
    default: { backgroundColor: '#dedede', boxShadow: '2px 2px 8px 1px #414141', color: 'black' }
}

export function CustomToastie(toast: any, props: ToastieProps) {
    let style: any = props.style === 'green' ? toastieStyles.green : props.style === 'red' ? toastieStyles.red : toastieStyles.default
    if (props.isBold) style = { ...style, fontWeight: 'bold' }

    return toast({
        style,
        variant: props.style ? 'destructive' : 'default',
        description: props.description,
        ...(props.seconds ? { duration: props.seconds * 1000 } : {}),
        ...(props.title ? { title: props.title } : {})
    })
}