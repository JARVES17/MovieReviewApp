
import { NextRequest, NextResponse } from "next/server";




export default function middleware(request:NextRequest) {
    const nextPath = request.nextUrl.pathname
    const token = request.cookies.get("token")?.value || ""
    
    
    if ((nextPath === "/" || nextPath === "/signup") && token !== "") {
        return NextResponse.redirect(new URL("/",request.nextUrl))
    }
//     if ( token=="") {
//        return NextResponse.redirect(new URL("/",request.nextUrl))
//    }
//     if (nextPath !== "/signup"  && token=="") {
//        return NextResponse.redirect(new URL("/",request.nextUrl))
//    }

}

export const config={
    matcher: [
        "/",
        "/home",
        "/tvShow",
        "/movies",
        "/updateEntertainment",
        "/userSetting",
        "/watchList",
        "/detail",

        "/addEntertainment"
    ]
}