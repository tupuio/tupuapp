import { getSession } from "next-auth/react";
import { getXataHeaders, DB_PATH } from "../../services";

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
  const profile = await getByEmail(session.user.email);
  if (profile === null) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.status(200).json(profile);
}

async function handlePUT(session, req, res) {
  const profile = req.body.profile;

  const data = await getByEmail(session.user.email);
  const response = await fetch(`${DB_PATH}/tables/users/data/${data["id"]}`, {
    method: "PUT",
    headers: {
      ...(await getXataHeaders()),
    },
    body: JSON.stringify({
      name: profile.name,
      email: profile.email,
      title: profile.title,
      twitter: profile.twitter,
      linkedin: profile.linkedin,
      biography: profile.biography,
      picture: profile.picture,
      roles: data.roles,
      mentor: {
        status: data.mentor?.status,
        hide: data.mentor?.hide,
      },
    }),
  });
  if (response.status > 299) {
    res.status(response.status).json(await response.json());
    return;
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
