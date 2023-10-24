import { Box, Heading } from "@chakra-ui/layout";
import MentorPreferencesForm from "../components/MentorPreferencesForm";

export default function PreferencesPage() {
  return (
    <>
      <Heading mb={10}>Preferences</Heading>
      <Box maxWidth="4xl" borderWidth="1px" borderRadius="lg" bg="white">
        <MentorPreferencesForm />
      </Box>
    </>
  );
}

PreferencesPage.auth = {
  roles: ['mentee'],
  publishedOnly: true
}
