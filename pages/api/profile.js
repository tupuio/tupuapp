import { getXataHeaders, DB_PATH } from "../../services";

async function getByEmail(email) {
  const resp = await fetch(`${DB_PATH}/users/_query`, {
    method: "POST",
    headers: {
      ...(await getXataHeaders()),
    },
    body: JSON.stringify({
      _filter: {
        email,
      },
    }),
  });

  const { records } = await resp.json();
  return records.length > 0 ? records[0] : null;
}

async function handleGET(req, res) {
  const profile = await getByEmail("madalina@tupu.io");
  if (profile === null) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.status(200).json(profile);
}

async function handlePUT(req, res) {
  const profile = req.body.profile;

  const data = await getByEmail("madalina@tupu.io");
  const response = await fetch(`${DB_PATH}/users/${data["_id"]}`, {
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
      roles: data.roles,
      picture: data.picture,
      mentor: {
        status: data.mentor?.status,
        hide: data.mentor?.hide,
      },
    }),
  });
  if (response.status > 299) {
    res.status(500).json({ message: `save failed.` });
    return;
  }

  res.status(200).json({ message: "ok" });
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    return handleGET(req, res);
  } else if (req.method === "PUT") {
    return handlePUT(req, res);
  } else {
    res
      .req(404)
      .json({ message: "Supported methods on this endpoint are GET and PUT" });
  }
}
