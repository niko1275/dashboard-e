"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import * as z from "zod"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select,SelectContent,SelectGroup,SelectItem,SelectLabel,
SelectScrollDownButton,SelectScrollUpButton,SelectSeparator,
SelectTrigger,SelectValue } from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { addProduct } from "@/actions/product"
import { useState } from "react"
import { handleFileUpload } from "@/lib/utils"


const formSchema = z.object({

  title: z.string(),

  price: z.coerce.number().min(1),

  stock: z.coerce.number().min(1),

  color: z.string(),
  
  size: z.string(),
  
  desc:z.string(),


})



export function ProductForm() {
    const { toast } = useToast()
    const [file, setFile] = useState<File | undefined>(undefined);
    const [fileUrl, setFileUrl] = useState<string | undefined>(undefined)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>> ({
        resolver: zodResolver(formSchema),
 
    })
    const { handleSubmit, formState: { errors } } = form;
    
 
    const onSubmit = async (values:z.infer<typeof formSchema>)  => {
      
      try {
        if (file) {
          const fileUrl = await handleFileUpload(file);
          if (fileUrl) {
            await addProduct(values, file.name, fileUrl);
            console.log('Product added successfully.');
            toast({
              title: 'Producto Agregado Correctamente',
            });
          }
        }
      } catch (error) {
        console.error('An error occurred:', error);
        toast({
          title: 'Error al agregar el producto',
        });
      }
    
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null
      if (file !== null) {
        setFile(file);
      } else {
        setFile(undefined);
      }
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      if (file) {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      } else {
        setPreviewUrl(null)
      }
    }
  

    

  return (
    
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
                      <Input placeholder="title" {...field} />
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
                  <Input type="number"  placeholder="Stock"  {...field} onChange={e=>field.onChange(e.target.value)} />
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
                  <Input placeholder="talla" {...field} />
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
                    <Input type="text" placeholder="Precio" {...field} />
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
                  <SelectContent>
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

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture" className="text-white mt-4">Picture</Label>
          <Input id="picture" name="media"
                type="file"
                accept="image/jpeg,image/png,video/mp4,video/quicktime"
                onChange={handleFileChange} />
        </div>

          <Button className="mt-10" type="submit">Submit</Button>
        </form>
    
    </Form>
  )
}
