import { getSession } from "next-auth/react";
import { getXataClient } from "../../../services/xata";
import { getUser } from "../../../services";
import { RequestStatusEnum } from "../../../types/dbTablesEnums";

export default async function handler(req, res) {
  const xata = getXataClient();
  const session = await getSession({ req });
  if (!session) {
    res.status(403).json({
      error: "You must be signed in to access this API.",
    });
    return;
  }

  const currentUser = await getUser(session);

  // this does not work:
  // $includesAll: [{ $contains: "mentor" }, { $contains: "test" }],

  const allFilters = [
    { $exists: "roles" },
    {
      roles: {
        $includes: "mentor",
      },
    },
    {
      $not: {
        "id": currentUser.id
      }
    }
  ];

  if (
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_DEV_LOGIN === "true"
  ) {
    allFilters.push({ roles: { $includes: "test" } });
  } else {
    allFilters.push({ $not: { roles: { $includes: "test" } } });
  }

  // first get all the mentors, excluding the current user
  const mentors = await xata.db.users
    .filter({
      $all: allFilters,
    })
    .getAll();


  // next get all the requests the current user has made 
  const requests = await xata.db.requests
    .select(["mentor.id"])
    .filter({
      "mentee.id": currentUser.id,
      status: RequestStatusEnum.Pending,
    })
    .getAll();

  // exclude any mentors for which the current user has a pending request
  const filteredMentors = mentors.filter((mentor) => {

    // iterate through the requests array
    // if any of the request mentor IDs are contained with the mentor ID array 
    // exclude the mentor record
    return !requests.some((request) => {
      const requestMentorId = request?.mentor?.id

      return requestMentorId ? requestMentorId === mentor.id : false
    })

  })



  res.status(200).json({ records: filteredMentors });
}
