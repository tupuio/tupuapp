import { MENTOR_ROLE } from "../constants"

export const doesUserHaveRole = (session, role) => {
  return session?.user?.roles?.includes(role)
}

