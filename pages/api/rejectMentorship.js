import { getSession } from "next-auth/react";
import { getUser } from "../../services";
import { updateRequest } from "../../services/requests";
import { RequestStatusEnum } from "../../types/dbTablesEnums";

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

  // set the request as rejected
  // FIXME: or delete it?

  const responseRequest = await updateRequest({
    id: req.body.requestId,
    status: RequestStatusEnum.Rejected,
  });
  if (!responseRequest) {
    res.status(500).json({ message: "Can't update request data" });
    return;
  } 

  //   send email notification
  // TODO:
  console.error("TODO: send email notification");

  res.status(200).json(relationship);

}
