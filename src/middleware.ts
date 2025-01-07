import withAuth from "next-auth/middleware";
import { NextResponse, type NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//     const token = req.cookies.get("token");
//     if (req.nextUrl.pathname === "/home" || req.nextUrl.pathname === "/add") {
//         if (token) {
//             return NextResponse.next();
//         }
//         return NextResponse.redirect(new URL("/login", req.url));
//     }
// }


export default withAuth({
    pages: {
        signIn: "/login", // Halaman login
        //error: "/login", // Halaman error
    },
    callbacks: {
        authorized: ({ token }) => !!token, // Periksa apakah token ada
    },
});
