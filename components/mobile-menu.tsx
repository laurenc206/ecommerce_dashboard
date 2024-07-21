import React, { useEffect, useState } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { MenuIcon } from 'lucide-react'
import { Store } from '@prisma/client'
import StoreSwitcher from './store-switcher'
import { NavLinks } from './nav-links'
import { UserButton } from '@clerk/nextjs'
import { ThemeToggle } from './theme-toggle'

interface MobileMenuProps {
    stores: Store[]
}

const MobileMenu = ({ stores }: MobileMenuProps) => {
  const [openMenu, setOpenMenu] = useState(false)


  
  return (
    <div className="border-b w-full">
        <div className="flex h-16 items-center px-8 justify-between">

            <div className="gap-5 flex">
                <img src="/logo.svg" alt="/logo.svg" className="h-[35px]"/>
                <StoreSwitcher items={stores}/>
            </div>

            <div className="flex pl-4">
                <Drawer direction="right" open={openMenu} onOpenChange={setOpenMenu}>
                    <DrawerTrigger>
                        <MenuIcon />
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerTitle></DrawerTitle>
                    <div className="h-screen w-80">
                        <div className="flex flex-col justify-between py-4 px-2 h-full overflow-y-auto">
                            <DrawerClose asChild>
                                <NavLinks className="flex flex-col w-full gap-4" />
                            </DrawerClose>
                            
                
                                <div className="w-full flex pt-4 gap-2">
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


                    </DrawerContent>
                </Drawer>
            </div>
            
        </div>
    </div>

  )
}

export default MobileMenu