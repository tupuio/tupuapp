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

export const MentorSkillsEnum = Object.freeze({
  BusinessDevelopment: "business_development",
  CareerGrowth: "career_growth",
  ProductManagement: "product_management",
  ProjectManagement: "project_management",
  CommunityMaker: "community_maker",
  DataScienceAnalytics: "datascience_analytics",
  DevOpsSRE: "devops_sre",
  EngineeringManagement: "engeneering_management",
  People: "hr_people",
  Inclusion: "inclusion",
  Marketing:"marketing",
  Sales: "sales",
  Startup: "starup",
  UXUI: "ux_ui",
  SoftwareEngineering: "software_engineering",
  TechnicalInterviews: "sde_technical_interviews",
});
export const IsMentorSkillValid = (skill) => Object.values(MentorSkillsEnum).includes(skill);

export const MentorSkillLabelsEnum = Object.freeze({
  [MentorSkillsEnum.BusinessDevelopment]: "Business Development",
  [MentorSkillsEnum.CareerGrowth]: "Career Growth",
  [MentorSkillsEnum.ProductManagement]: "Product Management",
  [MentorSkillsEnum.ProjectManagement]: "Project Management",
  [MentorSkillsEnum.CommunityMaker]: "Community Maker",
  [MentorSkillsEnum.DataScienceAnalytics]: "Data Science / Analytics",
  [MentorSkillsEnum.DevOpsSRE]: "Dev Ops / SRE",
  [MentorSkillsEnum.EngineeringManagement]: "Engineering Management",
  [MentorSkillsEnum.People]: "People",
  [MentorSkillsEnum.Inclusion]: "Inclusion",
  [MentorSkillsEnum.Marketing]: "Marketing",
  [MentorSkillsEnum.Sales]: "Sales",
  [MentorSkillsEnum.Startup]: "Startup",
  [MentorSkillsEnum.UXUI]: "UX / UI Design & Research",
  [MentorSkillsEnum.SoftwareEngineering]: "Software Engineering",
  [MentorSkillsEnum.SDETechnicalInterviews]: "SDE Technical Interviews",
});
export const MentorSkillToLabel = (skill) =>
      IsMentorSkillValid(skill)
      ?MentorSkillLabelsEnum[skill]
      :"not_valid";
