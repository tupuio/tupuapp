import {getXataClient} from "../xata";
import {sendNewUserCreatedEmail} from "../email";
import {createUser} from "../users";
import {createProfile, getProfileByEmail, getProfileByExternalId, getProfileByUserId} from "../profiles";
import {createMentor} from "../mentors";

function convertProfile(profile) {
  return {
    id: profile.user.id,
    name: profile.name,
    image: "",
    email: profile.user.email,
    emailVerified: null,
    published: profile.user.published,
  };
}

export default function XataAdapter() {
  return {
    async createUser(user) {
      console.log("createUser: creating user", user.email);

      const createdUser = await createUser({ email: user.email });
      await createProfile({ id: createdUser.id, name: user.name });
      // TODO: Only create a mentors entry if the user is a mentor
      await createMentor({ id: createdUser.id });

      // TODO: Send user verification email
      // sendNewUserCreatedEmail(createdUser.id, user.email)

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
      console.log("getUser: searching for user", id);

      const profile = await getProfileByUserId(id);

      if (!profile) {
        console.log("getUser: user not found");
        return null;
      }

      return convertProfile(profile);
    },

    async getUserByEmail(email) {
      console.log("getUserByEmail: searching for user", email);

      const profile = await getProfileByEmail(email);

      if (!profile) {
        console.log("getUserByEmail: user not found");
        return null;
      }

      return convertProfile(profile);
    },

    async getUserByAccount({provider, providerAccountId}) {
      console.log("getUserByAccount: searching for user", provider, providerAccountId);

      const profile = await getProfileByExternalId({ provider, externalId: providerAccountId });

      if (!profile) {
        console.log("getUserByAccount: user not found");
        return null;
      }

      return convertProfile(profile);
    },

    async updateUser(user) {
      console.log("updateUser: updating user", user.id);

      const xata = getXataClient();

      // TODO: Do we need to update the user?
      const profile = await xata.db.profiles
          .select(["*", "user.*"])
          .filter({'user.id': user.id})
          .getFirst();

      return {
        id: profile.user.id,
        name: profile.name,
        image: "",
        email: profile.user.email,
        emailVerified: null,
        published: profile.user.published,
      };
    },

    async deleteUser(id) {
      throw new Error("Not implemented");
    },

    async linkAccount(account) {
      console.log("linkAccount: linking account", account.provider, account.providerAccountId);

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
        identifier: identifier,
        value: token,
        expiresAt: expires
      });

      return {
        identifier: createdToken.identifier,
        token: createdToken.value,
        expires: createdToken.expiresAt
      }
    },

    async useVerificationToken({identifier, token}) {
      console.log("useVerificationToken: using verification token", identifier, token);

      const xata = getXataClient();

      const tokenRecord = await xata.db.tokens.filter("identifier", identifier).getFirst();

      if (!tokenRecord) {
        console.log("useVerificationToken: token not found");
        return null;
      }

      await xata.db.tokens.delete(tokenRecord.id);

      return {
        identifier: tokenRecord.identifier,
        token: tokenRecord.value,
        expires: tokenRecord.expiresAt
      }
    },
  };
}
