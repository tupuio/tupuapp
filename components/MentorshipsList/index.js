import { Alert, AlertIcon } from "@chakra-ui/alert";
import { SimpleGrid, Text } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import { useState, useRef } from "react";
import { useToast } from "@chakra-ui/toast";
import useSWR, { useSWRConfig } from "swr";
import MentorshipCard from "./MentorshipCard";
import TupuAlertDialog from "../TupuAlertDialog";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MentorshipsList = () => {
  const { data, error, mutate } = useSWR(
    "/api/mentorships?mode=mentee",
    fetcher
  );
  const { mutate: mutateCounter } = useSWRConfig();
  const [actionDialogParams, setActionDialogParams] = useState(null);
  const [isActionDialogLoading, setActionDialogLoading] = useState(false);
  const {
    isOpen: isAlertDialogOpen,
    onOpen: onAlertDialogOpen,
    onClose: onAlertDialogClose,
  } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  const mutateRelationshipsList = async (relationship, status) => {
    const updatedRelationship = { ...relationship, status };
    const newDataRecords = data.records.map((req) =>
      relationship.id === req.id ? updatedRelationship : req
    );
    const newData = { ...data, records: newDataRecords };
    mutate(newData);
    mutateCounter("/api/mentorshipsCount");
  };

  const changeMentorshipRelationship = async (params) => {
    const { relationship, endpoint, errorMsg, successMsg, status } = params;
    setActionDialogLoading(true);
    const resp = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        relationshipId: relationship.id,
        relationshipStatus: status,
      }),
    });
    if (resp.status > 299) {
      toast({
        title: "Error",
        description: errorMsg,
        status: "error",
        position: "top",
        isClosable: true,
      });
      setActionDialogLoading(false);
    } else {
      onAlertDialogClose();
      toast({
        title: "Success!",
        description: successMsg,
        status: "success",
        position: "top",
        isClosable: true,
      });
      mutateRelationshipsList(relationship, status);
    }
  };

  const closeMentorshipRelationship = async (relationship, status) => {
    const params = {
      relationship,
      endpoint: "closeMentorship",
      errorMsg: "Error closing mentorship relationship",
      successMsg: "The mentorship relationship was successfully closed.",
      status,
    };
    changeMentorshipRelationship(params);
  };

  const handleMentorshipAction = (params) => {
    setActionDialogParams(params);
    setActionDialogLoading(false);
    onAlertDialogOpen();
  };

  const handleCloseMentorship = (relationship, status) => {
    const params = {
      title: "Close mentorship",
      message: "Are you sure you want to close this mentorship?",
      action: "Close",
      onConfirm: () => closeMentorshipRelationship(relationship, status),
    };
    handleMentorshipAction(params);
  };

  if (error) {
    return (
      <Alert mt={10} status="error">
        <AlertIcon />
        Error retrieving the mentorships list. {error.toString()}
      </Alert>
    );
  }

  if (!data) {
    return (
      <div>
        <br />
        Loading..
      </div>
    );
  }

  if (data.records.length == 0) {
    return (
      <Text mt={10} fontWeight={700}>
        You don&apos;t have any active mentorship going on. If you did not
        request any mentor for mentorship, please do so. We will notify you when
        a mentor reply to your application.
      </Text>
    );
  }

  return (
    <>
      <Text>
        These are your active mentorships. You can book a call with the mentor,
        and close the mentorship.
      </Text>
      <SimpleGrid mt={10} columns={1} spacing={10}>
        {data.records.map((mentorship) => (
          <MentorshipCard
            key={mentorship.id}
            mentorship={mentorship}
            handleCloseMentorship={handleCloseMentorship}
          />
        ))}
      </SimpleGrid>
      <TupuAlertDialog
        isOpen={isAlertDialogOpen}
        isLoading={isActionDialogLoading}
        onClose={onAlertDialogClose}
        params={actionDialogParams}
        cancelRef={cancelRef}
      />
    </>
  );
};

export default MentorshipsList;
