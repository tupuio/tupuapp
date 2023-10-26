import { getSession } from "next-auth/react";
import { getUser } from "../../services";
import { updateRequest, getRequestByQuery } from "../../services/requests";
import { IsRequestStatusValid } from "../../types/dbTablesEnums";
import { sendMentorshipRequestRejectedEmail } from "../../services/email";

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

  // set the request as rejected
  // FIXME: or delete it?

  // just make sure that the request status is valid
  const requestStatus = req.body.requestStatus;
  if (!IsRequestStatusValid(requestStatus)) {
    res.status(400).json({ message: "Invalid request status" });
    return;
  }

  // remove xata column, update mentee/mentor as links, update new status
  const { xata, ...updatedRequest } = {
    ...request,
    mentee: request.mentee.id,
    mentor: request.mentor.id,
    status: requestStatus,
  };
  const responseRequest = await updateRequest(updatedRequest);
  if (!responseRequest) {
    res.status(500).json({ message: "Can't update request data" });
    return;
  }

  // send email notification
  sendMentorshipRequestRejectedEmail({ mentee: request.mentee, mentor: request.mentor, longTerm: request.longterm, requestStatus });

  res.status(200).json(responseRequest);

}
