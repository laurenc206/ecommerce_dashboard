import { SignOutButton, UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { NavLinks } from "@/components/nav-links";
import StoreSwitcher from "@/components/store-switcher";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "@/components/theme-toggle";
import { Store } from "@prisma/client";
import { Button } from "./ui/button";

interface SidebarProps {
    stores: Store[]
}

const Sidebar = ({ stores }: SidebarProps) => {

  return (
    <aside className=" w-[240px] lg:w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r overflow-y-auto">
        <div className="h-full px-5 py-6">
        
            <div className="flex flex-col h-full lg:justify-between">
                 <div className="flex flex-col gap-4">
                <div>
                    <img src="/logo.svg" alt="/logo.svg" className="h-[50px]"/>
                </div>
                    
                
                <StoreSwitcher items={stores}/>
                <NavLinks className="flex flex-col w-full"/>
                </div>
                
                <div className="w-full flex pt-5 items-center">
                    <div className="py-1 px-4">
                        <SignOutButton>
                            <Button variant="outline" className="py-1 px-6 border border-white/[0.2]">
                                Sign-Out
                            </Button>
                        </SignOutButton>
                    </div>
                    
                    <ThemeToggle />
                   
                </div>
               
            </div>
        </div>

    </aside>
  )
}

export default Sidebar