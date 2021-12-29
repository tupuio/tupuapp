import { Box, Heading } from "@chakra-ui/layout";

export default function Home() {
  return (
    <>
      <Heading mb={10}>Home</Heading>
      <Box
        maxWidth="container.xl"
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
      ></Box>
    </>
  );
}
