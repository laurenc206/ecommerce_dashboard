"use client"

import MobileMenu from "./mobile-menu";
import { Store } from "@prisma/client";
import { useMediaQuery } from "@/hooks/use-media-query";
import Sidebar from "./sidebar";


interface NavbarProps {
    stores: Store[],
    storeId: string,
}

const Navbar = ({ stores, storeId }: NavbarProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return isDesktop ? <Sidebar stores={stores}/> : <MobileMenu stores={stores} storeId={storeId}/>

}
export default Navbar;