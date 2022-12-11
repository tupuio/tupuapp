import { useRouter } from "next/router";
import { Box, Heading } from "@chakra-ui/layout";
import MentorshipDetailsForm from "../../components/MentorshipDetailsForm";

export default function MentorshipDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Heading mb={10}>Mentorship Details</Heading>
      <Box maxWidth="4xl" borderWidth="1px" borderRadius="lg" bg="white">
        <MentorshipDetailsForm id={id} />
      </Box>
    </>
  );
}
