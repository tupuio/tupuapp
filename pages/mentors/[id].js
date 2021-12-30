import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Heading } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function MentorPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/mentorProfile?id=${id}`, fetcher);

  if (error) {
    console.log(error);
    return (
      <Alert status="error">
        <AlertIcon />
        Error getting data for mentor profile with id {id}.
      </Alert>
    );
  }

  return <Heading mb={10}>{id}</Heading>;
}
