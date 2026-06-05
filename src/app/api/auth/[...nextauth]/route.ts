import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import dbConnect from "@/lib/db";
import { UserModel } from "@/models/user.model";
const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID || '',
            clientSecret:process.env.GOOGLE_CLIENT_SECRET || ''
        })
    ],
    callbacks : {
        async signIn ({user, account}){
            if(!user.email?.endsWith("@gmail.com")){
                return false;
            }
            await dbConnect();
            try {
                const existingUser = await UserModel.findOne({email:user.email});
                if(!existingUser){
                    await UserModel.create({
                        username:user.name || '',
                        email:user.email,
                        googleID:account?.providerAccountId,
                        avatar:user.image || '',
                    });
                }
                return true;
            } catch {
                return false;
            }

        }, 
        async session({session, token}){
            if(session.user){
                await dbConnect();
                const dbUser = await UserModel.findOne({email:token.email});
                if(dbUser){
                    session.user.id = dbUser._id.toString();
                    // console.log("Setting user id" , session.user.id); just for debug purpose.
                }
            }
            return session;
        },

    },
    pages:{
        signIn:"/login",
    },
    session:{
        strategy:"jwt"
    },
})
export {handler as GET, handler as POST};