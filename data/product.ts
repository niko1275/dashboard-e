import {  Product } from '@prisma/client';
import { prisma } from "@/lib/prisma";


export const fetchProduct = async (id: number): Promise<Product | null> => {

  try {
    const productId = parseInt(id.toString(), 10);
    const product = await prisma.product.findUnique({where:{id:productId }});
    return product; 
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch product!');
  } finally {
    await prisma.$disconnect();
  }
};
