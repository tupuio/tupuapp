import { useState, useRef } from "react";

import { Alert, AlertIcon } from "@chakra-ui/alert";
import { SimpleGrid, Text } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import { useToast } from "@chakra-ui/toast";

import useSWR from "swr";

import TupuAlertDialog from "../TupuAlertDialog";
import ApplicationCard from "./ApplicationCard";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ApplicationsList = () => {
  const { data, error, mutate } = useSWR("/api/applications", fetcher);
  const [actionDialogParams, setActionDialogParams] = useState(null);
  const [isActionDialogLoading, setActionDialogLoading] = useState(false);
  const { isOpen: isAlertDialogOpen, onOpen: onAlertDialogOpen, onClose: onAlertDialogClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  const mutateApplicationsList = async (application) => {
    const newDataRecords = data.records.filter( req => application.id !== req.id );
    const newData = { ...data, records: newDataRecords };
    mutate(newData);
  }

  const changeMentorshipRequest = async (params) => {
    const { application, endpoint, errorMsg, successMsg } = params;
    setActionDialogLoading(true);
    const resp = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId: application.id,
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
        status: 'success',
        position: "top",
        isClosable: true,
      });
      mutateApplicationsList(application);
    }    
  }

  const cancelApplication = async (application) => {
    const params = { 
      application,
      endpoint: "cancelRequest",
      errorMsg: "Error revoking mentorship request",
      successMsg: "The mentorship request was successfully revoked."
    };
    changeMentorshipRequest(params);
  }

  const handleApplicationAction = (params) => {
    setActionDialogParams(params);
    setActionDialogLoading(false);
    onAlertDialogOpen();
  };

  const handleCancelApplication = (application) => {
    const params = { 
      title: "Revoke mentorship application",
      message: "Are you sure you want to revoke this mentorship request?",
      action: "Revoke",
      onConfirm: () => cancelApplication(application)
    };
    handleApplicationAction(params);
  };

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
    <>
      <SimpleGrid mt={10} columns={1} spacing={10}>
        {data.records.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            handleCancel={handleCancelApplication}
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

export default ApplicationsList;
