import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Heading, Link, Stack, Text } from "@chakra-ui/layout";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import Icon from "@chakra-ui/icon";
import { default as NextLink } from "next/link";
import { FaTwitterSquare, FaLinkedin } from "react-icons/fa";

const markdownTheme = {
  p: (props) => {
    const { children } = props;
    return <Text mb={2}>{children}</Text>;
  },
};

const ApplicationCard = ({ application, handleCancel }) => {
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
            src={application.mentor.picture + "?tr=w-100,h-100,fo-auto"}
            name={application.mentor.name}
            alignSelf={"center"}
          />
          <Heading size="sm">{application.mentor.name}</Heading>
          <Stack
            direction={"row"}
            textAlign={"center"}
            justifyContent={"center"}
          >
            {application.mentor.twitter && (
              <NextLink href={application.mentor.twitter} passHref>
                <Link target="_blank">
                  <Icon color="#1DA1F2" as={FaTwitterSquare} />
                </Link>
              </NextLink>
            )}
            {application.mentor.linkedin && (
              <NextLink href={application.mentor.linkedin} passHref>
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
            {application.message}
          </ReactMarkdown>
        </Stack>

        <Stack
          direction={"column"}
          textAlign={"right"}
          justifyContent={"center"}
        >
          <Button
            onClick={() => handleCancel(application)} 
            colorScheme={"grayButton"}
          >Cancel application</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ApplicationCard;
