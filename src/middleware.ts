import withAuth from "next-auth/middleware";
//import { authOptions } from "./app/api/auth/[...nextauth]/route";

export default withAuth({
    pages: {
        signIn: "/login", // Halaman login
        //error: "/login", // Halaman error
    },
    //jwt: {decode : authOptions.jwt?.decode},
    callbacks: {
        authorized: ({ token }) => !!token, // Periksa apakah token ada
    },
});
