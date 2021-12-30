import { Button } from "@chakra-ui/button";
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

const RequestModal = ({ mentor, isOpen, onClose }) => {
  if (!mentor) {
    return <>No mentor</>;
  }
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Request mentor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            We will ask <b>{mentor.name}</b> for you if they can take you as a
            mentee. You can customize the message that we'll send, which can
            greatly improve your chances.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme={"grayButton"} mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme={"blueButton"}>Request</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RequestModal;
