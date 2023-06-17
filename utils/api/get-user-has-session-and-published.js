import { SIGNED_IN_ERROR_MESSAGE, ACCESS_DENIED_ERROR_MESSAGE } from "../../constants/api-constants";

export default async function getHasSessionAndPublished(session, res) {
  if (!session) {
    res.status(403).json({
      error: SIGNED_IN_ERROR_MESSAGE,
    });

    return false;
  }

  if (!session?.user?.published) {
    res.status(403).json({
      error: ACCESS_DENIED_ERROR_MESSAGE,
    });
    return false;
  }

  return true
}