import { getSession } from "next-auth/react";
import { getRequestById, getUser } from "../../services";

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
  const { requestId, message } = req.body;

  const request = await getRequestById(requestId);
  if (!request) {
    res.status(500).json({ message: "Can't get request data" });
    return;
  }
  const { mentee, mentor } = request;
  // console.log(request);
  // the mentor in the request must be the same as this current user
  if (mentor.id !== user.id) {
    res.status(500).json({ message: "Can't get correct request data" });
    return;
  }

  // TODO: send email to mentee, replyto mentor's email
  console.error("TODO:");
  console.log(`recipient: ${mentee.email}`);
  console.log(`from: verified tupu email`);
  console.log(`reply to: ${mentor.email}`);
  console.log(`message: ${message}`);

  {
    res.status(500).json({ message: "TODO: send email to mentee, coming from mentor" });
    return;
  }

}
