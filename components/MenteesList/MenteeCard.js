import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Heading, Link, Stack, Text } from "@chakra-ui/layout";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import Icon from "@chakra-ui/icon";
import { default as NextLink } from "next/link";
import { useRouter } from 'next/router'
import { FaTwitterSquare, FaLinkedin } from "react-icons/fa";

const markdownTheme = {
  p: (props) => {
    const { children } = props;
    return <Text mb={2}>{children}</Text>;
  },
};

const MenteeCard = ({ mentorship }) => {
  const router = useRouter()
  const { mentee } = mentorship;

  return (
    <Stack
      borderWidth="1px"
      borderRadius="lg"
      w="100%"
      direction={{ base: "column", md: "row" }}
      bg={"white"}
      boxShadow={"2xl"}
      padding={4}
    >
      <Stack
        direction={{ base: "column", lg: "row" }}
        spacing={{ base: 4, lg: 20 }}
      >
        <Stack
          pl={4}
          direction={"column"}
          textAlign={"center"}
          justifyContent={"center"}
        >
          <Avatar
            size="xl"
            src={mentee.picture + "?tr=w-100,h-100,fo-auto"}
            name={mentee.name}
            alignSelf={"center"}
          />
          <Heading size="sm">{mentee.name}</Heading>
          <Stack
            direction={"row"}
            textAlign={"center"}
            justifyContent={"center"}
          >
            {mentee.twitter && (
              <NextLink href={mentee.twitter} passHref>
                <Link target="_blank">
                  <Icon color="#1DA1F2" as={FaTwitterSquare} />
                </Link>
              </NextLink>
            )}
            {mentee.linkedin && (
              <NextLink href={mentee.linkedin} passHref>
                <Link target="_blank">
                  <Icon color="#2867B2" as={FaLinkedin} />
                </Link>
              </NextLink>
            )}
          </Stack>
        </Stack>

        <Stack
          direction={"column"}
          textAlign={"left"}
          justifyContent={"center"}
        >
          <ReactMarkdown components={ChakraUIRenderer(markdownTheme)} skipHtml>
            {mentee.biography}
          </ReactMarkdown>
        </Stack>
        <Stack
          direction={"column"}
          textAlign={"left"}
          justifyContent={"center"}
        >
          <ReactMarkdown components={ChakraUIRenderer(markdownTheme)} skipHtml>
            {mentorship.message}
          </ReactMarkdown>
        </Stack>


        <Stack
          direction={"column"}
          textAlign={"right"}
          justifyContent={"center"}
        >
          <Button 
            colorScheme={"greenButton"}
            onClick={() => router.push(`/mentorshipDetails/${mentorship.id}`)}
          >Details</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MenteeCard;
