"use server"

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface AddUserFormData {

    username: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    isAdmin: boolean;
    isActive: boolean;
  }


interface UpdateUserFormData {
  id: string;
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  isAdmin?: boolean;
  isActive?: boolean;
}

  
export const addUser = async (formData: AddUserFormData,img:string,imgUrl:string): Promise<void> => {
    const { username, email, password,phone , address, isAdmin, isActive } = formData;
  
    try {
      // Connect to the database
      await prisma.$connect();
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user using Prisma
      await prisma.usuario.create({
        data: {
          img,
          imgUrl,
          username,
          email,
          password: hashedPassword,
          phone,
          address,
          isAdmin,
          isActive,
        },
      });
     
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create user!");
    } finally {
      await prisma.$disconnect();
    }

    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
  };



  export const updateUser = async (formData: UpdateUserFormData): Promise<void> => {
    const { id, username, email, password, phone, address, isAdmin, isActive } = formData;
    console.log('llega?')
    if (!id) {
      throw new Error("User ID is missing");
    }
  
    try {
      
  
      const updateFields: UpdateUserFormData = {
        id,
        username,
        email,
        password,
        phone,
        address,
        isAdmin,
        isActive,
      };
  
      // // Eliminar campos vacíos o indefinidos
      // Object.keys(updateFields).forEach(
      //   (key) =>
      //     (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
      // );
  
      // Actualizar el usuario utilizando Prisma
      await prisma.usuario.update({
        where: {
          id: id,
        },
        data: updateFields,
      });
    } catch (err) {
      console.error(err);
      throw new Error("Failed to update user!");
    }
  
    // Suponiendo que tienes una función para redireccionar y revalidar
    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
  };



  export const deleteUser = async (formData: any) => {
    
    try {
      const { id } = Object.fromEntries(formData);
      
      await prisma.usuario.delete({
        where: {
          id // Asegúrate de convertir id a número si es necesario
        }
      });
  
      console.log(`User with id ${id} has been deleted successfully.`);
      revalidatePath('/dashboard/users')

    } catch (err) {
      console.error(err);
      throw new Error("Failed to delete user!");
    } finally {
      await prisma.$disconnect();
    }
  };