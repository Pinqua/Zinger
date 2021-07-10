import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../util/mongodb";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async session(session, token) {
      session.admin = false;
      const { db } = await connectToDatabase();
      const result = await db
        .collection("admins")
        .findOne({ user: session.user.email });
      if (result) {
        session.admin = true;
      }
      return session;
    },
  },
  // A database is optional, but required to persist accounts in a database
  database: `${process.env.MONGO_URI}`,
  theme: "dark",
});
