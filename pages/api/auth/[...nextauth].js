import NextAuth from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import XataAdapter from "../../../services/authAdapter";
import {getUserByEmail} from "../../../services/users";

const providers = [];

if (process.env.LINKEDIN_CLIENT_ID &&
    process.env.LINKEDIN_CLIENT_SECRET) {
  providers.push(LinkedInProvider({
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  }));
}

if (process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }));
}

providers.push(EmailProvider({
  server: {
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD
    }
  },
  from: process.env.EMAIL_FROM,
}));

const xataAdapter = XataAdapter();

export default NextAuth({
  adapter: xataAdapter,
  session: {
    strategy: "jwt",
    maxAge: 24 * 3600,
  },
  // pages: {
  //   signIn: "/auth/signin",
  // },
  providers,
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({token}) {
      const profile = await getUserByEmail(token?.email)

      token.isPublished = profile?.published ?? false

      return token
    },
    async session({session}) {
      const profile = await getUserByEmail(session?.user?.email)

      session.user = session.user || {}

      session.user.published = profile?.published ?? false
      session.user.roles = profile?.roles ?? []

      return session
    }
  }
});
