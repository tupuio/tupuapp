import { getSession } from "next-auth/react";
import { getXataClient } from "../../../services/xata";

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
  const xata = getXataClient();
  const user = await xata.db.users.read(req.query.id);

  // Only mentees are public, and only the ones that are not hidden
  if (
    !user ||
    !user.roles ||
    !user.roles.includes("mentee") ||
    user.mentee?.hide
  ) {
    res.status(404).json({
      error: "User not found",
    });
    return;
  }

  res.status(200).json(user);
}
