import { getXataHeaders, DB_PATH } from "../services";

export default function XataAdapter(client, options = {}) {
  return {
    async createUser(user) {
      const response = await fetch(`${DB_PATH}/tables/users/data`, {
        method: "POST",
        headers: {
          ...(await getXataHeaders()),
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          roles: ["mentor", "mentee"],
        }),
      });
      if (response.status > 299) {
        throw new Error(`Creating user in Xata: ${await response.text()}`);
      }
      const { _id: userId } = await response.json();
      console.log(`createUser: created user with id ${userId}`);
      // returns AdapterUser
      return {
        id: userId,
        name: user.name,
        image: user.image,
        emailVerified: user.emailVerified,
      };
    },

    async getUser(id) {
      console.log("getUser", id);
      const response = await fetch(`${DB_PATH}/tables/users/data/${id}`, {
        method: "GET",
        headers: {
          ...(await getXataHeaders()),
        },
      });
      if (response.status === 404) {
        return null;
      }
      if (response.status > 299) {
        throw new Error(`Getting user from Xata: ${await response.text()}`);
      }

      const user = await response.json();
      console.log("getUser: found user with id", user._id);

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        emailVerified: null,
      };
    },

    async getUserByEmail(email) {
      console.log("getUserByEmail", email);

      const response = await fetch(`${DB_PATH}/tables/users/query`, {
        method: "POST",
        headers: {
          ...(await getXataHeaders()),
        },
        body: JSON.stringify({
          filter: {
            email,
          },
        }),
      });
      if (response.status > 299) {
        throw new Error(`Getting account from Xata: ${await response.text()}`);
      }

      const { records } = await response.json();
      if (records.length === 0) {
        return null;
      }
      const user = records[0];

      console.log("getUserByEmail: found user with id", user._id);

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        emailVerified: null,
      };
    },

    async getUserByAccount({ provider, providerAccountId }) {
      console.log("getUserByAccount", provider, providerAccountId);

      const response = await fetch(
        `${DB_PATH}/tables/nextauth_providers/query`,
        {
          method: "POST",
          headers: {
            ...(await getXataHeaders()),
          },
          body: JSON.stringify({
            columns: ["*", "user.*"],
            filter: {
              provider,
              providerAccountId,
            },
          }),
        }
      );
      if (response.status > 299) {
        throw new Error(`Getting account from Xata: ${await response.text()}`);
      }

      const { records } = await response.json();
      if (records.length === 0) {
        return null;
      }
      if (records.length > 1) {
        console.log(
          `WARNING: multiple accounts linked to ${provider}/${providerAccountId}`
        );
      }
      const account = records[0];
      console.log("getUserByAccount: returning user with id", account.user._id);

      return {
        id: account.user._id,
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

      const response = await fetch(
        `${DB_PATH}/tables/nextauth_providers/data`,
        {
          method: "POST",
          headers: {
            ...(await getXataHeaders()),
          },
          body: JSON.stringify(link),
        }
      );
      if (response.status > 299) {
        throw new Error(`Creating link in Xata: ${await response.text()}`);
      }
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
