import { getXataClient } from "./xata";
import { RelationshipStatusEnum } from "../types/dbTablesEnums";

export async function createRelationship(request, res) {
  const relationshipObj = {
    mentor: request.mentor.id,
    mentee: request.mentee.id,
    message: request.message,
    status: RelationshipStatusEnum.Started,
    startDate: new Date().toJSON(), // UTC
  };
  const xata = getXataClient();
  const relationship = await xata.db.relationships.create(relationshipObj);
  return relationship;
}
