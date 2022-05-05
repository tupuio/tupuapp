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

export const ProfileViewer = ({ profile, setEditMode }) => {
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
              <Td minWidth={400}>{profile.name}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={700}>Email</Td>
              <Td>{profile.email}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={700}>Title</Td>
              <Td>{profile.title}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={700}>Company </Td>
              <Td>
                <ReactMarkdown
                  components={ChakraUIRenderer(markdownTheme)}
                  skipHtml
                >

                  {profile.company}
                </ReactMarkdown>
              </Td>
            </Tr>
            <Tr></Tr>
            <Tr>
              <Td fontWeight={700}>Seniority </Td>
              <Td>
                <ReactMarkdown
                  components={ChakraUIRenderer(markdownTheme)}
                  skipHtml
                >

                  {profile.seniority}
                </ReactMarkdown>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight={700}>Biography / Motivation </Td>
              <Td>
                <ReactMarkdown
                  components={ChakraUIRenderer(markdownTheme)}
                  skipHtml
                >
                  {profile.biography}
                </ReactMarkdown>
              </Td>
            </Tr>
            {profile.picture && (
              <Tr>
                <Td fontWeight={700}>Picture</Td>
                <Td>
                  <Image
                    rounded={"md"}
                    alt={profile.name}
                    maxHeight={540}
                    src={profile.picture + "?tr=w-300,h-300,fo-auto"}
                    objectFit={"cover"}
                  />
                </Td>
              </Tr>
            )}
            {profile.twitter && (
              <Tr>
                <Td fontWeight={700}>Twitter</Td>
                <Td>
                  <a href={profile.twitter}>{profile.twitter}</a>
                </Td>
              </Tr>
            )}
            {profile.linkedin && (
              <Tr>
                <Td fontWeight={700}>LinkedIn</Td>
                <Td>
                  <a href={profile.linkedin}>{profile.linkedin}</a>
                </Td>
              </Tr>
            )}
            <Tr>
              <Td fontWeight={700}>Languages </Td>
              <Td>
                <ReactMarkdown
                  components={ChakraUIRenderer(markdownTheme)}
                  skipHtml
                >
                  {profile.languages}
                </ReactMarkdown>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight={700}>Timezone </Td>
              <Td>
                <ReactMarkdown
                  components={ChakraUIRenderer(markdownTheme)}
                  skipHtml
                >
                  {profile.timezone}
                </ReactMarkdown>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Button onClick={handleEditClick} colorScheme="greenButton" size="md">
          Edit profile
        </Button>
      </VStack>
    </Flex>
  );
};
