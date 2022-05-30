import { getSession } from "next-auth/react";
import { getXataHeaders, DB_PATH, getUser } from "../../../services";

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
      .json({ message: `Unsupported method on this endpoint: ${req.method}` });
  }
}

async function handleGET(session, req, res) {
  const user = await getUser(session);
  if (!user) {
    res.status(500).json({ message: "Can't get user data" });
    return;
  }

  const resp = await fetch(`${DB_PATH}/tables/relationships/query`, {
    method: "POST",
    headers: {
      ...(await getXataHeaders()),
    },
    body: JSON.stringify({
      columns: ["*", "mentor.*", "mentee.*"],
      filter: {
        id: req.query.id,
      },
    }),
  });
  if (resp.status > 299) {
    res.status(resp.status).json(await resp.json());
    return;
  }
  const relationship = await resp.json();

  // Only mentors are public, and only the ones that are not hidden
  // if (!user.roles || !user.roles.includes("mentor") || user.mentor?.hide) {
  //   res.status(404).json({
  //     error: "User not found",
  //   });
  //   return;
  // }

  res.status(200).json(relationship);
}

async function handlePUT(session, req, res) {
  const user = await getUser(session);
  if (!user) {
    res.status(500).json({ message: "Can't get user data" });
    return;
  }
  const relationship = req.body.relationship;

  console.log('update relationship', relationship)
  // res.status(200).json({ message: "ok" });
  // return

  const resp = await fetch(`${DB_PATH}/tables/relationships/data/${req.query.id}`, {
    method: "PUT",
    headers: {
      ...(await getXataHeaders()),
    },
    body: JSON.stringify({
      goals: relationship.goals,
      notes: relationship.notes,
    }),
  });
  if (resp.status > 299) {
    res.status(resp.status).json(await resp.json());
    return;
  }

  res.status(200).json({ message: "ok" });
}
