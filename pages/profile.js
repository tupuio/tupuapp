import { Box, Heading } from "@chakra-ui/layout";
import ProfileForm from "../components/ProfileForm";

export default function ProfilePage() {
  return (
    <>
      <Heading mb={10}>Your Profile</Heading>
      <Box maxWidth="4xl" borderWidth="1px" borderRadius="lg" bg="white">
        <ProfileForm />
      </Box>
    </>
  );
}

ProfilePage.auth = {
  roles: ["mentor", "mentee"],
  publishedOnly: false
}
