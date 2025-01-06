
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: number;
      username: string;
      role: string;
    };
  }

  interface User {
    token: string;
    id: number;
    username: string;
    role: string;
  }

  interface JWT {
    id: number;
    username: string;
    role: string;
    accessToken?: string;
  }
}
