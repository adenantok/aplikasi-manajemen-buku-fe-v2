import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    debug: true,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const res = await fetch("http://localhost:8080/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            username: credentials?.username,
                            password: credentials?.password,
                        }),
                    });

                    const data = await res.json();
                    console.log("Login API Response:", data); // Debugging respons API

                    if (res.ok && data?.data?.token) {
                        return {
                            id: data.data.user.id,
                            username: data.data.user.username,
                            role: data.data.user.role,
                            token: data.data.token,
                        };
                    }
                    throw new Error("Invalid credentials");
                } catch (error) {
                    console.error("Login error", error);
                    return null;
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
    callbacks: {
        async jwt({ token, user }) {
            //console.log("JWT callback - user:", user);
            //console.log("JWT callback - token:", token);
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.role = user.role;
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            //console.log("Session callback - token:", token);
            //console.log("Session callback - session:", session);
            if (token) {
                session.user = {
                    id: token.id as number,
                    username: token.username as string,
                    role: token.role as string,
                };
                session.accessToken = token.accessToken as string | undefined;
            }
            return session;
        },
    },
    
    pages: {
        signIn: "/login",
        error: "/login", // Redirect ke halaman login jika ada error
    },
});

export { handler as GET, handler as POST };