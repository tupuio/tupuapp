import { Alert, AlertIcon } from "@chakra-ui/alert";
import { SimpleGrid, Text } from "@chakra-ui/layout";
import useSWR from "swr";
import ApplicationCard from "./ApplicationCard";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ApplicationsList = () => {
  const { data, error } = useSWR("/api/applications", fetcher);

  if (error) {
    return (
      <Alert mt={10} status="error">
        <AlertIcon />
        Error retrieving the applications. {error.toString()}
      </Alert>
    );
  }

  if (!data) {
    return <div>Loading..</div>;
  }

  if (data.records.length == 0) {
    return (
      <Text mt={10} fontWeight={700}>
        You didn&apos;t send any application for mentorship yet. Please, go to
        Find a mentor, and send your first one soon!
      </Text>
    );
  }

  return (
    <SimpleGrid mt={10} columns={1} spacing={10}>
      {data.records.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </SimpleGrid>
  );
};

export default ApplicationsList;
