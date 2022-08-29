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
import { useForm } from "react-hook-form";

const RequestModal = ({ mentor, isOpen, onClose }) => {
  const toast = useToast();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      message:
        "I'd love to have you as a mentor!\n\n\n I want to \u003cinsert what you'd like to achieve\u003e, and I think your mentorship would be really valuable.",
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
            <FormControl mt={4}>
              <FormLabel htmlFor="message">Your Message</FormLabel>
              <Textarea {...register("message")} id="message" rows={6} />
              <FormHelperText>
                Please tell {mentor.name} a bit about yourself and what are you
                hoping to learn or achieve. You can use Markdown for
                formatting. Leave an empty line between paragraphs.
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={"grayButton"} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button type="submit" colorScheme={"blueButton"}>
              Request
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default RequestModal;
