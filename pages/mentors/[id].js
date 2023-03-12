import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Image } from "@chakra-ui/image";
import {
  Box,

  Container,
  Flex,
  Heading,
  Link,
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
import RequestModal from "../../components/RequestModal";
import { useDisclosure } from "@chakra-ui/hooks";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRequest = () => {
    onOpen();
  };

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error getting data for mentor profile with id {id}. {error.toString()}
      </Alert>
    );
  }

  if (!data) {
    return <>Loading</>;
  }

  return (
    <>
      <Container maxW={"5xl"} py={12}>
        <Stack spacing={4} marginRight={"auto"}>
          <Heading color="gray.700">
            {data.name}
          </Heading>
          {data.title &&
            <Heading size="md" color="gray.500">
              {data.title}
            </Heading>
          }
          {data.twitter || data.linkedin &&
            <Stack direction={"row"} justifyContent={"left"} margin>
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
          }
          {data.biography &&
            <ReactMarkdown
              components={ChakraUIRenderer(markdownTheme)}
              skipHtml
            >
              {data.biography}
            </ReactMarkdown>
          }
        </Stack>
        {data.picture &&
          <Flex maxWidth={400} mt={8}>

            <Image
              rounded={"md"}
              alt={data.name}
              maxHeight={540}
              src={data.picture}
              objectFit={"cover"}
            />

          </Flex>
        }
        <Stack spacing={4} mt={data.picture ? 8 : 4}>
          <Text maxWidth="2xl">
            {data.name} is volunteering their time to mentor women, people of
            color, and other underrepresented groups in the tech industry.
          </Text>
          <Box>
            <Button onClick={() => handleRequest()} colorScheme="greenButton">
              Request as mentor
            </Button>
          </Box>
        </Stack>
      </Container>
      <RequestModal mentor={data} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
