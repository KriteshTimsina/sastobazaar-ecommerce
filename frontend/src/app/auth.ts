import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import fetcher from "@/lib/fetcher";
import type { APIResponse, LoginResponse } from "@/types";
import { URL } from "@/lib/constants";

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

        // if (!user.status) {
        //   return {};
        // }

        const userInfo = user.user;

        return {
          id: userInfo.userId,
          token: userInfo?.token,
          email: "",
          image: "",
          name: "",
        };
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
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
      // token.token = user.token;
      return token;
    },
  },
});
