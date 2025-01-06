import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
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

                    if (res.ok && data?.data?.token) {
                        // Return user object if authentication was successful
                        return {
                            id: data.data.user.id,
                            username: data.data.user.username,
                            role: data.data.user.role,
                            token: data.data.token,
                        };
                    }

                    return null;
                } catch (error) {
                    console.error("Login error", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token;
                token.id = user.id;
                token.username = user.username;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id as number, // Gunakan type assertion jika diperlukan
                    username: token.username as string,
                    role: token.role as string,
                };
                session.accessToken = token.accessToken as string | undefined;
            }
            return session;
        },
    },
    secret: "hii-yNwFfjTEyG7W2JdhdQI5cFOp4r7MXk1ycc-vYoM",
});
