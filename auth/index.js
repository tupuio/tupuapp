import { getXataClient } from "../services/xata";

export default function XataAdapter(client, options = {}) {
  return {
    async createUser(user) {
      const xata = getXataClient();
      const createdUser = await xata.db.users.create({
        name: user.name,
        email: user.email,
        roles: ["mentor", "mentee"],
      });
      // returns AdapterUser
      return {
        id: createdUser.id,
        name: user.name,
        image: user.image,
        emailVerified: user.emailVerified,
      };
    },

    async getUser(id) {
      const xata = getXataClient();
      const user = await xata.db.users.read(id);
      console.log("getUser: found user with id", user.id);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: null,
      };
    },

    async getUserByEmail(email) {
      const xata = getXataClient();
      const user = await xata.db.users.filter("email", email).getFirst();

      if (user) {
        console.log("getUserByEmail: found user with id", user.id);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: null,
        };
      }

      return null
    },

    async getUserByAccount({ provider, providerAccountId }) {
      console.log("getUserByAccount", provider, providerAccountId);
      const xata = getXataClient();
      const account = await xata.db.nextauth_providers
        .select(["*", "user.*"])
        .filter({
          provider,
          providerAccountId,
        })
        .getFirst();
      if (!account) {
        return null;
      }

      return {
        id: account.user.id,
        name: account.user.name,
        email: account.user.email,
        emailVerified: null,
      };
    },

    async updateUser(user) {
      console.log("udpateUser", user);
      return null;
    },

    // Never called by next-auth, left unimplemented
    async deleteUser(userId) {
      throw new Error("Not implemented");
    },

    async linkAccount(account) {
      console.log("linkAccount", account);

      const link = {
        user: account.userId,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
      };

      const xata = getXataClient();
      await xata.db.nextauth_providers.create(link);

      return account;
    },

    // Never called by next-auth, left unimplemented
    async unlinkAccount({ provider, id }) {
      throw new Error("Not implemented");
    },

    async createSession({ sessionToken, userId, expires }) {
      console.log("createSession", sessionToken, userId, expires);

      return;
    },

    async getSessionAndUser(sessionToken) {
      console.log("getSessionAndUser", sessionToken);

      return;
    },

    async updateSession({ sessionToken }) {
      console.log("updateSession", sessionToken);

      return;
    },

    async deleteSession(sessionToken) {
      console.log("deleteSession", sessionToken);

      return;
    },

    // Used for email/passwordless sign in
    async createVerificationToken({ identifier, expires, token }) {
      throw new Error("Not implemented");
    },

    // Used for email/passwordless sign in
    async useVerificationToken({ identifier, token }) {
      throw new Error("Not implemented");
    },
  };
}
