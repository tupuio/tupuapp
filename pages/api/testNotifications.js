import { getSession } from "next-auth/react";
import { getXataHeaders, DB_PATH } from "../../services";
import { 
  sendPreferencesUpdatedEmail,
  sendMentorshipRequestedEmail
} from "../../utils/email";

async function getByEmail(email) {
  const resp = await fetch(`${DB_PATH}/tables/users/query`, {
    method: "POST",
    headers: {
      ...(await getXataHeaders()),
    },
    body: JSON.stringify({
      filter: {
        email,
      },
    }),
  });

  const { records } = await resp.json();
  return records.length > 0 ? records[0] : null;
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
    sendPreferencesUpdatedEmail(profile.email, "Lorenzo")

    const mentorshipRequest = { 
      mentee: { name: "Mentee", email: "lorepirri+mentee@gmail.com" }, 
      mentor: { name: "Mentor", email: "lorepirri+mentor@gmail.com" }, 
      messageRequest: "Hi! I would like to talk to you!", 
      longTerm: true
    };  
    sendMentorshipRequestedEmail(mentorshipRequest);
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
