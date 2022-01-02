import env from "../constants";

const {
  BASE_URL,
  PRIV_BASE_URL,
  PRIV_API_USERNAME,
  PRIV_API_PASSWORD,
  XATA_BRANCH,
} = env;

export const DB_PATH = `${BASE_URL}/tupu-app/${XATA_BRANCH}`;

export async function getXataHeaders() {
  const response = await fetch(`${PRIV_BASE_URL}/_users/xatacli/_accessToken`, {
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
  const resp = await fetch(`${DB_PATH}/users/_query`, {
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

  const { records } = await resp.json();
  return records.length > 0 ? records[0] : null;
}
