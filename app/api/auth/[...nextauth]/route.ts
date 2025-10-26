import NextAuth, {NextAuthOptions} from "next-auth"
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GitHubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials";
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { routes } from "@/lib/constants";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { password, email } = parsedCredentials.data;
          const user = await prisma.user.findUnique({
            where: {
              email: email,
            }
          })

          if (!user) {
            return null;
          }

          const isPasswordsMatch = await bcrypt.compare(password, user.password)

          if (isPasswordsMatch) {
            return user;
          }
          console.log("Invalid credentials");
          return null;
        }

        return null;
      },
    })
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: routes.login,
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET!,
};

const handler = NextAuth(authOptions)

export {
  handler as GET,
  handler as POST,
  authOptions,
}
