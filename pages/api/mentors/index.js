import { getSession } from "next-auth/react";
import { getXataClient } from "../../../services/xata";

export default async function handler(req, res) {
  const xata = getXataClient();
  const session = await getSession({ req });
  if (!session) {
    res.status(403).json({
      error: "You must be signed in to access this API.",
    });
    return;
  }

  const allFilters = [
    { $exists: "roles" },
    {
      roles: {
        $includes: "mentor",
      },
    },
  ];
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_DEV_LOGIN === "true"
  ) {
    allFilters.push({ roles: { $includes: "test" } });
  } else {
    allFilters.push({ $not: { roles: { $includes: "test" } } });
  }

  const mentors = await xata.db.users
    .filter({
      $all: allFilters,
    })
    .getAll();

  res.status(200).json({ records: mentors });
}
