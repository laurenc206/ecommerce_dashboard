import React from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarButtonProps extends ButtonProps {
    icon?: LucideIcon;
}

const SidebarButton = ({
    icon: Icon,
    className,
    children,
    ...props
}: SidebarButtonProps) => {
  return (
    <Button
        variant="ghost"
        className={cn("gap-2 justify-start", className)}
        {...props}
    >
        {Icon && <Icon size={15}/> } 
        <span>{children}</span>

    </Button>
  )
}

export default SidebarButton