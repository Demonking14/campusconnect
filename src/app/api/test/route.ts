import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        await dbConnect();
        return NextResponse.json({
            success:true,
            message:"DB working"
        });

    }
    catch(error){
        return NextResponse.json({success:false , error});
    }
    
}