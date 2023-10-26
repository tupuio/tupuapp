import {getXataClient} from "./xata";

const xata = getXataClient();

export async function createProfile({id, name}) {
  return await xata.db.profiles.create({
    user: id,
    name: name,
  });
}

export async function getProfileByUserId(id) {
  return await xata.db.profiles
      .select(["*", "user.*"])
      .filter({'user.id': id})
      .getFirst();
}

export async function getProfileByEmail(email) {
  return await xata.db.profiles
      .select(["*", "user.*"])
      .filter({'user.email': email})
      .getFirst();
}

export async function getProfileByExternalId({ provider, externalId }) {
  return await xata.db.profiles
      .select(["*", "user.*"])
      .filter({
        'user.provider': provider,
        'user.externalId': externalId
      })
      .getFirst();
}