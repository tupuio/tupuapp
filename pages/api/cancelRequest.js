import { getSession } from "next-auth/react";
import { getRequestById, getUser } from "../../services";
import { updateRequest } from "../../services/requests";
import { RequestStatusEnum } from "../../types/dbTablesEnums";
import { sendMentorshipRequestCancelledEmail } from "../../utils/email";

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

  const requestId = req.body.requestId;
  const menteeId = user.id;

  const request = await getRequestById(requestId);
  if (!request) {
    res.status(500).json({ message: "Can't get request data" });
    return;
  }
  const { mentee, mentor } = request;

  // the mentee in the request must be the same as this current user
  if (mentee.id !== menteeId) {
    res.status(500).json({ message: "Can't validate request data" });
    return;
  }

  // set the request as cancelled
  // FIXME: or delete it?

  // remove xata column, update mentee/mentor as links, update new status
  const { xata, ...updatedRequest } = {
    ...request,
    mentee: request.mentee.id,
    mentor: request.mentor.id,
    status: RequestStatusEnum.Cancelled,
    lastUpdateDate: new Date().toJSON() /* UTC */,
  };
  const responseRequest = await updateRequest(updatedRequest);
  if (!responseRequest) {
    res.status(500).json({ message: "Can't update request data" });
    return;
  }

  // send email notification
  // TODO: long term should come from the request
  sendMentorshipRequestCancelledEmail({ mentee, mentor, longTerm: request.longterm });

  res.status(200).json(responseRequest);
}
