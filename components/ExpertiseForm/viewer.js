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

export const ExpertiseViewer = ({ expertise, setEditMode }) => {
  const handleEditClick = (ev) => {
    setEditMode(true);
  };
  return (
    <Flex py={10} px={10}>
      <VStack>
        <Table variant="simple" size="lg">
          <Tbody>
            <Tr>
              <Td fontWeight={700}>Name</Td>
              <Td minWidth={400}>{expertise.name}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={700}>Email</Td>
              <Td>{expertise.email}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={700}>Title</Td>
              <Td>{expertise.title}</Td>
            </Tr>
            {expertise.picture && (
              <Tr>
                <Td fontWeight={700}>Picture</Td>
                <Td>
                  <Image
                    rounded={"md"}
                    alt={expertise.name}
                    maxHeight={540}
                    src={expertise.picture + "?tr=w-300,h-300,fo-auto"}
                    objectFit={"cover"}
                  />
                </Td>
              </Tr>
            )}
            {expertise.twitter && (
              <Tr>
                <Td fontWeight={700}>Twitter</Td>
                <Td>
                  <a href={expertise.twitter}>{expertise.twitter}</a>
                </Td>
              </Tr>
            )}
            {expertise.linkedin && (
              <Tr>
                <Td fontWeight={700}>LinkedIn</Td>
                <Td>
                  <a href={expertise.linkedin}>{expertise.linkedin}</a>
                </Td>
              </Tr>
            )}
            <Tr>
              <Td fontWeight={700}>Biography / Motivation </Td>
              <Td>
                <ReactMarkdown
                  components={ChakraUIRenderer(markdownTheme)}
                  skipHtml
                >
                  {expertise.biography}
                </ReactMarkdown>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Button onClick={handleEditClick} colorScheme="greenButton" size="md">
          Edit expertise
        </Button>
      </VStack>
    </Flex>
  );
};
