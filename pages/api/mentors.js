import { getXataHeaders, DB_PATH } from "../../services";

export default async function handler(req, res) {
  const resp = await fetch(`${DB_PATH}/users/_query`, {
    method: "POST",
    headers: {
      ...(await getXataHeaders()),
    },
    json: {
      _filter: {
        roles: "mentor",
      },
    },
  });
  res.status(resp.status).json(await resp.json());
}
