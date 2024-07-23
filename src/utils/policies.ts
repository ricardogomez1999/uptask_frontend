import { Project, TeamMember } from "../Types";

export const isManager = (
  managerId: Project["manager"],
  userId: TeamMember["_id"]
) => {
  return managerId === userId;
};
