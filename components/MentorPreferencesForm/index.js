import { useState } from "react";
import { MentorPreferencesEditor } from "./editor";
import { MentorPreferencesViewer } from "./viewer";
import useSWR from "swr";
import { Alert, AlertIcon } from "@chakra-ui/alert";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MentorPreferencesForm = ({}) => {
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
      <MentorPreferencesEditor
        profile={data}
        setEditMode={setEditMode}
        mutateProfile={mutate}
      />
    );
  } else {
    return <MentorPreferencesViewer profile={data} setEditMode={setEditMode} />;
  }
};

export default MentorPreferencesForm;
