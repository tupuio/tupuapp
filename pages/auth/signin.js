import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import {
  getCsrfToken,
  getProviders,
  signIn,
  useSession,
} from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SignIn({ csrfToken, ...props }) {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  if (providers && "credentials" in providers) {
    delete providers.credentials;
  }

  if (session) {
    console.log(session);
    router.push("/");
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg="brand.blue">
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
          <Stack align={"center"} mb="24px">
            <Heading fontSize={"4xl"}>Sign in to Tupu</Heading>
          </Stack>
          {providers && (
            <Stack spacing={4} mt={8} mb={8}>
              {Object.values(providers).map((provider) => (
                <Stack key={provider.name}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </Button>
                </Stack>
              ))}
            </Stack>
          )}

          {process.env.NODE_ENV === "development" && (
            <>
              <Heading size="lg" mb={4}>
                Development Login
              </Heading>
              <form method="post" action="/api/auth/callback/credentials">
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <FormControl id="username">
                  <FormLabel>Username</FormLabel>
                  <Input name="username" />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input name="password" type="password" />
                </FormControl>

                <Stack spacing={4} mt={8}>
                  <Stack spacing={10}>
                    <Button
                      type="submit"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </>
          )}
        </Box>
      </Stack>
    </Flex>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: {
      providers,
      csrfToken: await getCsrfToken(context),
    },
  };
}
