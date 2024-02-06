import { prisma } from "@/lib/prisma";

export const getUserByEmail = async (email:string) => {
    try{
        const user = await prisma.user.findUnique({where:{email}})

        return user
    }
    catch{
        return null
    }
}

export const getUserById = async (id: string) => {
    try {
      const user = await prisma.usuario.findUnique({ where: { id } });
  
      return user;
    } catch {
      return null;
    }
  };


  export const fetchUsers = async (q: string, page: number) => {
    const regex = new RegExp(q, 'i');
    console.log(q)
    const ITEM_PER_PAGE = 8;
  
    try {
      const count = await prisma.usuario.count({
        where: {
          username: {
            contains: q, 
          },
        },
      });
      const totalPages = Math.ceil(count / ITEM_PER_PAGE);
      const users = await prisma.usuario.findMany({
        where: {
          username: {
            contains: q,
          },
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (page - 1),
      });
  
      return { count, users,totalPages };
    } catch (err) {
      console.error(err);
      throw new Error('Failed to fetch users!');
    } finally {
      await prisma.$disconnect(); 
    }
  };