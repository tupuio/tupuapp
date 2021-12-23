import { Center, Container, Heading } from "@chakra-ui/layout";
import Head from "next/head";
import ProfileForm from "../components/ProfileForm";
import Topbar from "../components/Topbar";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/profile", fetcher);

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <div>
      <Head>
        <title>Tupu App</title>
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
          {data ? <ProfileForm profile={data} /> : <div>Loading..</div>}
        </Center>
      </Container>
    </div>
  );
}
