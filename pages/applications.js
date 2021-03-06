import { Box, Heading, Text } from "@chakra-ui/layout";
import ApplicationsList from "../components/ApplicationsList";

export default function ApplicationsPage() {
  return (
    <>
      <Heading mb={10}>Applications</Heading>
      <Box maxWidth="4xl">
        <Text>
          You have sent the application for mentorship to the following people. 
          Please, be patient, they will accept or deny your application. You can 
          cancel an application at anytime, please provide a kind message to the 
          mentor while doing so.
        </Text>
        <ApplicationsList />
      </Box>
    </>
  );
}
