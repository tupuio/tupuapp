import { useState } from "react";
import { RelationshipEditor } from "./editor";
import useSWR from "swr";
import { Alert, AlertIcon } from "@chakra-ui/alert";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const RelationshipForm = ({ }) => {
  const { data, error, mutate } = useSWR(`/api/relationships`, fetcher);
  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error getting data: {error}
      </Alert>
    );
  }

  if (!data || data.records?.length == 0) {
    return <div>Loading..</div>;
  }

  return (
    <RelationshipEditor
      relationship={data.records[0]}
      mutateRelationship={mutate}
    />
  );
};

export default RelationshipForm;
