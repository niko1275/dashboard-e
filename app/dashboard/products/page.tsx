"use server"

import {Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { fetchProducts } from '@/lib/data';
import Search from '@/components/search/Search';
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
import { deleteProduct } from '@/actions/product';
import PaginationC from '@/components/pagination/Pagination';


export default async function Page({
    searchParams
}:{ 
    searchParams?: {
        query?:string
        page?:string
    }
}) {

  const query = searchParams?.query || '';
  const page = Number(searchParams?.page) || 1;

  const { products,totalPages} = await fetchProducts(query,page);
    
    return (
        <div className='flex mt-10 bg-slate-800 flex-col '>
            <div className=' flex justify-between'>
            
                <Search placeholder='Buscar Producto'/>


                <Link href='/dashboard/products/add'>
                    <button className='bg-sky-600 rounded p-3 m-2 text-white font-medium'>
                        Add new product
                    </button>
                </Link>
            </div>

            <Table className='text-white'>
        
            <TableHeader>
            <TableRow>
                <TableHead className="">Titulo</TableHead>
                <TableHead className="">Descripcion</TableHead>
                <TableHead className="">precio</TableHead>
                <TableHead className="">creacion</TableHead>
                <TableHead className="">Stock</TableHead>
                <TableHead className="">Action</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody className='border-b-none'>
                {
                    products?.map((Item)=>(
                        <TableRow key={Item.id} className='border-b-0'>
                    <TableCell className="flex ">
                        <Avatar>
                        <AvatarImage src={Item.imgUrl ?? ''} />
                        <AvatarFallback>CN</AvatarFallback>
                        </Avatar> 
                        <p className='ml-2 mt-2'>{Item.title}</p>
                    </TableCell>
                    <TableCell>{Item.desc}</TableCell>
                    <TableCell className="">${Item.price}</TableCell>
                    <TableCell>{Item.stock}</TableCell>
                    <TableCell className="">{Item.stock}</TableCell>
                        
                    <TableCell className="">
                    <AlertDialog>
                            <AlertDialogTrigger className='bg-slate-600 p-2 mr-2 rounded'>Borrar</AlertDialogTrigger>
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
                                <form action={deleteProduct}>
                                    <AlertDialogAction className='bg-red-400'>
                                        <input type="hidden" name='id' value={Item.id} />
                                        <input type="hidden" name='imgUrl' value={Item.imgUrl ?? ''} />
                                        <button type='submit'>Eliminar</button>
                                    </AlertDialogAction>
                                </form>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                        <Link href={`/dashboard/products/${Item.id}`}>
                        <button className='bg-green-600 p-2 font-bold rounded'>
                            Revisar
                        </button>
                        </Link>
                    </TableCell>
                </TableRow>
                    ))
                }
                
            </TableBody>
        </Table>

        <PaginationC count={totalPages || 0}/>
      </div>
    )
}


