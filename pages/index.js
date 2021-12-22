import { Center, Container, Heading } from "@chakra-ui/layout";
import Head from "next/head";
import ProfileForm from "../components/ProfileForm";
import Topbar from "../components/Topbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Tupu app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Topbar />
      <Container maxWidth="container.xl" padding={0}>
        <Center h="100px" mt="60px">
          <Heading>
            Welcome to <a href="https://tupu.io">Tupu!</a>
          </Heading>
        </Center>
        <Center>
          <ProfileForm />
        </Center>
      </Container>
    </div>
  );
}
