import { getSession } from "next-auth/react";
import { getXataHeaders, DB_PATH, getUser } from "../../services";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.status(403).json({
      error: "You must be signed in to access this API.",
    });
    return;
  }

  if (req.method === "GET") {
    return handleGET(session, req, res);
  } else {
    res
      .status(404)
      .json({ message: `Unsupported method on this endpoint: ${req.method}` });
  }
}

async function handleGET(session, req, res) {
  const user = await getUser(session);
  if (!user) {
    res.status(500).json({ message: "Can't get user data" });
    return;
  }

  const resp = await fetch(`${DB_PATH}/tables/requests/query`, {
    method: "POST",
    headers: {
      ...(await getXataHeaders()),
    },
    body: JSON.stringify({
      _columns: ["*", "mentee.*"],
      _filter: {
        mentor: user._id,
      },
    }),
  });

  res.status(resp.status).json(await resp.json());
}
