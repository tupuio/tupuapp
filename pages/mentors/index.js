import { Box, Heading } from "@chakra-ui/layout";
import MentorsList from "../../components/MentorsList";

export default function MentorsPage() {
  return (
    <>
      <Heading mb={10}>Find a mentor</Heading>
      <Box maxWidth="container.xl">
        <MentorsList />
      </Box>
    </>
  );
}
