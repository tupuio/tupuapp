import { getSession } from "next-auth/react";
import { getUser } from "../../services";
import { updateRequest, getRequestByQuery } from "../../services/requests";
import { createRelationship } from "../../services/relationships";

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

  const requestQuery = {
    requestId: req.body.requestId,
    mentorId: user.id,
  };

  // get the request data with this id and mentor
  const request = await getRequestByQuery(requestQuery);
  if (!request) {
    res.status(500).json({ message: "Can't get request data" });
    return;
  }

  // in order to confirm it
  //   create a new relationship
  const relationship = await createRelationship(request, res);
  if (!relationship) {
    res.status(500).json({ message: "Can't create new relationship data" });
    return;
  }

  // if successful, set the request as accepted
  // FIXME: or delete it?

  // remove xata column, update mentee/mentor as links, update new status
  const { xata, ...updatedRequest } = { 
    ...request,
    mentee: request.mentee.id,
    mentor: request.mentor.id,
    status: RequestStatusEnum.Accepted,
  };
  const responseRequest = await updateRequest(updatedRequest);
  if (!responseRequest) {
    res.status(500).json({ message: "Can't update request data" });
    return;
  } 

  //   send email notification
  // TODO:
  console.error("TODO: send email notification");

  res.status(200).json(relationship);

}
