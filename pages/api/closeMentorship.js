import { getSession } from "next-auth/react";
import { getUser } from "../../services";
import {
  updateRelationship,
  getRelationshipByQuery,
} from "../../services/relationships";
import {
  IsRelationshipStatusValid,
  RelationshipStatusEnum,
  RelationshipStatusToLabel,
} from "../../types/dbTablesEnums";
import {
  sendMentorMentorshipClosedEmail,
  sendMenteeMentorshipClosedEmail,
} from "../../utils/email";

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

  const relationshipQuery = {
    relationshipId: req.body.relationshipId,
    userId: user.id,
    status: RelationshipStatusEnum.Started,
  };

  // get the relationship data with this id and user id
  const relationship = await getRelationshipByQuery(relationshipQuery);
  if (!relationship) {
    res.status(500).json({ message: "Can't get relationship data" });
    return;
  }

  // set the relationship as finished

  // just make sure that the relationship status is valid
  const relationshipStatus = req.body.relationshipStatus;
  if (
    !IsRelationshipStatusValid(relationshipStatus) ||
    relationshipStatus === RelationshipStatusEnum.Started
  ) {
    res.status(400).json({ message: "Invalid relationship status" });
    return;
  }
  const isClosedByMentor = relationshipQuery.userId === relationship.mentor.id;
  const relationshipClosedBy = `Closed by ${
    isClosedByMentor ? "Mentor" : "Mentee"
  }`;
  // remove xata column, update mentee/mentor as links, update new status
  const { xata, ...updatedRelationship } = {
    ...relationship,
    mentee: relationship.mentee.id,
    mentor: relationship.mentor.id,
    status: relationshipStatus,
    endDate: new Date().toJSON() /* UTC */,
    notes: [relationship.notes, relationshipClosedBy]
      .filter(Boolean)
      .join(" - "),
  };
  const responseRelationship = await updateRelationship(updatedRelationship);
  if (!responseRelationship) {
    res.status(500).json({ message: "Can't update relationship data" });
    return;
  }

  // send email notification
  const { mentee, mentor } = relationship;
  //FIXME: in the future the feedback comes from the form
  const feedback = RelationshipStatusToLabel(relationshipStatus);

  if (isClosedByMentor) {
    // if mentor closed relationship
    sendMentorMentorshipClosedEmail({
      mentee,
      mentor,
      mentorFeedback: feedback,
    });
  } else {
    // if mentee
    sendMenteeMentorshipClosedEmail({
      mentee,
      mentor,
      menteeFeedback: feedback,
    });
  }
  res.status(200).json(responseRelationship);
}
