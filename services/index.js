import { getXataClient } from "./xata";
export const DB_PATH = `${process.env.XATA_URL}/db/tupu-app:${process.env.XATA_BRANCH}`;

export async function getXataHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.XATA_KEY}`,
  };
}

export async function getUser(session) {
  const xata = getXataClient();
  return xata.db.users.filter("email", session.user.email).getFirst();
}

export async function getUserById(id) {
  const xata = getXataClient();
  const user = await xata.db.users.read(id);
  console.log("getUserById: found user with id", user.id, user);
  return user;
}

export async function getRequestById(id) {
  const resp = await fetch(`${DB_PATH}/tables/requests/query`, {
    method: "POST",
    headers: {
      ...(await getXataHeaders()),
    },
    body: JSON.stringify({
      columns: [
        "*",
        "mentee.email",
        "mentee.name",
        "mentor.email",
        "mentor.name",
      ],
      filter: {
        id: id,
      },
    }),
  });

  if (resp.status > 299) {
    throw new Error(
      `Error getting request: ${resp.status} ${await resp.text()}`
    );
  }
  const { records } = await resp.json();
  const request = records.length > 0 ? records[0] : null;
  // console.log("getRequestById: found request with id", request.id);
  return request;
}
