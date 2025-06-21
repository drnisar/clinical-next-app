import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/db";
const ALLOWED_EMAILS = ["drnisaar@gmail.com", "drnisar@hotmail.com"];

const handler = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      // Only allow users whose email is in the allowed list
      if (user?.email && ALLOWED_EMAILS.includes(user.email)) {
        return true;
      }
      return false; // Deny sign in
    },
  },
});

export { handler as GET, handler as POST };
