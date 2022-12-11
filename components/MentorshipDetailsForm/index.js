import { useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import { Alert, AlertIcon } from "@chakra-ui/alert";

import { MentorshipDetailsEditor } from "./editor";
import { MentorshipDetailsViewer } from "./viewer";

import MenteeCard from "../MenteesList/MenteeCard";
import MentorshipCard from "../MentorshipsList/MentorshipCard";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MentorshipDetailsForm = ({ id }) => {
  const { data: session } = useSession();
  const { data, error, mutate } = useSWR(`/api/relationships/${id}`, fetcher);
  const [editMode, setEditMode] = useState(false);

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error getting data for the mentorship relationship with id {id}. {error.toString()}
      </Alert>
    );
  }

  if (!data) {
    return <>Loading...</>;
  }
  
  return (
    <>
      { session?.user.id === data?.mentor?.id ?
        <MenteeCard mentorship={data} />
        :
        <MentorshipCard mentorship={data} />
      }
      { editMode ?
        <MentorshipDetailsEditor
          data={data}
          setEditMode={setEditMode}
          mutate={mutate}
        />
        :
        <MentorshipDetailsViewer
          data={data}
          setEditMode={setEditMode}
        />
      }
    </>
  )

  if (editMode) {
    return (
      <MentorshipDetailsEditor
        data={data}
        setEditMode={setEditMode}
        mutate={mutate}
      />
    );
  } else {
    return <MentorshipDetailsViewer data={data} setEditMode={setEditMode} />;
  }
};

export default MentorshipDetailsForm;
