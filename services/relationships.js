import { getXataHeaders, DB_PATH } from "./index";
import { RelationshipStatusEnum } from "../types/dbTablesEnums";

export async function createRelationship(request, res) {
  const relationshipObj = {
    mentor: request.mentor.id,
    mentee: request.mentee.id,
    message: request.message,
    status: RelationshipStatusEnum.Started,
    startDate: (new Date()).toJSON(), // UTC
  };
  const resp = await fetch(`${DB_PATH}/tables/relationships/data`, {
    method: "POST",
    headers: {
      ...(await getXataHeaders()),
    },
    body: JSON.stringify(relationshipObj),
  });

  if (resp.status > 299) {
    throw new Error(`Error creating relationship from request <${request.id}>: ${resp.status} ${await resp.text()}`);
  }
  const relationshipResponse = await resp.json();
  // relationshipResponse = { id: 'rec_cbd9furdi4p4jb0ing0g', xata: { version: 0 } }
  // console.log('createRelationship relationship', relationshipResponse);
  return relationshipResponse;
}