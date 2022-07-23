import { getSession } from "next-auth/react";
import { getXataHeaders, DB_PATH } from "../../../services";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.status(403).json({
      error: "You must be signed in to access this API.",
    });
    return;
  }

  const allFilters = [
    {$exists: "roles"},
    {roles: {
      $includes: "mentee",
    }},
  ];
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_DEV_LOGIN === "true"
  ) {
    allFilters.push({roles: { $includes: "test", }});
  }

  const resp = await fetch(`${DB_PATH}/tables/users/query`, {
    method: "POST",
    headers: {
      ...(await getXataHeaders()),
    },
    body: JSON.stringify({
      filter: {
          $all: allFilters,
      },
    }),
  });
  res.status(resp.status).json(await resp.json());
}
