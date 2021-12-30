import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { signIn } from "next-auth/react";

export default function SigninPass() {
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg="brand.blue">
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to Tupu</Heading>
          </Stack>
          <Stack spacing={4} mt={10}>
            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => signIn()}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
