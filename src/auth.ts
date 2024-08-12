import NextAuth, { type NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
    providers: [
        GitHub({
              clientId: process.env.GITHUB_CLIENT_ID,
                    clientSecret: process.env.GITHUB_CLIENT_SECRET,
                        }),
                          ],
                            pages: {
                                signIn: "/",
                                  },
                                    callbacks: {
                                        async redirect({ url, baseUrl }) {
                                              // Customize redirection logic if needed
                                                    return url.startsWith(baseUrl) ? url : baseUrl;
                                                        },
                                                            async session({ session, user }) {
                                                                  // Custom session handling if needed
                                                                        return session;
                                                                            },
                                                                                async signIn({ user, account, profile }) {
                                                                                      // Custom sign-in handling if needed
                                                                                            return true;
                                                                                                },
                                                                                                  },
                                                                                                  };

                                                                                                  export default NextAuth(authOptions);