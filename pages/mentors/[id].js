import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Image } from "@chakra-ui/image";
import {
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import useSWR from "swr";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const markdownTheme = {
  p: (props) => {
    const { children } = props;
    return <Text mb={2}>{children}</Text>;
  },
};

export default function MentorPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/mentors/${id}`, fetcher);

  if (error) {
    console.log(error);
    return (
      <Alert status="error">
        <AlertIcon />
        Error getting data for mentor profile with id {id}.
      </Alert>
    );
  }

  if (!data) {
    return <>Looading</>;
  }

  return (
    <Container mt="10" maxW={"5xl"} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} minChildWidth={400} spacing={10}>
        <Stack spacing={4}>
          <Heading size="2xl">{data.name}</Heading>
          <Heading size="md">{data.title}</Heading>
          <ReactMarkdown components={ChakraUIRenderer(markdownTheme)} skipHtml>
            {data.biography}
          </ReactMarkdown>
        </Stack>
        <Flex>
          <Image
            rounded={"md"}
            alt={data.name}
            src={data.picture}
            objectFit={"cover"}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
