import { getSession } from "next-auth/react";
import { getUserById, getUser } from "../../services";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.status(403).json({
      error: "You must be signed in to access this API.",
    });
    return;
  }

  if (req.method === "POST") {
    return handlePOST(session, req, res);
  } else {
    res
      .status(404)
      .json({ message: `Unsupported method on this endpoint: ${req.method}` });
  }
}

async function handlePOST(session, req, res) {
  const user = await getUser(session);
  if (!user) {
    res.status(500).json({ message: "Can't get user data" });
    return;
  }

  const mentee = await getUserById(req.body.menteeId);
  if (!mentee) {
    res.status(500).json({ message: "Can't get mentee data" });
    return;
  }

  const message = req.body.message;

  // TODO: send email to mentee, replyto mentor's email
  console.error("TODO:");
  console.log(`recipient: ${mentee.email}`);
  console.log(`from: ${user.email}`);

  {
    res.status(500).json({ message: "TODO: send email to mentee, coming from mentor" });
    return;
  }

}
