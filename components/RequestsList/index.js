import { Alert, AlertIcon } from "@chakra-ui/alert";
import { SimpleGrid, Text } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import { useState, useRef } from "react";
import { useToast } from "@chakra-ui/toast";
import useSWR, { useSWRConfig } from 'swr'
import RequestCard from "./RequestCard";
import MentorContactMenteeModal from "../MentorContactMenteeModal";
import TupuAlertDialog from "../TupuAlertDialog";
import { RequestStatusEnum } from "../../types/dbTablesEnums";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const RequestsList = () => {
  const { data, error, mutate } = useSWR("/api/requests", fetcher);
  const [contactedMenteeRequest, setContactedMenteeRequest] = useState(null);
  const [actionDialogParams, setActionDialogParams] = useState(null);
  const [isActionDialogLoading, setActionDialogLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAlertDialogOpen, onOpen: onAlertDialogOpen, onClose: onAlertDialogClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  const handleContactMentee = (request) => {
    setContactedMenteeRequest(request);
    onOpen();
  };
  const mutateRequestsList = async (request, status) => {
      const updatedRequest = { ...request, status };
      const newDataRecords = data.records.map( req => request.id === req.id ? updatedRequest : req );
      const newData = { ...data, records: newDataRecords };
      console.log('data',data);
      console.log('new data', newData);
      mutate(newData);
  }
  
  const changeMentorshipRequest = async (params) => {
    const { request, endpoint, errorMsg, successMsg, status } = params;
    setActionDialogLoading(true);
    const resp = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId: request.id,
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
      mutateRequestsList(request, status);
    }    
  }

  const acceptMentorshipRequest = async (request) => {
    const params = { 
      request,
      endpoint: "acceptMentorship",
      errorMsg: "Error accepting mentorship request",
      successMsg: "The mentorship request was successfully accepted!",
      status: RequestStatusEnum.Accepted,
    };
    changeMentorshipRequest(params);
  }

  const rejectMentorshipRequest = async (request) => {
    const params = { 
      request,
      endpoint: "rejectMentorship",
      errorMsg: "Error rejecting mentorship request",
      successMsg: "The mentorship request was successfully rejected.",
      status: RequestStatusEnum.Rejected,
    };
    changeMentorshipRequest(params);
  }

  const handleMentorshipAction = (params) => {
    setActionDialogParams(params);
    setActionDialogLoading(false);
    onAlertDialogOpen();
  };

  const handleAcceptMentorship = (request) => {
    const params = { 
      title: "Accept mentorship",
      message: "Are you sure you want to confirm this mentorship?",
      action: "Accept",
      onConfirm: () => acceptMentorshipRequest(request)
    };
    handleMentorshipAction(params);
  };
    
  const handleRejectMentorship = (request) => {
    const params = { 
      title: "Reject mentorship",
      message: "Are you sure you want to reject this mentorship?",
      action: "Reject",
      onConfirm: () => rejectMentorshipRequest(request)
    };
    handleMentorshipAction(params);
  };    
  
  if (error) {
    return (
      <Alert mt={10} status="error">
        <AlertIcon />
        Error retrieving the requests. {error.toString()}
      </Alert>
    );
  }

  if (!data) {
    return <div><br />Loading..</div>;
  }

  let requestsList = data.records.filter((request) => request.status === RequestStatusEnum.Pending);
  
  if (requestsList.length == 0) {
    return (
      <Text mt={10} fontWeight={700}>
        You don&apos;t have any mentorship requests yet. We will notify you when
        someone requests you as a mentor.
      </Text>
    );
  }

  return (
    <>
      <SimpleGrid mt={10} columns={1} spacing={10}>
        {requestsList.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            handleContact={handleContactMentee}
            handleAccept={handleAcceptMentorship}
            handleReject={handleRejectMentorship}
          />
        ))}
      </SimpleGrid>
      <MentorContactMenteeModal
        request={contactedMenteeRequest}
        isOpen={isOpen}
        onClose={onClose}
      />
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

export default RequestsList;
