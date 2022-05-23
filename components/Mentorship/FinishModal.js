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

return (
  <Modal size="xl" isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Close Mentorship</ModalHeader>
      <ModalCloseButton />
      <ModalBody>

      </ModalBody>

      <ModalFooter>

      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default FinishModal;