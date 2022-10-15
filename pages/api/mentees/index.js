import { getSession } from "next-auth/react";
import { getUser } from "../../../services";
import { getXataClient } from "../../../services/xata";
import { RelationshipStatusEnum } from "../../../types/dbTablesEnums";

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
  const xata = getXataClient();
  const mentorships = await xata.db.relationships
    .select(["*", "mentee.*"])
    .filter({
      mentor: user.id,
      status: RelationshipStatusEnum.Started,
    })
    .getAll();
  res.status(200).json({ records: mentorships });
}
