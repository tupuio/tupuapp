import { Box, Heading } from "@chakra-ui/layout";
import SidebarWithHeader from "../components/Sidebar";

export default function MenteesPage() {
  return (
    <SidebarWithHeader>
      <Heading mb={10}>Mentees</Heading>
      <Box
        maxWidth="container.xl"
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
      ></Box>
    </SidebarWithHeader>
  );
}
