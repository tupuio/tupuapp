import { getXataClient } from "./xata";

export async function getUser(session) {
  const xata = getXataClient();
  return xata.db.users.filter("email", session.user.email).getFirst();
}

export async function getUserByEmail(email) {
  const xata = getXataClient();
  return xata.db.users.filter("email", email).getFirst();
}

export async function getUserById(id) {
  const xata = getXataClient();
  const user = await xata.db.users.read(id);
  console.log("getUserById: found user with id", user.id, user);
  return user;
}

export async function getRequestById(id) {
  const xata = getXataClient();
  return await xata.db.requests
    .select(["*", "mentee.email", "mentee.name", "mentor.email", "mentor.name"])
    .filter("id", id)
    .getFirst();
}
