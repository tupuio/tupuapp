import { Button } from "@chakra-ui/button";
import { Flex, Heading, VStack } from "@chakra-ui/layout";
import { Table, Tbody, Td, Tr } from "@chakra-ui/table";
import ReactMarkdown from "react-markdown";

export const ProfileViewer = ({ profile, setEditMode }) => {
  const handleEditClick = (ev) => {
    console.log("clicked");
    setEditMode(true);
  };
  return (
    <Flex py={10} maxWidth={800}>
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
              <Td fontWeight={700}>Biography</Td>
              <Td>
                <ReactMarkdown>{profile.biography}</ReactMarkdown>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Button onClick={handleEditClick} colorScheme="blue" size="md">
          Edit profile
        </Button>
      </VStack>
    </Flex>
  );
};
