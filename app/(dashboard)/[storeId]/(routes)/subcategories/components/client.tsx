"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { SubcategoryColumn, columns } from "./columns";

interface SubcategoryClientProps {
    data: SubcategoryColumn[]
}

export const SubcategoryClient: React.FC<SubcategoryClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    
    return (
        <>
            <div className="flex items-center justify-between flex-wrap gap-y-4">
                <Heading 
                    title={`Subcategories (${data.length})`}
                    description="Manage subcategories for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/subcategories/new`)} >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data}/>
            <Heading title="API" description="API calls for Subcategories" />
            <Separator />
            <ApiList entityName="subcategories" entityIdName="subcategoryId"/>
        </>
    );
};