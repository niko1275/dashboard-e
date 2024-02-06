"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
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
import Image from 'next/image';
import { updateUser } from '@/actions/users';


interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    img: string | null;
    isAdmin: boolean;
    isActive: boolean;
    phone: string | null;
    address: string | null;
    createdAt: Date;
    updatedAt: Date;
}

interface UserFormProps {
    user: User | null;
}

const formSchema = z.object({
    id:z.string(),
    username: z.string(),
    email: z.string(),
    img:z.string(),
    isAdmin:z.boolean(),
    isActive:z.boolean(),
    phone:z.string(),
    address:z.string(),
    
})



const UserForm: React.FC<UserFormProps> = ({ user }) => {
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
          id:user?.id,
          username:user?.username,
          email:user?.email,
          img:user?.img ?? '',
          isAdmin:user?.isAdmin,
          isActive: user?.isActive ?? false,
          phone:user?.phone?? '',
          address: user?.address ?? ''
        }
      })

    const { handleSubmit, formState: { errors } } = form;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
     
      try {
        const resp= await updateUser(values)
        toast(({
          variant:'default',
          title:'Usuario Editado Correctamente'
        }))
        console.log('agregado',resp)
        
      } catch (error) {
        toast({
          variant:'destructive',
          title:'Error al editar el usuario'
        })
        console.error("Error adding user:", error);
      }
    }

    return (
        <div className='mt-5 rounded p-5 w-full flex flex-row gap-10'>

            <div className="w-1/4 flex-1 max-h-max p-10 rounded-10 font-bold text-textSoft bg-slate-800">
                <div className='w-full h-[300px] bg-red-400 relative rounded  '>
               
                </div>
                {user?.username}
            </div>
            <div className='w-3/4 bg-slate-800 p-3'>

            
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField 
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                      <FormItem className=''>
                      <FormLabel className="text-white">Usuario</FormLabel>
                      <FormControl className="bg-slate-900 text-white border-none p-10">
                          <Input placeholder="Usuario" className="text-white" {...field} />
                      </FormControl>
                      <FormMessage>
                      </FormMessage>
                      </FormItem>
                  )}
                  />

                  <FormField 
                  control={form.control}
                  name="email"

                  render={({ field }) => (
                      <FormItem className=''>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl className="bg-slate-900 text-white border-none p-10">
                          <Input placeholder="Usuario" className="text-white" {...field} />
                      </FormControl>
                      <FormMessage>
                      </FormMessage>
                      </FormItem>
                  )}
                  />
      
                  <FormField 
                  control={form.control}
                  name="phone"

                  render={({ field }) => (
                      <FormItem className=''>
                      <FormLabel className="text-white ">Numero</FormLabel>
                      <FormControl className="bg-slate-900 text-white border-none p-10">
                          <Input placeholder="Usuario" className="text-white"  {...field} />
                      </FormControl>
                      <FormMessage>
                      </FormMessage>
                      </FormItem>
                  )}
                  />


                  <FormField
                control={form.control}
                name="isAdmin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Administrador</FormLabel>
                    <FormControl className="">
                      <Select
                        onValueChange={(value) => field.onChange(value === 'true')}
                        value={field.value ? 'true' : 'false'}
                      >
                        <SelectTrigger className="bg-slate-900 p-10 text-white border-none">
                          <SelectValue placeholder="admin" />
                        </SelectTrigger>
                        <SelectContent >
                          <SelectItem value="true">Si</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


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
                        <SelectContent >
                          <SelectItem value="true">Si</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                  <FormItem className="mt- ">
                  <FormLabel className="text-white">Direccion</FormLabel>
                  <FormControl className="p-20 bg-slate-900 text-white">
                      <Input placeholder="address" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
                <Button className="mt-10" type="submit">Submit</Button>
              
              </form>
            </Form>
            </div>

            
        </div>
       
    );
};

export default UserForm;