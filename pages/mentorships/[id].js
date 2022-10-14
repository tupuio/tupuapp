import { Box, Heading } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import useSWR from "swr";

import RelationshipForm from "../../components/RelationshipForm";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function RelationshipPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, mutate } = useSWR(`/api/relationships/${id}`, fetcher);

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error getting data for the relationship with id {id}. {error.toString()}
      </Alert>
    );
  }

  if (!data || data.records?.length === 0) {
    return <>Loading</>;
  }

  return (
    <>
      <Heading mb={10}>Your Mentorship</Heading>
      <Box maxWidth="4xl" borderWidth="1px" borderRadius="lg" bg="white">
        <RelationshipForm relationship={data.records[0]} mutateRelationship={mutate} />
      </Box>
    </>
  );
}
