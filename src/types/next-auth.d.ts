import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth"{
    // We are updating Session module in next-auth and adding user which contain id , name , email, image so that we can use it in our app , and we can use this session by useSession() component provided by next-auth.
    interface Session{
        user:{
            id:string,
            name?:string | null;
            email?:string | null;
            image?: string | null;
        } & DefaultSession["user"];
    }
}
declare module "next-auth/jwt"{
    interface JWT{
        id?:string;
    }
}