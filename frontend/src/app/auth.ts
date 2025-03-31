import { URL } from "@/lib/constants";
import fetcher from "@/lib/fetcher";
import { APIResponse, LoginResponse } from "@/types";
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    } & DefaultSession["user"];
    token: string;
  }

  interface User {
    token: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    token: string;
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
        // console.log(credentials, "x");

        const user = await fetcher<APIResponse<{ user: LoginResponse }>>(
          URL.LOGIN,
          {
            method: "POST",
            body: JSON.stringify({ ...credentials, email, password }),
          }
        );

        if (!user.status) {
          return {};
        }

        const userInfo = user.user;
        console.log(userInfo, "UI");

        return {
          email: "",
          id: userInfo.userId,
          image: "",
          name: "",
          token: userInfo?.token,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.token = token?.token;
      }
      return session;
    },
    async jwt({ token, user }) {
      token.token = user?.token;
      return token;
    },
  },
});
