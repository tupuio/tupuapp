import { Button } from "@chakra-ui/button";
import { Flex, Text, VStack } from "@chakra-ui/layout";
import { Table, Tbody, Td, Tr } from "@chakra-ui/table";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { Image } from "@chakra-ui/image";

const markdownTheme = {
  p: (props) => {
    const { children } = props;
    return <Text mb={2}>{children}</Text>;
  },
};

export const MentorshipDetailsViewer = ({ data: relationship, setEditMode }) => {
  const handleEditClick = (ev) => {
    setEditMode(true);
  };
  console.log("relationship: ", relationship)
  return (
    <Flex py={10} px={10}>
      <VStack>
        <Table variant="simple" size="lg">
          <Tbody>
            <Tr>
              <Td fontWeight={700}>mentorship details id</Td>
              <Td minWidth={400}>{relationship.id}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={700}>Goals</Td>
              <Td minWidth={400}>{relationship?.goals?.trim() || '-'}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={700}>Shared notes</Td>
              <Td minWidth={400}>{relationship?.notes?.trim() || '-'}</Td>
            </Tr>
          </Tbody>
        </Table>
        <Button onClick={handleEditClick} colorScheme="greenButton" size="md">
          Edit Notes
        </Button>        
      </VStack>
    </Flex>
  );
};
