import {getXataClient} from "./xata";
import {sendNewUserCreatedEmail} from "../utils/email";

export default function XataAdapter(client, options = {}) {
  return {
    async createUser(user) {
      console.log("createUser: creating user", user.email);

      const xata = getXataClient();

      const createdUser = await xata.db.users.create({
        email: user.email,
        roles: ["mentor", "mentee"],
      });

      await xata.db.profiles.create({
        user: createdUser.id,
        name: user.name,
      });

      // send email to request new user verification
      sendNewUserCreatedEmail(createdUser.id, user.email)

      // returns AdapterUser
      return {
        id: createdUser.id,
        name: user.name,
        image: "",
        email: user.email,
        emailVerified: null,
        published: createdUser.published,
      };
    },

    async getUser(id) {
      console.log("getUser: searching for user", user.id);

      const xata = getXataClient();

      const profile = await xata.db.profiles
          .select(["*", "user.*"])
          .filter({'user.id': id})
          .getFirst();

      if (!profile) {
        console.log("getUser: user not found");
        return null;
      }

      return {
        id: profile.user.id,
        name: profile.name,
        image: "",
        email: profile.user.email,
        emailVerified: null,
        published: profile.user.published,
      };
    },

    async getUserByEmail(email) {
      console.log("getUserByEmail: searching for user", email);

      const xata = getXataClient();

      const profile = await xata.db.profiles
          .select(["*", "user.*"])
          .filter({'user.email': email})
          .getFirst();

      if (!profile) {
        console.log("getUserByEmail: user not found");
        return null;
      }

      return {
        id: profile.user.id,
        name: profile.name,
        image: "",
        email: profile.user.email,
        emailVerified: null,
        published: profile.user.published,
      };
    },

    async getUserByAccount({provider, providerAccountId}) {
      console.log("getUserByAccount: searching for user", provider, providerAccountId);

      const xata = getXataClient();

      const profile = await xata.db.profiles
          .select(["*", "user.*"])
          .filter({
            'user.provider': provider,
            'user.externalId': providerAccountId
          })
          .getFirst();

      if (!profile) {
        console.log("getUserByAccount: user not found");
        return null;
      }

      return {
        id: profile.user.id,
        name: profile.name,
        image: "",
        email: profile.user.email,
        emailVerified: null,
        published: profile.user.published,
      };
    },

    async updateUser(user) {
      throw new Error("Not implemented");
    },

    async deleteUser(id) {
      throw new Error("Not implemented");
    },

    async linkAccount(account) {
      console.log("linkAccount: linking account", account);

      const xata = getXataClient();

      await xata.db.users.update(account.userId, {
        provider: account.provider,
        externalId: account.providerAccountId,
      })

      return account;
    },

    async unlinkAccount({provider, id}) {
      throw new Error("Not implemented");
    },

    async createSession({sessionToken, userId, expires}) {
      throw new Error("Not implemented");
    },

    async getSessionAndUser(sessionToken) {
      throw new Error("Not implemented");
    },

    async updateSession({sessionToken}) {
      throw new Error("Not implemented");
    },

    async deleteSession(sessionToken) {
      throw new Error("Not implemented");
    },

    async createVerificationToken({identifier, expires, token}) {
      console.log("createVerificationToken: creating verification token", identifier, expires, token);

      const xata = getXataClient();

      const createdToken = await xata.db.tokens.create({
        name: identifier,
        value: token,
        expiresAt: expires
      });

      return {
        identifier: createdToken.name,
        token: createdToken.value,
        expires: createdToken.expiresAt
      }
    },

    async useVerificationToken({identifier, token}) {
      throw new Error("Not implemented");
    },
  };
}
