import { useState } from "react";
import { ExpertiseEditor } from "./editor";
import { ExpertiseViewer } from "./viewer";
import useSWR from "swr";
import { Alert, AlertIcon } from "@chakra-ui/alert";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ExpertiseForm = ({}) => {
  const { data, error, mutate } = useSWR("/api/profile", fetcher);
  const [editMode, setEditMode] = useState(false);

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error getting data: {error}
      </Alert>
    );
  }

  if (!data) {
    return <div>Loading..</div>;
  }

  if (editMode) {
    return (
      <ExpertiseEditor
        expertise={data}
        setEditMode={setEditMode}
        mutateExpertise={mutate}
      />
    );
  } else {
    return <ExpertiseViewer expertise={data} setEditMode={setEditMode} />;
  }
};

export default ExpertiseForm;
