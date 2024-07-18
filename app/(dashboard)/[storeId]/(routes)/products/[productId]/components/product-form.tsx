"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from 'react'
import { Product, Image, Category, Color, Size, Subcategory } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import { Select, 
         SelectTrigger, 
         SelectValue, 
         SelectContent,
         SelectItem 
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Form, 
         FormControl, 
         FormDescription, 
         FormField, 
         FormItem, 
         FormLabel, 
         FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    name: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    subcategoryId: z.string().min(1),
    colorId: z.string().nullable().optional(),
    sizeId: z.string().nullable().optional(),
    description: z.string().optional(),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
    isLocked: z.boolean().default(false).optional()
});

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
    initialData: Product & {
        images: Image[]
    } | null;
    categories: Category[];
    subcategories: Subcategory[];
    colors: Color[];
    sizes: Size[];
};

export const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    categories,
    subcategories,
    sizes,
    colors
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
   
    const title = initialData ? "Edit product" : "Create product";
    const description = initialData ? "Edit a product" : "Add a new product";
    const toastMessage = initialData ? "Product updated." : "Product created.";
    const action = initialData ? "Save changes" : "Create";

    const defaultValues = initialData ? {
        ...initialData,
        price: parseFloat(String(initialData?.price)),
      } : {
        name: '',
        images: [],
        price: 0,
        categoryId: '',
        subcategoryId: '',
        description: '',
        isFeatured: false,
        isArchived: false,
        isLocked: false,
      }

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    const watchCategories = form.watch("categoryId");
    
    const onSubmit = async (data: ProductFormValues) => {
        console.log(JSON.stringify(data))
        try {
            setLoading(true);
            
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/products`, data);
            }
            router.push(`/${params.storeId}/products`)
            router.refresh();
            toast.success(toastMessage);
        } catch (error) {
            if (error instanceof Error && error.message.includes("409")) {
                router.push(`/${params.storeId}/products`)
                router.refresh();
                toast.error("Locked items can't be modified.");
            } else {
                toast.error("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
            router.push(`/${params.storeId}/products`);
            router.refresh();
            toast.success("Product deleted.");
        } catch (error) {
            if (error instanceof Error && error.message.includes("409")) {
                router.push(`/${params.storeId}/products`)
                router.refresh();
                toast.error("Locked items can't be modified.");
            } else {
                toast.error("Something went wrong.");
            }
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => {setOpen(true)}}
                    >
                        <Trash className="h-4 w-4"/>
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField
                        control={form.control}
                        name="images"
                        
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <ImageUpload 
                                        
                                        value={field.value.map((image) => image.url)}
                                        disabled={loading}
                                        onChange={(url) => field.onChange([...field.value, { url }])}
                                        onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                    />
                    
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Product name" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder="0.00" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea disabled={loading} rows={3} placeholder="Write description here" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select 
                                        disabled={loading} 
                                        onValueChange={(e) => {
                                            form.setValue("categoryId", e)
                                            form.setValue("subcategoryId", "")
                                        }}
                                        value={field.value} 
                                        defaultValue={field.value}
                                        
                                    >
                                        <FormControl>
                                            <SelectTrigger >
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a category"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent
                                            onSelect={() => form.setValue("subcategoryId", "")}
                                        >
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}>
                                                    
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="subcategoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subcategory</FormLabel>
                                    <Select 
                                        disabled={loading || (watchCategories === '') } 
                                        onValueChange={field.onChange} 
                                        value={field.value} 
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger >
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a subcategory"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {subcategories.filter(s => s.categoryId === watchCategories).map((subcategory) => 
                                            
                                                <SelectItem
                                                    key={subcategory.id}
                                                    value={subcategory.id}>
                                                    {subcategory.name}
                                                </SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="sizeId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Size</FormLabel>
                                    <Select 
                                        disabled={loading} 
                                        onValueChange={field.onChange} 
                                        value={field.value ? field.value : undefined} 
                                        
                                    >
                                        <FormControl>
                                            <SelectTrigger >
                                                <SelectValue
                                                    
                                                    placeholder="Select a size"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem
                                                    key={"blank_size"}
                                                    value={""}>
                                                    <div className="h-[18px]"></div>
                                            </SelectItem>
                                            {sizes.map((size) => (
                                                <SelectItem
                                                    key={size.id}
                                                    value={size.id}>
                                                    {size.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="colorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <Select 
                                        disabled={loading} 
                                        onValueChange={field.onChange} 
                                        value={field.value ? field.value : undefined} 
                                        
                                    >
                                        <FormControl>
                                            <SelectTrigger >
                                                <SelectValue
                                                    
                                                    placeholder="Select a color"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem
                                                    key={"blank_color"}
                                                    value={""}>
                                                    <div className="h-[18px]"></div>
                                            </SelectItem>
                                            {colors.map((color) => (
                                                <SelectItem
                                                    key={color.id}
                                                    value={color.id}>
                                                    {color.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox 
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Featured
                                        </FormLabel>
                                        <FormDescription>
                                            This product will appear on the home page
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isArchived"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox 
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Archived
                                        </FormLabel>
                                        <FormDescription>
                                            This product will not appear anywhere in the store
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isLocked"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox 
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Locked
                                        </FormLabel>
                                        <FormDescription>
                                            This product can't be modified
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};

