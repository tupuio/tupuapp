import { useState } from "react";
import { ProfileEditor } from "./editor";
import { ProfileViewer } from "./viewer";
import useSWR from "swr";
import { Alert, AlertIcon } from "@chakra-ui/alert";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ProfileForm = ({}) => {
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
      <ProfileEditor
        profile={data}
        setEditMode={setEditMode}
        mutateProfile={mutate}
      />
    );
  } else {
    return <ProfileViewer profile={data} setEditMode={setEditMode} />;
  }
};

export default ProfileForm;
