import { Input } from "@/components/ui/input"
import { Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,useFormField } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { ProfileForm } from "@/components/form/useform"


export default function page() {

    
    return(
        <>
            <div className="flex bg-slate-800 mt-10 p-4 text-white rounded-xl">
                <ProfileForm/>
            </div>
        </>
    )
}