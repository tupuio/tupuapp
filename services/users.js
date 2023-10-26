import {getXataClient} from "./xata";

const xata = getXataClient();

export async function createUser({ email }) {
  return await xata.db.users.create({
    email: email,
    // TODO: Don't add mentor role by default
    roles: ["mentor", "mentee"],
  });
}

export async function getUserByEmail(email) {
  return await xata.db.users.filter("email", email).getFirst();
}