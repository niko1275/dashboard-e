"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'
import {
    Select, SelectContent, SelectGroup, SelectItem, SelectLabel,
    SelectScrollDownButton, SelectScrollUpButton, SelectSeparator,
    SelectTrigger, SelectValue
  } from "@/components/ui/select"
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useForm } from 'react-hook-form';
import React from 'react';
import { fetchProduct } from '@/data/product';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { updateProduct } from '@/actions/product';
import { toast } from 'sonner';
import { useToast } from "@/components/ui/use-toast"
import Image from 'next/image';


interface Product {
    id: number;
    title: string;
    desc: string;
    price: number;
    stock: number;
    imgUrl?:string | null ;
    img?: string | null;
    color?: string | null;
    size?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }

interface ProductProps {
    product: Product | null
}

const formSchema = z.object({
    id:z.number(),
    title: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    price: z.coerce.number().min(1),
  
    stock: z.coerce.number().min(1),
  
    color: z.string(),
    
    size: z.string(),
    
    desc:z.string(),
  
  
  })



const ProductEditForm:React.FC<ProductProps> =  ({product})=> {

    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>> ({
        resolver: zodResolver(formSchema),
        defaultValues:{
          id:product?.id,
          title:product?.title,
          price:product?.price,
          stock:product?.stock,
          color:product?.color ?? '',
          size:product?.size ?? '',
          desc:product?.desc
          


        }
    })

    const { handleSubmit, formState: { errors } } = form;

    const onSubmit = async (values:z.infer<typeof formSchema>)  => {

        try{
            await updateProduct(values)
            toast(({
                title:'Producto Modificado'
            }))
        }
        catch{
            toast(({
                title:'error al modificar el producto'
            }))
        }
      
    }

    return(

        <div className='mt-5 rounded p-5 w-full flex flex-row gap-10 h-full'>
            <div className="w-1/4 flex-1 max-h-max p-10 rounded-10 font-bold text-textSoft bg-slate-800">
                <div className='w-full h-[300px]  relative rounded  '>
                    <Image src={product?.imgUrl || ''} alt='img' width={500} height={100} />
                </div>
                <p className='text-white'>
                    {product?.title}
                </p>
              
            </div>
            <div className='w-3/4 bg-slate-800 p-3 flex flex-col'>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="   text-black w-full ">
                <div className=" flex justify-between gap-24 "> 
                    <div className="w-full">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">titulo</FormLabel>
                            <FormControl className="p-10 bg-slate-900 text-white border-none">
                            <Input placeholder="title"  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </div>  
                    <div className="w-full">

                    <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-white">precio</FormLabel>
                        <FormControl className="bg-slate-900 text-white p-10 border-none">
                        <Input type="number" placeholder="precio" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                </div>
                
                <div className="flex justify-between w-full gap-24 mt-4">
                    <div className="w-full">     
                <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-white">Stock</FormLabel>
                        <FormControl className="bg-slate-900 p-10 text-white border-none">
                        <Input type="number"  min={100} placeholder="Stock"  {...field} onChange={e=>field.onChange(e.target.value)} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                    </div>

                    <div className="w-full">

                    
                    <FormField
                    control={form.control}
                    name="desc"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-white">Descripcion</FormLabel>
                        <FormControl className="bg-slate-900 p-10 text-white border-none">
                        <Input placeholder="talla"  {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                </div>

                <div className="flex justify-between gap-24 mt-4">
                <div className=" w-full">    
                <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-white">Color</FormLabel>
                        <FormControl className="bg-slate-900 text-white p-10 border-none">
                            <Input type="text" placeholder="Precio"  {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                </div>
                <div className="w-full ">
                <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-white">Talla</FormLabel>
                        <FormControl>
                        <Select
                        onValueChange={field.onChange} defaultValue={field.value}
                        
                        >
                        <SelectTrigger className="bg-slate-900 p-10 text-white border-none">
                            <SelectValue placeholder="Seleccionar talla" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectItem value="s">S</SelectItem>
                            <SelectItem value="m">M</SelectItem>
                            <SelectItem value="l">L</SelectItem>
                            <SelectItem value="xl">XL</SelectItem>
                        </SelectContent>
                        </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                </div>
                </div>

            

                <Button className="mt-10" type="submit">Submit</Button>
                </form>
            
            </Form>
        </div>
    </div>
    )
}


export default ProductEditForm