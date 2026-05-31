import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserModel } from "@/models/user.model";
import dbConnect from "@/lib/db";
import { ServiceModel } from "@/models/service.model";

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({
            req: req,
            secret: process.env.NEXTAUTH_SECRET
        })
        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unautherized User"
                }, { status: 401 }
            );
        }
        const { title, description, price } = await req.json();
        if (!title || !description || !price) {
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            }, { status: 400 });
        }

       await  dbConnect();
        const user = await UserModel.findOne({ email: token.email });
        if (!user) {
            return NextResponse.json({ success: false, message: "No user found" }, { status: 404 })
        };

        const service = await ServiceModel.create({
            title, description, price, serviceby: user._id, isActive: true
        });
        await UserModel.findByIdAndUpdate(user._id, { $push: { providedServices: service._id } });

        return NextResponse.json({
            message: "Service created Successfully",
            success: true
        }, { status: 200 })

    } catch (error) {
        console.error("Create service error: ", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const services = await ServiceModel.find({ isActive: true }).populate("serviceby", "username  avatar email").sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: services
        }, { status: 200 });
    } catch (error) {
        console.error("Get services error: ", error);
        return NextResponse.json({
            success: false, message: "Internal server error"
        }, { status: 500 })

    }

}