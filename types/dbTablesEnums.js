export const RequestStatusEnum = Object.freeze({
  Pending: "pending",
  Rejected: "rejected",
  RejectedBusy: "rejected.busy",
  RejectedNoGoodFit: "rejected.nogoodfit",
  Accepted: "accepted",
  Expired: "expired",
  Cancelled: "cancelled",
});
export const IsRequestStatusValid = (status) => Object.values(RequestStatusEnum).includes(status);

export const RelationshipStatusEnum = Object.freeze({
  Started: "started",
  Finished: "finished",
});
export const IsRelationshipStatusValid = (status) => Object.values(RelationshipStatusEnum).includes(status);
