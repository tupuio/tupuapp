import NextAuth from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "process";

const providers = [
  LinkedInProvider({
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  }),
];

if (process.env.NODE_ENV === "development") {
  providers.push(
    CredentialsProvider({
      name: "Development credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials.password !== process.env.DEV_PASSWORD) {
          return null;
        }

        if (credentials.username === "tudor") {
          return {
            name: "Tudor Golubenco",
            email: "tudor.g@gmail.com",
            roles: ["mentor", "mentee", "admin"],
          };
        } else if (credentials.username === "madalina") {
          return {
            name: "Madalina",
            email: "madalina@tupu.io",
            roles: ["mentor", "mentee", "admin"],
          };
        } else if (credentials.username === "test") {
          return {
            name: "Test",
            email: "test@tupu.io",
            roles: ["mentor", "mentee", "admin"],
          };
        }
        return null;
      },
    })
  );
}

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 24 * 3600,
  },
  pages: {
    signIn: "/auth/signin",
  },
  // Configure one or more authentication providers
  providers,
  secret: process.env.JWT_SECRET,
});
