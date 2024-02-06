"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";

import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEYY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

interface Product {
    title:string,
    price:number,
    stock:number,
    size:string
    color:string,
    desc:string
}

interface UpdateProduct {
  id:number
  title:string,
  price:number,
  stock:number,
  size:string
  color:string,
  desc:string
}

export const  addProduct = async (formData:Product,img:string,imgUrl:string) =>{

    const {title,price,stock,desc,color,size} = formData

    try{
        await prisma.product.create({
            data:{
                img,
                imgUrl,
                title,
                price,
                stock,
                desc,
                color,
                size
            }
        })

        
    }
    catch (err) {
        console.error(err);
        throw new Error("Failed to create Product!");
      } finally {
        // Disconnect from the database
        await prisma.$disconnect();
      }

      revalidatePath("/dashboard/products");
      redirect("/dashboard/products");
      

}


export const updateProduct = async (formData:UpdateProduct) => {
    const {id,title,price,stock,desc,color,size} = formData
  
    try {
  
      const updateFields = {
        title,
        desc,
        price,
        stock,
        color,
        size,
      };
  
    //   // Eliminar campos vacíos o indefinidos
    //   Object.keys(updateFields).forEach(
    //     (key) =>
    //       (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
    //   );
  
      // Actualizar el producto utilizando Prisma
      await prisma.product.update({
        where: {
          id 
        },
        data: updateFields,
      });
    } catch (err) {
      console.error(err);
      throw new Error("Failed to update product!");
    }

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
  };



  export const deleteProduct = async (formData: any): Promise<void> => {
    try {
      const { id,imgUrl } = Object.fromEntries(formData);
      // if(imgUrl){
        try {
          const parts = imgUrl.split("/");
          const key = parts[parts.length - 1];
          const bucketParams = {Bucket: process.env.AWS_BUCKET_NAME!, Key: key}
          await s3Client.send(new DeleteObjectCommand(bucketParams));
          console.log(`Object deleted successfully: ${imgUrl}`);
        } catch (error: any) { // Use ': any' for type assertion
          console.error(`Error deleting object: ${error.message}`);
        }
        await prisma.product.delete({
          where: {
            id: parseInt(id) 
          }
        });
      
     
      revalidatePath("/dashboard/products");
    } catch (err) {
      console.log(err);
      throw new Error("Failed to delete product!");
    }
  };





  