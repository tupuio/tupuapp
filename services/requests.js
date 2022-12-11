import { getXataClient } from "./xata";

export async function getRequestByQuery(requestQuery) {
  const { mentorId, requestId } = requestQuery;
  const xata = getXataClient();
  return await xata.db.requests
    .select(["*", "mentee.*", "mentor.*"])
    .filter({
      mentor: mentorId,
      id: requestId,
    })
    .getFirst();
}

export async function updateRequest(request) {
  // take every property except id, and xata (internal use)
  const xata = getXataClient();
  const { id, ...requestObj } = {
    ...request,
    lastUpdateDate: new Date().toJSON() /* UTC */,
  };

  const updatedRequest = xata.db.requests.update(request.id, requestObj);
  // responseRequest = { id: 'rec_c8vfeqniqa4a376gjkh0', xata: { version: 1 } }
  // console.log('updateRequest request', responseRequest);
  return updatedRequest;
}
