import { Alert, AlertIcon } from "@chakra-ui/alert";
import { SimpleGrid, Text } from "@chakra-ui/layout";
import useSWR from "swr";
import RequestCard from "./RequestCard";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const RequestsList = () => {
  const { data, error } = useSWR("/api/requests", fetcher);

  if (error) {
    return (
      <Alert mt={10} status="error">
        <AlertIcon />
        Error retrieving the requests. {error.toString()}
      </Alert>
    );
  }

  if (!data) {
    return <div>Loading..</div>;
  }

  if (data.records.length == 0) {
    return (
      <Text mt={10} fontWeight={700}>
        You don&apos;t have any mentorship requests yet. We will notify you when
        someone requests you as a mentor.
      </Text>
    );
  }

  return (
    <SimpleGrid mt={10} columns={1} spacing={10}>
      {data.records.map((request) => (
        <RequestCard key={request.id} request={request} />
      ))}
    </SimpleGrid>
  );
};

export default RequestsList;
