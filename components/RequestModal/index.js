import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Textarea } from "@chakra-ui/textarea";
import { useToast } from "@chakra-ui/toast";
import { Switch } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

const RequestModal = ({ mentor, isOpen, onClose }) => {
  const toast = useToast();
  const { mutate } = useSWRConfig();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      message:
        "I'd love to have you as a mentor!\n\n\n I want to \u003cinsert what you'd like to achieve\u003e, and I think your mentorship would be really valuable.",
      longterm: false,
    },
  });

  const onSubmit = async (data) => {
    const resp = await fetch("/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mentorId: mentor.id,
        message: data.message,
        longterm: data.longterm,
      }),
    });

    if (resp.status > 299) {
      toast({
        title: "Error",
        description: "Error creating request",
        status: "error",
        position: "top",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success!",
        description: "The mentorship request was successfully sent",
        status: "success",
        position: "top",
        isClosable: true,
      });
      mutate("/api/applicationsCount");
      onClose();
    }
  };

  if (!isOpen) {
    return <></>;
  }
  if (!mentor) {
    return <>No mentor</>;
  }
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Request mentor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              We will ask <b>{mentor.name}</b> for you if they can take you as a
              mentee. You can customize the message that we&apos;ll send, which
              greatly improves your chances.
            </Text>
            <br />
            <FormControl mt={4}>
              <FormLabel htmlFor="message">Your Message</FormLabel>
              <Textarea {...register("message")} id="message" rows={6} />
              <FormHelperText>
                Please tell {mentor.name} a bit about yourself and what are you
                hoping to learn or achieve. You can use Markdown for formatting.
                Leave an empty line between paragraphs.
              </FormHelperText>
            </FormControl>
            <br />
            <FormControl display="flex" alignItems="center" mt={2}>
              <FormLabel htmlFor="longterm" mb={1}>
                Long term mentorship
              </FormLabel>
              <Switch {...register("longterm")} id="longterm" />
            </FormControl>
            <br />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={"grayButton"} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              type="submit"
              colorScheme={"blueButton"}
              isLoading={isSubmitting}
            >
              Request
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default RequestModal;
