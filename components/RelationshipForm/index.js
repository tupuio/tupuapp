import { useState } from "react";
import { RelationshipEditor } from "./editor";
import useSWR from "swr";
import { Alert, AlertIcon } from "@chakra-ui/alert";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const RelationshipForm = ({ relationship, mutateRelationship }) => {

  return (
    <RelationshipEditor
      relationship={relationship}
      mutateRelationship={mutateRelationship}
    />
  );
};

export default RelationshipForm;
