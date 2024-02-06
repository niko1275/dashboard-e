"use server"

import ProductEditForm from "@/components/form/ProductEditForm"
import { fetchProduct } from "@/data/product"


interface PageParams {
  id:number
}

export default async function page({ params }: { params: PageParams }){
  const {id} = params
  const product = await fetchProduct(id)

  return(
    <div className="min-h-full">
        <ProductEditForm product={product}/>
    </div>
  )
}