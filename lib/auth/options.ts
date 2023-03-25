import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@lib/db";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(data) {
      // Everyone can login
      if (!process.env.NEXTAUTH_IS_PRIVATE) {
        return true
      }

      // Just pre defined user can login
      if (!data.user.email) {
        return false
      }

      const user = await prisma.user.findUnique({
        where: {
          email: data.user.email
        }
      })

      if (user && user.status === 'PENDING') {
        await prisma.user.delete({
          where: { id: user.id }
        })

        return true
      }

      if (user && user.status === 'ACTIVE') {
        return true
      }

      return false
    }
  }
};
