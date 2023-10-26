import { getSession } from "next-auth/react";
import { getXataClient } from "../../services/xata";
import {
  sendPreferencesUpdatedEmail,
  sendMentorshipRequestedEmail,
  sendMenteeMentorshipClosedEmail,
  sendMentorContactMenteeEmail,
  sendMentorMentorshipClosedEmail,
  sendMentorshipRequestAcceptedEmail,
  sendMentorshipRequestCancelledEmail,
  sendMentorshipRequestRejectedEmail,
} from "../../services/email";
import { RequestStatusEnum } from "../../types/dbTablesEnums";

async function getByEmail(email) {
  const xata = getXataClient();
  return xata.db.users.filter({ email }).getFirst();
}

async function handleGET(session, req, res) {
  if (!session.user.email) {
    res.status(500).json({ message: "Session doesn't have email" });
  }
  console.log("test notifications", session.user.email);
  const profile = await getByEmail(session.user.email);
  if (profile === null) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  if (process.env.DEV_EMAIL_RECIPIENT) {
    // careful, the free quota is 100/day
    sendPreferencesUpdatedEmail(profile.email, "Lorenzo");

    // const mentee = { name: "Mentee", email: process.env.DEV_EMAIL_RECIPIENT };
    // const mentor = { name: "Mentor", email: process.env.DEV_EMAIL_RECIPIENT };

    // sendMenteeMentorshipClosedEmail({
    //   mentee,
    //   mentor,
    //   menteeFeedback: "the mentee feedback!",
    // });

    // sendMentorContactMenteeEmail({ mentee, mentor, mentorMessage: "this is a message for you mentee!" });

    // sendMentorMentorshipClosedEmail({
    //   mentee,
    //   mentor,
    //   mentorFeedback: "the mentor feedback!",
    // });

    // sendMentorshipRequestAcceptedEmail({ mentee, mentor, longTerm: false });
    // sendMentorshipRequestCancelledEmail({ mentee, mentor, longTerm: false });
    // sendMentorshipRequestRejectedEmail({ mentee, mentor, longTerm: true, requestStatus: RequestStatusEnum.Rejected });
    // sendMentorshipRequestRejectedEmail({ mentee, mentor, longTerm: true, requestStatus: RequestStatusEnum.RejectedBusy });
    // sendMentorshipRequestRejectedEmail({ mentee, mentor, longTerm: false, requestStatus: RequestStatusEnum.RejectedNoGoodFit });

    // const mentorshipRequest = {
    //   mentee,
    //   mentor,
    //   messageRequest: "Hi! I would like to talk to you!",
    //   longTerm: true
    // };
    // sendMentorshipRequestedEmail(mentorshipRequest);
  }

  res.status(200).json(profile);
}

async function handlePUT(session, req, res) {
  res.status(200).json({ message: "ok" });
}

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
  } else if (req.method === "PUT") {
    return handlePUT(session, req, res);
  } else {
    res
      .status(404)
      .json({ message: "Supported methods on this endpoint are GET and PUT" });
  }
}
