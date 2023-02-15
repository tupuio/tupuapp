import { Button } from "@chakra-ui/button";
import { Flex, VStack } from "@chakra-ui/layout";
import { Table, Tbody, Td, Tr } from "@chakra-ui/table";
import {
  Alert,
  AlertIcon,
} from '@chakra-ui/react'

export const MentorPreferencesViewer = ({ profile, setEditMode }) => {
  const handleEditClick = (ev) => {
    setEditMode(true);
  };
  return (
    <Flex py={10} px={10}>
      <VStack>
      {!profile.mentor ? (
        <Alert status='warning'>
          <AlertIcon />
          You preferences are not filled yet! Please edit your preferences to start with your mentoring journey.
        </Alert>        
      ) :  (        
        <Table variant="simple" size="lg">
          <Tbody>
            <Tr>
              <Td fontWeight={700}>Calendar Event Link</Td>
              {profile.mentor.calendly ? (
                <Td minWidth={400}>{profile.mentor.calendly}</Td>
              ) : (
                <Td minWidth={400}>
                  <Alert status='warning'>
                    <AlertIcon />
                    Without a calendar link, your mentees will have to write you an email to set up calls.
                  </Alert>
                </Td>
              )}
            </Tr>
            <Tr>
              <Td fontWeight={700}>Short term mentorships</Td>
              <Td>{profile.mentor.shortterm ? "Yes" : "No"}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={700}>Long term mentorships</Td>
              <Td>{profile.mentor.longterm ? "Yes" : "No"}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={700}>Receive expiring mentorship request notifications</Td>
              <Td>{profile.mentor.notifications ? "Yes" : "No"}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={700}>Incognito Mode</Td>
              <Td>{profile.mentor.incognito ? "Active" : "Not Active"}</Td>
            </Tr>
          </Tbody>
        </Table>
        )}
        <Button onClick={handleEditClick} colorScheme="greenButton" size="md">
          Edit Preferences
        </Button>
      </VStack>
    </Flex>
  );
};
