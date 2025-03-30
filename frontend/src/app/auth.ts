import { URL } from "@/lib/constants";
import fetcher from "@/lib/fetcher";
import { APIResponse, LoginResponse } from "@/types";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        console.log(credentials, "x");

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

        return user;
      },
    }),
  ],
});
