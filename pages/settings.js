import { Box, Heading } from "@chakra-ui/layout";
import SidebarWithHeader from "../components/Sidebar";

export default function SettingsPage() {
  return (
    <SidebarWithHeader>
      <Heading mb={10}>Settings</Heading>
      <Box
        maxWidth="container.xl"
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
      ></Box>
    </SidebarWithHeader>
  );
}
