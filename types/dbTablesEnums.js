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
  ClosedCompleted: "closed.completed",
  ClosedBusy: "closed.busy",
  ClosedNoGoodFit: "closed.nogoodfit",
  ClosedNotActive: "closed.notactive",
});
export const IsRelationshipStatusValid = (status) => Object.values(RelationshipStatusEnum).includes(status);

export const RelationshipStatusLabelsEnum = Object.freeze({
  [RelationshipStatusEnum.Started]: "Started",
  [RelationshipStatusEnum.ClosedCompleted]: "Completed",
  [RelationshipStatusEnum.ClosedBusy]: "Closed, because busy at the moment",
  [RelationshipStatusEnum.ClosedNoGoodFit]: "Closed, because was not the right fit",
  [RelationshipStatusEnum.ClosedNotActive]: "Closed, because not used anymore",
});
export const RelationshipStatusToLabel = (status) =>
    IsRelationshipStatusValid(status)
      ?RelationshipStatusLabelsEnum[status]
      :"not_valid";
