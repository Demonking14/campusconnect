import { ChatModel } from "@/models/chat.model";
import { UserModel } from "@/models/user.model";
import { NextRequest , NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { getToken } from "next-auth/jwt";


export async function POST(request:NextRequest) {
    try {
        const token = await getToken({req:request, secret:process.env.NEXTAUTH_SECRET});
        if(!token){
            return NextResponse.json({success:false, message:"Unauthorized"}, {status:401});
        }

        const {roomId, serviceId, msg, receiverId} = await request.json();

        await dbConnect();
        const user = await UserModel.findOne({email:token.email});
        if(!user){
            return NextResponse.json({success:false , message:"User not found"} ,{status:404});
        };
        let chat = await ChatModel.findOne({roomId});
        if(!chat){
            chat = await ChatModel.create({
                roomId,
                serviceId,
                participants:[user._id, receiverId],
                msg:[]
            });
        }
        chat.msg.push({
            sender:user._id,
            sendername:user.username,
            avatar:user.avatar,
            msg,
            timestamp:new Date()
        });
        await chat.save();
        return NextResponse.json({success:true} ,{status:200});
    } catch (error) {
        console.error("Chat sae error: ", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function GET(request:NextRequest){
    try {
        const token = await getToken({req:request, secret:process.env.NEXTAUTH_SECRET});
        if(!token){
            return NextResponse.json({success:false, message:"Unauthorized"} , {status:401});
        };
        const {searchParams } = new URL(request.url);
        const roomId = searchParams.get("roomId");

        if(!roomId){
            return NextResponse.json({success:false , message:"Room-ID required"} , {status:400});
        }
        await dbConnect();

        const chat = await ChatModel.findOne({roomId});
        return NextResponse.json({success:true , msg: chat?.msg || []});
    } catch (error) {
        console.error("Chat fetch error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}