import { Box, Heading } from "@chakra-ui/layout";
import MenteesList from "../../components/MenteesList";

export default function MenteesPage() {
  return (
    <>
      <Heading mb={10}>Mentees</Heading>
      <Box maxWidth="4xl">
        <MenteesList />
      </Box>
    </>
  );
}

MenteesPage.auth = {
  roles: ["mentor"],
  publishedOnly: true
}
