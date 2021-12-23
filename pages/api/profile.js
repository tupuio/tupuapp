import env from "../../constants";

const { BASE_URL, PRIV_BASE_URL, PRIV_API_USERNAME, PRIV_API_PASSWORD } = env;

export default async function handler(req, res) {
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

  const resp = await fetch(`${BASE_URL}/tupu-app/main/mentors/_query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      _filter: {
        email: "madalina@tupu.io",
      },
    }),
  });

  const { records } = await resp.json();

  if (records.length === 0) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  console.log(records[0]);
  res.status(200).json(records[0]);
}
