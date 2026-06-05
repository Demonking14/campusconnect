import { NextRequest , NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/db";
import { UserModel } from "@/models/user.model";
export async function GET(request:NextRequest) {
    try {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET
        });
        if(!token){
            return NextResponse.json(
                {success:false, message:"Unauthorized"},
                {status:401}
            )
        }
        await dbConnect();
        const user = await UserModel.findOne({email:token.email}).populate("activeServices").populate("providedServices");

        if(!user){
            return NextResponse.json(
                {success: false, message:"User not found"},
                {status:404}
            );
        }
        return NextResponse.json({
            success:true,
            data : {
                activeServices:user.activeServices,
                providedServices:user.providedServices,
            },
        });
    } catch {
        return NextResponse.json(
            {success: false,  message: "Internal Server error"}, {status : 500}
        )
        
    }
    
}