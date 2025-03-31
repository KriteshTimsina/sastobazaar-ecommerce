import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import fetcher from "@/lib/fetcher";
import type { APIResponse, LoginResponse } from "@/types";
import { URL } from "@/lib/constants";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
    } & DefaultSession["user"];
  }

  interface User {
    token: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        const user = await fetcher<APIResponse<{ user: LoginResponse }>>(
          URL.LOGIN,
          {
            method: "POST",
            body: JSON.stringify({ ...credentials, email, password }),
          }
        );

        if (!user.status) {
          throw new Error("Login Failed");
        }

        const userInfo = user.user;

        return {
          id: userInfo.userId,
          token: userInfo?.token,
          email: userInfo?.email,
          image: "",
          name: userInfo.username,
        };
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (session.user && token.sub) {
        session.user.token = token.token;
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      console.log(token, user);
      if (user) {
        token.token = user.token;
      }
      return token;
    },
  },
});
