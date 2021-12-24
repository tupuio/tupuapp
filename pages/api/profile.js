import { getXataHeaders, DB_PATH } from "../../services";

export default async function handler(req, res) {
  const resp = await fetch(`${DB_PATH}/mentors/_query`, {
    method: "POST",
    headers: {
      ...(await getXataHeaders()),
    },
    body: JSON.stringify({
      _filter: {
        email: "madalina@tupu.io",
      },
    }),
  });

  const { records } = await resp.json();

  if (!records || records.length === 0) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  console.log(records[0]);
  res.status(200).json(records[0]);
}
