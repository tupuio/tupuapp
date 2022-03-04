import { Box, Heading } from "@chakra-ui/layout";
import MenteesList from "../../components/MenteesList";

export default function MenteesPage() {
  return (
    <>
      <Heading mb={10}>Mentees</Heading>
      <Box maxWidth="container.xl">
        <MenteesList />
      </Box>
    </>
  );
}
