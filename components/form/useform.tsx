"use client"

import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
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



import { Input } from "@/components/ui/input"
import { addUser } from "@/actions/users"
import { useState } from "react"
import { handleFileUpload } from "@/lib/utils"


const formSchema = z.object({
  username: z.string().min(2, {
    message: "El nombre de usuario debe tener al menos 2 caracteres.",
  }),
  password: z
    .string()
    .refine(value => /[A-Z]/.test(value), {
      message: "Debe contener una mayusculas",
    })
    .refine(value => /[a-z]/.test(value), {
      message: "Debe contener una minuscula",
    })
    .refine(value => /\d/.test(value), {
      message: "Debe contener al menos un número"
    }),
  isAdmin: z.boolean(),

  isActive: z.boolean(),

  address: z.string(),

  phone: z.string(),

  email: z.string().email({
    message: "Email invalido"
  }),


})

export function ProfileForm() {
  
  const { toast } = useToast()
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  const { handleSubmit, formState: { errors } } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
    try {
      if (file){
        const fileUrl = await handleFileUpload(file);
        if(fileUrl){
          const response = await addUser(values,file.name,fileUrl);
          toast(({
            variant:'default',
            title:'Usuario Agregado Correctamente'
          }))
          console.log("User added successfully:", response);
        }
      }
    } catch (error) {
      toast({
        variant:'destructive',
        title:'Error al agregar el usuario'
      })
      console.error("Error adding user:", error);
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

    <Form {...form}   >
      
   
      <form onSubmit={form.handleSubmit(onSubmit)} className="   text-black w-full ">
        <div className=" flex justify-between gap-24 ">
          <div className="w-full">
            <FormField
              control={form.control}
              name="username"

              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Usuario</FormLabel>
                  <FormControl className="bg-slate-900 text-white border-none p-10">
                    <Input placeholder="Usuario" className="text-white" {...field} />
                  </FormControl>
                  <FormMessage>
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white ">Email</FormLabel>
                  <FormControl className="p-10 bg-slate-900 border-none">
                    <Input placeholder="Email" className="text-white" {...field} />
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Contraseña</FormLabel>
                  <FormControl className="bg-slate-900 p-10 border-none">
                    <Input className="text-white" type="password" placeholder="Contraseña" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">


            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Phone</FormLabel>
                  <FormControl className="border-none p-10 bg-slate-900 ">
                    <Input className="text-white" placeholder="Numero" {...field} />
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
              name="isAdmin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">admin</FormLabel>
                  <FormControl className="">
                    <Select
                      onValueChange={(value) => field.onChange(value === 'true')}
                      value={field.value ? 'true' : 'false'}
                    >
                      <SelectTrigger className="bg-slate-900 p-10 text-white border-none">
                        <SelectValue placeholder="admin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Si</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <div className="w-full ">
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Activo</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value === 'true')}
                      value={field.value ? 'true' : 'false'}
                    >
                      <SelectTrigger className="bg-slate-900 p-10 border-none text-white">
                        <SelectValue placeholder="active" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Si</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="mt-4 ">
              <FormLabel className="text-white">Direccion</FormLabel>
              <FormControl className="p-20 bg-slate-900 text-white">
                <Input placeholder="address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
