import env from "../constants";

const {
  BASE_URL,
  PRIV_BASE_URL,
  PRIV_API_USERNAME,
  PRIV_API_PASSWORD,
  XATA_BRANCH,
} = env;

export const DB_PATH = `${BASE_URL}/db/tupu-app:${XATA_BRANCH}`;

export async function getXataHeaders() {
  const respUser = await fetch(`${PRIV_BASE_URL}/_users/_lookup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        `${PRIV_API_USERNAME}:${PRIV_API_PASSWORD}`
      ).toString("base64")}`,
    },
    body: JSON.stringify({ email: "xatacli@xata.io" }),
  });
  const { id } = await respUser.json();

  const response = await fetch(`${PRIV_BASE_URL}/_users/${id}/_accessToken`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        `${PRIV_API_USERNAME}:${PRIV_API_PASSWORD}`
      ).toString("base64")}`,
    },
  });

  const { token } = await response.json();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getUser(session) {
  const resp = await fetch(`${DB_PATH}/tables/users/query`, {
    method: "POST",
    headers: {
      ...(await getXataHeaders()),
    },
    body: JSON.stringify({
      _filter: {
        email: session.user.email,
      },
    }),
  });

  if (resp.status > 299) {
    throw new Error(
      `Error getting user: ${resp.status} ${await response.text()}`
    );
  }
  const { records } = await resp.json();
  return records.length > 0 ? records[0] : null;
}
