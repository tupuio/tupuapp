import { useState } from "react";
import { ProfileEditor } from "./editor";
import { ProfileViewer } from "./viewer";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ProfileForm = ({}) => {
  const { data, error, mutate } = useSWR("/api/profile", fetcher);
  const [editMode, setEditMode] = useState(false);

  if (error) {
    return <div>failed to load</div>;
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
