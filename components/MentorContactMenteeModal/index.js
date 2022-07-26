import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Text, Stack } from "@chakra-ui/layout";
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
import { Checkbox } from '@chakra-ui/react'
import { useToast } from "@chakra-ui/toast";
import { useForm } from "react-hook-form";

const MentorContactMenteeModal = ({ request, isOpen, onClose }) => {
  const toast = useToast();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      message:
      `Hi there!\n\nI've seen your mentorship request and I'd like to ask you a couple of questions!\n\n\u003cinsert what you'd like to ask, clarify\u003e \n\nI hope to hear from you soon!`,
    },
  });
  const onSubmit = async (data) => {
    const resp = await fetch("/api/contactMentee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId: request.id,
        message: data.message,
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
      onClose();
    }
  };
  
  if (!isOpen) {
    return <></>;
  }
  if (!request) {
    return <>No mentee</>;
  }
  const { mentee } = request;
  
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Contact mentee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={5} direction='column'>
              <Text>
                Do you have questions about this request? We will deliver your message to <b>{mentee.name}</b>, and <i>reveal them your email</i> so that they can reply to your message.
              </Text>
              <FormControl mt={4}>
                <FormLabel htmlFor="message">Your Message</FormLabel>
                <Textarea {...register("message")} id="message" rows={6} />
                <FormHelperText>
                  Please tell {mentee.name} a bit about yourself and ask more details about their request for a mentorship.
                  You can use Markdown for formatting. Leave an empty line between paragraphs. Be kind as usual.
                </FormHelperText>
              </FormControl>
              <Checkbox colorScheme='green' isRequired>I agree with letting know {mentee.name} about the email address specified in my profile.</Checkbox>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Stack spacing={5} direction='row'>
              <Button type="submit" colorScheme={"blueButton"}>
                Send message
              </Button>
              <Button colorScheme={"grayButton"} mr={3} onClick={onClose}>
                Cancel
              </Button>
            </Stack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default MentorContactMenteeModal;
