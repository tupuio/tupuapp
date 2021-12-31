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

  if (req.method === "GET") {
    return handleGET(session, req, res);
  } else {
    res
      .status(404)
      .json({ message: `Unsupported method on this endpoint: ${req.method}` });
  }
}

async function handleGET(session, req, res) {
  const resp = await fetch(`${DB_PATH}/users/${req.query.id}`, {
    method: "GET",
    headers: {
      ...(await getXataHeaders()),
    },
  });
  if (resp.status > 299) {
    res.status(resp.status).json(await resp.json());
    return;
  }
  const user = await resp.json();

  // Only mentors are public, and only the ones that are not hidden
  if (!user.roles || !user.roles.includes("mentor") || user.mentor?.hide) {
    res.status(404).json({
      error: "User not found",
    });
    return;
  }

  res.status(200).json(user);
}
