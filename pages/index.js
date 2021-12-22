import { Center, Heading } from "@chakra-ui/layout";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Tupu app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center h="100px" mt="60px">
        <Heading>
          Welcome to <a href="https://tupu.io">Tupu!</a>
        </Heading>
      </Center>
    </div>
  );
}
