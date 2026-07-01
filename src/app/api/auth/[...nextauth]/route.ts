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
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) {
                const normalized = url === "/" ? "/dashboard" : url;
                if (normalized === "/login" || normalized === "/") {
                    return `${baseUrl}/dashboard`;
                }
                return new URL(normalized, baseUrl).toString();
            }
            if (new URL(url).origin === baseUrl) {
                return url;
            }
            return `${baseUrl}/dashboard`;
        },
        async signIn ({user, account}){
            if(!user.email?.endsWith("@gmail.com")){
                return false;
            }
            await dbConnect();
            try {
                const existingUser = await UserModel.findOne({email:user.email});
                if(!existingUser){
                    await UserModel.create({
                        username:user.name ?? '',
                        email:user.email,
                        googleID:account?.providerAccountId,
                        avatar:user.image ??'',
                    });
                }
                return true;
            } catch(error) {
                console.error("Sign in Error : " , error);
                return false;
            }
        }, 
        // Changing and including jwt callback to the codebase to store user id in the jwt for faster retrival 
        async jwt({token , user}){
           if(user&& user.email ){
            await dbConnect();
            const dbUser =await UserModel.findOne({
                email:user.email,
            });
            if(dbUser){
                token.id = dbUser._id.toString();
            }
           }
           return token;
        },
        async session({session, token}){
        if(session.user){
            session.user.id = token.id as string;
        }
        return session;
        },

    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/login",
    },
    session:{
        strategy:"jwt"
    },
})
export {handler as GET, handler as POST};