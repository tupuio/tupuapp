import { getXataHeaders, DB_PATH } from "./index";

export async function getRequestByQuery(requestQuery) {
  const { mentorId, requestId } = requestQuery;
  const resp = await fetch(`${DB_PATH}/tables/requests/query`, {
    method: "POST",
    headers: {
      ...(await getXataHeaders()),
    },
    body: JSON.stringify({
      columns: ["*", "mentee.*", "mentor.*"],
      filter: {
        mentor: mentorId,
        id: requestId,        
      },
    }),
  });
  if (resp.status > 299) {
    throw new Error(`Error getting request <${requestId}>: ${resp.status} ${await resp.text()}`);
  }
  const { records } = await resp.json();
  const request =  records.length > 0 ? records[0] : null;
  // console.log('getRequestByQuery request', request);
  return request;
}

export async function updateRequest(request) {
  // take every property except id, and xata (internal use)
  const {id, ...requestObj} = { ...request, lastUpdateDate: (new Date()).toJSON(), /* UTC */ };
  const resp = await fetch(`${DB_PATH}/tables/requests/data/${request.id}`, {
    method: "PUT",
    headers: {
      ...(await getXataHeaders()),
    },
    body: JSON.stringify(requestObj),
  });
  if (resp.status > 299) {
    throw new Error(`Error updating request <${request.id}>: ${resp.status} ${await resp.text()}`);
  }
  const responseRequest = await resp.json();
  // responseRequest = { id: 'rec_c8vfeqniqa4a376gjkh0', xata: { version: 1 } }
  // console.log('updateRequest request', responseRequest);
  return responseRequest;
}
