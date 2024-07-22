import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import MainNav from "@/components/main-nav";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: { storeId: string }
}) {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!store) {
        redirect('/');
    }

    return (
        <>
        <MainNav storeId={params.storeId}/>
        <main className="md:ml-[270px]  lg:ml-[300px] mt-2">
            {children}
        </main>
        </>
    );
};