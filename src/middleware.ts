import { NextResponse  , NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const authRoutes = ["/login"];
const protectedRoutes = ["/dashboard", "/services"];
export async function middleware(request:NextRequest) {
    const token = await getToken({
        req:request,
        secret:process.env.NEXTAUTH_SECRET
    });
    const {pathname}  = request.nextUrl;
    const isAuthRoute = authRoutes.some((route)=>pathname.startsWith(route));
    const isProtectedRoute = protectedRoutes.some((route)=>pathname.startsWith(route));
    
    if(token && isAuthRoute){
        return NextResponse.redirect(new URL("/dashboard" , request.url));
    }
    if(!token && isProtectedRoute){
        return NextResponse.redirect(new URL("/login" , request.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher:["/login" , "/dashboard/:path*" , "/services/:path*" ],
};
