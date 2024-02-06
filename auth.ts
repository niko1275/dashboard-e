import NextAuth from "next-auth";
import GitHub  from 'next-auth/providers/github'
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma";

export const {
    handlers: {GET,POST},
    auth,
    signIn,
    signOut

}= NextAuth({
    callbacks:{
      
       
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
})