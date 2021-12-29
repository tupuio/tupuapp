import { Center, Container, Heading } from "@chakra-ui/layout";
import Head from "next/head";
import ProfileForm from "../components/ProfileForm";
import Topbar from "../components/Topbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tupu App</title>
        <meta name="description" content="Tupu app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Topbar />
      <Container maxWidth="container.xl" padding={0}>
        <Center mt="100px">
          <ProfileForm />
        </Center>
      </Container>
    </div>
  );
}
