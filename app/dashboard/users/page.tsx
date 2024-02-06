"use server"

import {Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { fetchUsers } from '@/data/user';
import PaginationC from '@/components/pagination/Pagination';
import Search from '@/components/search/Search';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { deleteUser } from '@/actions/users';


export default async function Page({searchParams}:{
    searchParams?:{
        query?:string
        page?:string
    }
}) {

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const {users,totalPages} = await fetchUsers(query,currentPage)
   
    return (
        <div className='flex mt-10 bg-slate-800 flex-col '>
            <div className=' flex justify-between'>
                <Search placeholder='Buscar usuario'/>

                <Link href='/dashboard/users/add'>
                    <button className='bg-sky-600 rounded p-3 m-2 text-white font-medium'>
                        Add new Users
                    </button>
                </Link>  
            </div>
            <Table className='text-white'>
         
            <TableHeader>
            <TableRow>
                <TableHead className="">Name</TableHead>
                <TableHead className="">Email</TableHead>
                <TableHead className="">Created At</TableHead>
                <TableHead className="">Role</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead className="">Action</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody className=''>
                {
                users.map((user) => (
                    <TableRow key={user.id} className='border-b-0'>
                        <TableCell className="font-medium flex flex-row ">
                            <Avatar>
                            <AvatarImage src={user.imgUrl} />
                            <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className='mt-2 ml-2'>{user.username}</p>
                            
                        </TableCell>
                        <TableCell>{user.email}</TableCell> 
                        <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>                 
                        <TableCell>{user.isAdmin? 'admin' :'usuario'}</TableCell>
                        <TableCell ><p className={user.isActive? 'bg-red-600 max-w-min p-2 rounded' : 'bg-green-500 max-w-min p-1 rounded '}>{user.isActive?'activo' : 'inactivo'}</p></TableCell>

                        <TableCell className='gap-4'>
                            <Link href={`/dashboard/users/${user.id}`}>
                                <Button className='bg-green-900'>Revisar</Button> 
                            </Link>
                            <AlertDialog>
                            <AlertDialogTrigger className='bg-slate-600 p-2 ml-2 rounded font-bold'>Borrar</AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta.
                                    y eliminar sus datos de nuestros servidores.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <form action={deleteUser}>
                                    
                                    <AlertDialogAction className='bg-red-400'>
                                        <input type="hidden" name='id' value={user.id} />
                                        <button type='submit'>Delete</button>
                                    </AlertDialogAction>
                                </form>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                        
                    </TableRow>
                ))
                }
            </TableBody>
        </Table>
        <PaginationC count={totalPages}/>
      </div>
    )
}