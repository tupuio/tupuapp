import { Box, Heading } from "@chakra-ui/layout";
import MentorshipsList from "../components/MentorshipsList";

export default function MentorshipsPage() {
  return (
    <>
      <Heading mb={10}>Mentorships</Heading>
      <Box maxWidth="4xl">
        <MentorshipsList />
      </Box>
    </>
  );
}

MentorshipsPage.auth = {
  roles: ['mentor'],
  publishedOnly: true
}
