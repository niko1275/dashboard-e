
import {prisma} from '@/lib/prisma'
import { NextResponse } from "next/server";


export async function GET() {

    try{
        const productos = await prisma.product.findMany()
        return NextResponse.json({productos}, {
            headers: {
              'Access-Control-Allow-Origin': '*', // Reemplaza con el dominio permitido en producción
              'Access-Control-Allow-Methods': 'GET', // Agrega otros métodos según sea necesario
            },
          });
    }
    catch(error){
        console.log(error)
    }
}