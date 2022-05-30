import { Box, Heading } from "@chakra-ui/layout";
import ExpertiseForm from "../components/ExpertiseForm";

export default function ExpertisePage() {
  return (
    <>
      <Heading mb={10}>Your Expertise</Heading>
      <Box maxWidth="4xl">
      <ExpertiseForm />
      </Box>
    </>
  );
}