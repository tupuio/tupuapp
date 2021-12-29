import { Button } from "@chakra-ui/button";
import { Flex, Heading, VStack } from "@chakra-ui/layout";
import { Table, Tbody, Td, Tr } from "@chakra-ui/table";

export const ProfileViewer = ({ profile, setEditMode }) => {
  const handleEditClick = (ev) => {
    console.log("clicked");
    setEditMode(true);
  };
  return (
    <Flex py={10}>
      <VStack>
        <Heading>Your profile</Heading>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td fontWeight={700}>Name</Td>
              <Td>{profile.name}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={700}>Email</Td>
              <Td>{profile.email}</Td>
            </Tr>
            {profile.twitter && (
              <Tr>
                <Td fontWeight={700}>Twitter</Td>
                <Td>{profile.twitter}</Td>
              </Tr>
            )}
            {profile.linkedin && (
              <Tr>
                <Td fontWeight={700}>LinkedIn</Td>
                <Td>{profile.linkedin}</Td>
              </Tr>
            )}
            <Tr>
              <Td fontWeight={700}>Biography</Td>
              <Td>{profile.biography}</Td>
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
