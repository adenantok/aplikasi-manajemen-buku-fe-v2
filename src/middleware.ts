import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token");
    if (req.nextUrl.pathname === "/home") {
        if (token) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/login", req.url));
    }
}