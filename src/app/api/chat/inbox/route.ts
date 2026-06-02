import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { UserModel } from "@/models/user.model";
import { ChatModel } from "@/models/chat.model";
import { ServiceModel } from "@/models/service.model";
export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET });
        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        await dbConnect();
        const user = await UserModel.findOne({ email: token.email });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        const chats = await ChatModel.find({
            participants: { $in: [user._id] }
        }).populate("participants", "username avatar email").populate("serviceId", "title price").sort({ updatedAt: -1 });

        return NextResponse.json({ success: true, data: chats }, { status: 200 });

    } catch (error) {
        console.error("Inbox error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}