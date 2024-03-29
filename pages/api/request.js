import { getSession } from "next-auth/react";
import { getUser, getUserById } from "../../services";
import { getXataClient } from "../../services/xata";
import { RequestStatusEnum } from "../../types/dbTablesEnums";
import { sendMentorshipRequestedEmail } from "../../utils/email";
import { GENERAL_REQUEST_ERROR_MESSAGE } from "../../constants";

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
  const { mentorId, message, longterm } = req.body;

  const user = await getUser(session);
  if (!user) {
    res.status(500).json({ message: "Can't get user data" });
    return;
  }

  if (mentorId === user.id) {
    res.status(500).json({ message: GENERAL_REQUEST_ERROR_MESSAGE })
    return
  }

  const reqObj = {
    mentor: mentorId,
    mentee: user.id,
    message,
    longterm,
    status: RequestStatusEnum.Pending,
    lastUpdateDate: (new Date()).toJSON(), /* UTC */
    creationDate: (new Date()).toJSON(), /* UTC */
  };
  const xata = getXataClient();
  const request = await xata.db.requests.create(reqObj);

  // get mentor name/email to send notification
  // the mentee is the current user
  const mentor = await getUserById(mentorId);
  if (!mentor) {
    res.status(500).json({ message: "Can't get mentor data" });
    return;
  }

  const mentorshipRequest = {
    mentee: { name: user.name, email: user.email },
    mentor: { name: mentor.name, email: mentor.email },
    messageRequest: message,
    longTerm: longterm
  };
  sendMentorshipRequestedEmail(mentorshipRequest);

  res.status(200).json({ request });
}
