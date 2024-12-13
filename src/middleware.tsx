import { NextRequest, NextResponse } from "next/server";




export default function middleware(request:NextRequest) {
    const nextPath = request.nextUrl.pathname
    const token = request.cookies.get("token")?.value || ""
    
    
    if ((nextPath === "/login" || nextPath === "/signup") && token !== "") {
        return NextResponse.redirect(new URL("/",request.nextUrl))
    }
    if (nextPath === "/profile" && token === "") {
        return NextResponse.redirect(new URL("/login",request.nextUrl))
    }

}

export const config={
    matcher: [
        "/profile",
        "/login",
        "/signup"
    ]
}