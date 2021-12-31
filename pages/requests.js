import { Box, Heading, Text } from "@chakra-ui/layout";
import RequestsList from "../components/RequestsList";

export default function RequestsPage() {
  return (
    <>
      <Heading mb={10}>Requests</Heading>
      <Box maxWidth="4xl">
        <Text>
          The following people are looking for a mentor and they specifically
          requested you. Please accept or deny the request. We provide template
          messages that you can customize.
        </Text>
        <RequestsList />
      </Box>
    </>
  );
}
