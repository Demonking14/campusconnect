import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { ServiceModel } from "@/models/service.model";
import { getToken } from "next-auth/jwt";
import { UserModel } from "@/models/user.model";

export async function GET(request: NextRequest, { params }: {params:Promise<{id:string}>}) {
    try {
        await dbConnect();
        const service = await ServiceModel.findById((await params).id).populate("serviceby", "username email avatar");

        if (!service) {
            return NextResponse.json({
                success: false,
                message: "Service not found"
            }, { status: 404 })
        }
        if (!service.isActive) {
            return NextResponse.json({
                success: false,
                message: "Service is no longer available"
            }, { status: 404 })
        }
        return NextResponse.json({
            success: true,
            data: service
        }, { status: 200 });
    } catch (error) {
        console.error("Get service error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }

}

export async function DELETE(request:NextRequest , { params }: {params:Promise<{id:string}>}){
    try {
        const token = await getToken({
            req:request,
            secret:process.env.NEXTAUTH_SECRET
        })
        if(!token){
            return NextResponse.json({success:false , message:"Unauthorized user" } , {status:404})
        }
        await dbConnect();
        const user = await UserModel.findOne({email:token.email})
        if(!user){
            return NextResponse.json({
                success:false,
                message:"User not found"
            } , {status:404})
        }
      const service = await ServiceModel.findById((await params).id);
      if(!service){
        return NextResponse.json({
            success:false,
            message:"Service not found"
        } , {status:404})
      }

      if(service.serviceby.toString()  != user._id.toString()){
        return NextResponse.json({success:false , message:"You can only delete your own services."} , {status:403})
      }

      await ServiceModel.findByIdAndDelete((await params).id);
      await UserModel.findByIdAndUpdate(user._id , {
        $pull:{providedServices:service._id}
      });
      return NextResponse.json({success:true , message:"Service deleted"} , {status:200});
    } catch (error) {
        console.error("Delete service error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
    }

}