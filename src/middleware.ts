import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname === "/home") {
        if (req.cookies.has("token")) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/login", req.url));
    }
}