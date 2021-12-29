import { Box, Heading } from "@chakra-ui/layout";
import ProfileForm from "../components/ProfileForm";
import SidebarWithHeader from "../components/Sidebar";

export default function ProfilePage() {
  return (
    <SidebarWithHeader>
      <Heading mb={10}>Your Profile</Heading>
      <Box
        maxWidth="container.xl"
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
      >
        <ProfileForm />
      </Box>
    </SidebarWithHeader>
  );
}
