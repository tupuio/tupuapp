import { Center, Heading } from "@chakra-ui/layout";
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
      <Center h="100px" mt="60px">
        <Heading>
          Welcome to <a href="https://tupu.io">Tupu!</a>
        </Heading>
      </Center>
      <Center mt="60px">
        <ProfileForm />
      </Center>
    </div>
  );
}
