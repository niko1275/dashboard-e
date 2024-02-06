
import { addProduct } from '@/actions/product'
import {ProductForm} from '@/components/form/ProductForm'

export default function AddProductPage () {

    return (
        <div className='bg-slate-800 p-10 rounded-xl mt-10'>
            <ProductForm/>
        </div>
    )
}