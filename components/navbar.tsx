"use client"
import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/store-switcher";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "@/components/theme-toggle";
import SidebarButton from "./sidebar-button";
import MobileMenu from "./mobile-menu";
import { Store } from "@prisma/client";
import { useMediaQuery } from "@/hooks/use-media-query";
import Sidebar from "./sidebar";


interface NavbarProps {
    stores: Store[]
}

const Navbar = ({ stores }: NavbarProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return isDesktop ? <Sidebar stores={stores}/> : <MobileMenu stores={stores}/>

}

export default Navbar;