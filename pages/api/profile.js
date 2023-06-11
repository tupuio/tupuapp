import { getSession } from "next-auth/react";
import { getXataClient } from "../../services/xata";
import { sendPreferencesUpdatedEmail } from "../../utils/email";

async function getByEmail(email) {
  const xata = await getXataClient();
  return xata.db.users.filter("email", email).getFirst();
}

async function handleGET(session, req, res) {
  if (!session.user.email) {
    res.status(500).json({ message: "Session doesn't have email" });
  }
  const profile = await getByEmail(session.user.email);
  if (profile === null) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.status(200).json(profile);
}

async function handlePUT(session, req, res) {
  const profile = req.body.profile;

  const user = await getByEmail(session.user.email);
  if (user === null) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  user.update({
    name: profile.name,
    title: profile.title,
    company: profile.company,
    seniority: profile.seniority,
    biography: profile.biography,
    twitter: profile.twitter,
    linkedin: profile.linkedin,
    languages: profile.languages,
    timezone: profile.timezone,
    picture: profile.picture,
    mentor: {
      calendly: profile.mentor?.calendly,
      longterm: profile.mentor?.longterm,
      shortterm: profile.mentor?.shortterm,
      notifications: profile.mentor?.notifications,
      incognito: profile.mentor?.incognito,
    },
    published: profile.published
  });
  if (process.env.DEV_EMAIL_RECIPIENT) {
    const firstName = profile.name.split(" ")[0];
    sendPreferencesUpdatedEmail(profile.email, firstName);
  }

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
