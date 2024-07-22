import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import Navbar from "./navbar";

interface MainNavProps {
  storeId: string
}
const MainNav = async ({storeId}: MainNavProps) => {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId,
        },
    });
  return (
    <Navbar stores={stores} storeId={storeId}/>
  )
}

export default MainNav