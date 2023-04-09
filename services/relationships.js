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
  console.log(relationship)
  return relationship;
}

export async function getRelationshipByQuery(relationshipQuery) {
  const { userId, relationshipId, status } = relationshipQuery;
  const xata = getXataClient();
  return await xata.db.relationships
    .select(["*", "mentee.*", "mentor.*"])
    .filter({
      id: relationshipId,
      status,
    })
    .filter({$any: [
      { mentor: userId },
      { mentee: userId },
    ]})
    .getFirst();
}

export async function updateRelationship(relationship) {
  // take every property except id, and xata (internal use)
  const xata = getXataClient();
  const { id, ...relationshipObj } = {
    ...relationship,
    lastUpdateDate: new Date().toJSON() /* UTC */,
  };

  const updatedRelationship = xata.db.relationships.update(relationship.id, relationshipObj);
  // responseRelationship = { id: 'rec_c8vfeqniqa4a376gjkh0', xata: { version: 1 } }
  // console.log('updateRelationship relationship', responseRelationship);
  return updatedRelationship;
}
