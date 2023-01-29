import { Alert, AlertIcon } from "@chakra-ui/alert";
import { SimpleGrid, Text } from "@chakra-ui/layout";
import useSWR from "swr";
import MentorshipCard from "./MentorshipCard";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MentorshipsList = () => {
  const { data, error } = useSWR("/api/mentorships", fetcher);

  console.log('data', data)

  if (error) {
    return (
      <Alert mt={10} status="error">
        <AlertIcon />
        Error retrieving the mentorships list. {error.toString()}
      </Alert>
    );
  }

  if (!data) {
    return <div>Loading..</div>;
  }

  if (data.records.length == 0) {
    return (
      <Text mt={10} fontWeight={700}>
        You don&apos;t have any active mentorship going on. If you did not request any mentor for mentorship, please do so. We will notify you when
        a mentor reply to your application.
      </Text>
    );
  }

  return (
    <>
      <Text>
        These are your active mentorships. Go to their details, and from there you can book a call with the mentor, and manage the mentorship.
      </Text>
      <SimpleGrid mt={10} columns={1} spacing={10}>
        {data.records.map((mentorship) => (
          <MentorshipCard key={mentorship.id} mentorship={mentorship} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default MentorshipsList;
