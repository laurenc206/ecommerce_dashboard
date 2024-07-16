import { LucideIcon } from "lucide-react";

export interface SidebarItems {
    links: Array<{
        href: string;
        label: string;
        active: boolean;
        icon?: LucideIcon
    }>

}