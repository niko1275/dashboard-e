

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

  


  export const fetchProducts = async (q: string, page: number) => {
    console.log(q);
  
    const ITEM_PER_PAGE = 8;
    
    try {
      const count = await prisma.product.count({
        where: {
          title: {
            contains: q,
            mode: 'insensitive',
          },
        },
      });
      const totalPages = Math.ceil(count / ITEM_PER_PAGE);

      const products = await prisma.product.findMany({
        where: {
          title: {
            contains: q,
            mode: 'insensitive',
          },
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (page - 1),
      });
  
      return { count, products,totalPages };
    } catch (err) {
      return {message: 'Error al obtener los productos'}
    } finally {
      await prisma.$disconnect();
    }
  };



export const cards = [
{
    id: 1,
    title: "Total usuarios",
    number: 10.928,
    change: 12,
},
{
    id: 2,
    title: "Stock",
    number: 8.236,
    change: -4,
},
{
    id: 3,
    title: "Ganancia",
    number: 6.642,
    change: 18,
},
];
  