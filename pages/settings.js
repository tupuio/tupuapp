import { Box, Heading } from "@chakra-ui/layout";

export default function SettingsPage() {
  return (
    <>
      <Heading mb={10}>Settings</Heading>
      <Box
        maxWidth="container.xl"
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
      ></Box>
    </>
  );
}
