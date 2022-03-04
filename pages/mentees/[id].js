import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Image } from "@chakra-ui/image";
import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import useSWR from "swr";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { default as NextLink } from "next/link";
import Icon from "@chakra-ui/icon";
import { FaTwitterSquare, FaLinkedin } from "react-icons/fa";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const markdownTheme = {
  p: (props) => {
    const { children } = props;
    return <Text mb={2}>{children}</Text>;
  },
};

export default function MenteePage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/mentees/${id}`, fetcher);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRequest = () => {
    onOpen();
  };

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error getting data for mentee profile with id {id}. {error.toString()}
      </Alert>
    );
  }

  if (!data) {
    return <>Looading</>;
  }

  return (
    <>
      <Container mt="10" maxW={"5xl"} py={12}>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          minChildWidth={400}
          spacing={10}
        >
          <Stack spacing={4}>
            <Box height="5px" width="150px" bg="brand.orange" mb={2}></Box>
            <Heading size="2xl" color="gray.700">
              {data.name}
            </Heading>
            <Heading size="md" color="gray.500">
              {data.title}
            </Heading>
            <Stack direction={"row"} justifyContent={"left"}>
              {data.twitter && (
                <NextLink href={data.twitter} passHref>
                  <Link target="_blank">
                    <Icon color="#1DA1F2" as={FaTwitterSquare} />
                  </Link>
                </NextLink>
              )}
              {data.linkedin && (
                <NextLink href={data.linkedin} passHref>
                  <Link target="_blank">
                    <Icon color="#2867B2" as={FaLinkedin} />
                  </Link>
                </NextLink>
              )}
            </Stack>
            <ReactMarkdown
              components={ChakraUIRenderer(markdownTheme)}
              skipHtml
            >
              {data.biography}
            </ReactMarkdown>
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={data.name}
              maxHeight={540}
              src={data.picture}
              objectFit={"cover"}
            />
          </Flex>
        </SimpleGrid>
        <Stack mt={10} direction="column">
          <Stack mb={10}>
            <Center>
              <Box height="5px" width="150px" bg="brand.orange"></Box>
            </Center>
          </Stack>
          <Center>
            <Text maxWidth="2xl">
              {data.name} are people looking for mentorship in the tech industry.
            </Text>
          </Center>
        </Stack>
      </Container>
    </>
  );
}
