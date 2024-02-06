"use server"

import UserForm from "@/components/form/UserForm";
import { getUserById } from "@/data/user";

interface PageParams {
  id:string
}

export default async function Page({ params }: { params: PageParams }) {
  const {id} = params

  const user = await getUserById(id)


  return (
    <div>
      <UserForm user={user}/>
    </div>
  );
}