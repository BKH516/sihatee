import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"

import { ReactNode } from "react"

interface GenericDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description : string
    children: ReactNode
}

const DialogCustom = ({
    open,
    onOpenChange,
    title,
    description,
    children,
}: GenericDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
        
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {children}
            
            </DialogContent>
        </Dialog>
    )
}
export default DialogCustom