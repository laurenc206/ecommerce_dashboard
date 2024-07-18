import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { NavLinks } from "@/components/nav-links";
import StoreSwitcher from "@/components/store-switcher";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "@/components/theme-toggle";
import { Store } from "@prisma/client";

interface SidebarProps {
    stores: Store[]
}

const Sidebar = ({ stores }: SidebarProps) => {

  return (
    <aside className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r overflow-y-auto">
        <div className="h-full px-5 py-6">
        
            <div className="flex flex-col justify-between h-full">
                 <div className="flex flex-col gap-4">
                <div>
                    <img src="/logo.svg" alt="/logo.svg" className="h-[50px]"/>
                </div>
                    
                
                <StoreSwitcher items={stores}/>
                <NavLinks className="flex flex-col w-full"/>
                </div>
                
                <div className="w-full flex">
                    <div className="py-1 px-3">
                    <UserButton afterSignOutUrl="/" appearance={{
                        elements: {
                            userButtonAvatarBox: "h-[30px] w-[30px]"
                        }
                    }}/>
                    </div>
                    
                    <ThemeToggle />
                   
                </div>
               
            </div>
        </div>

    </aside>
  )
}

export default Sidebar