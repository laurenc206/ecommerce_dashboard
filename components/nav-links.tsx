"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import SidebarButton from "./sidebar-button";
import { CircleDollarSign, Home, ListTreeIcon, Palette, Rows, Settings, Image, ShoppingBag, Scan } from "lucide-react";


export function NavLinks({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}`, 
            label: 'Overview',
            active: pathname === `/${params.storeId}`,
            icon: Home
        },
        {
           href: `/${params.storeId}/billboards`, 
           label: 'Billboards',
           active: pathname === `/${params.storeId}/billboards`,
           icon: Image
        },
        {
            href: `/${params.storeId}/categories`, 
            label: 'Categories',
            active: pathname === `/${params.storeId}/categories`,
            icon: Rows
        },
        {
            href: `/${params.storeId}/subcategories`,
            label: 'Subcategories',
            active: pathname === `/${params.storeId}/subcategories`,
            icon: ListTreeIcon
        },
        {
            href: `/${params.storeId}/sizes`, 
            label: 'Sizes',
            active: pathname === `/${params.storeId}/sizes`,
            icon: Scan
        },
        {
            href: `/${params.storeId}/colors`, 
            label: 'Colors',
            active: pathname === `/${params.storeId}/colors`,
            icon: Palette
        },
        {
            href: `/${params.storeId}/products`, 
            label: 'Products',
            active: pathname === `/${params.storeId}/products`,
            icon: ShoppingBag
        },
        {
            href: `/${params.storeId}/orders`, 
            label: 'Orders',
            active: pathname === `/${params.storeId}/orders`,
            icon: CircleDollarSign
        },
        {
            href: `/${params.storeId}/settings`, 
            label: 'Settings',
            active: pathname === `/${params.storeId}/settings`,
            icon: Settings
        }
    ];
    
    return (
        <nav 
            className={cn("flex", className)}
        >
            {routes.map((route) => (
                <Link 
                    key={route.href}
                    href={route.href} 
                    {...props}
                >
                    <SidebarButton  
                        icon={route.icon}                  
                        className={cn("w-full text-sm font-medium transition-colors hover:text-primary justify-start",
                                    route.active ? "text-black dark:text-white" : "text-muted-foreground" 
                                   
                    )}>
                        {route.label}
                    </SidebarButton>
                  
                </Link>
               
                
            ))}
        </nav>
    )
};