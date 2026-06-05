import { NextRequest , NextResponse } from "next/server";
import { runMatchAgent } from "@/lib/matchAgent";

export async function POST(request:NextRequest) {
    try {
        const {query}  = await request.json();
        if(!query){
            return NextResponse.json(
                {success:false , message:"Query is required"},
                {status: 400}
            )
        }
        const matches = await runMatchAgent(query);
        // console.log("Agent returned matches:" , matches);
        return NextResponse.json(
            {success:true , data: matches},
            {status:200}
        )
    } catch (error) {
        console.error("Match agent error:" ,  error);
        return NextResponse.json(
            {success:false , message:"Internal server error"},
            {status : 500}
        ); 
    }
}