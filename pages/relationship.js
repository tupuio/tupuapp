import { Box, Heading } from "@chakra-ui/layout";
import RelationshipForm from "../components/RelationshipForm";

export default function RelationshipPage() {
  return (
    <>
      <Heading mb={10}>Your Mentorship</Heading>
      <Box maxWidth="4xl" borderWidth="1px" borderRadius="lg" bg="white">
        <RelationshipForm id="rec_caad4rdvg35c8ken8ml0" />
      </Box>
    </>
  );
}
