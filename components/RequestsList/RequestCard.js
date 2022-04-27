import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { Select } from '@chakra-ui/react'
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

const RequestCard = ({ request }) => {
  console.log(request);
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
            src={request.mentee.picture + "?tr=w-100,h-100,fo-auto"}
            name={request.mentee.name}
            alignSelf={"center"}
          />
          <Heading size="sm">{request.mentee.name}</Heading>
          <Stack
            direction={"row"}
            textAlign={"center"}
            justifyContent={"center"}
          >
            {request.mentee.twitter && (
              <NextLink href={request.mentee.twitter} passHref>
                <Link target="_blank">
                  <Icon color="#1DA1F2" as={FaTwitterSquare} />
                </Link>
              </NextLink>
            )}
            {request.mentee.linkedin && (
              <NextLink href={request.mentee.linkedin} passHref>
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
            {request.message}
          </ReactMarkdown>
        </Stack>

        <Stack
          direction={"column"}
          textAlign={"right"}
          justifyContent={"center"}
        >
          {/* set a label "status", make some status read-only */}
          <Select placeholder="Pending" variant="filled" >
            <option value="option1">Mentorship started</option>
            <option value="option2">Mentorship finished</option>
            <option value="option3">Not a good fit</option>
            <option value="option4">Request expired</option>
            <option value="option5">Mentor busy</option>
          </Select>

        </Stack>

        <Stack
          direction={"column"}
          textAlign={"right"}
          justifyContent={"center"}
        >
          <Button colorScheme={"greenButton"}>Accept</Button>
          <Button colorScheme={"grayButton"}>Reject</Button>
          <Button colorScheme={"blueButton"}>Contact</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RequestCard;
