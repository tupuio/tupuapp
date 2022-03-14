import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import {
  Badge,
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { FiUser } from "react-icons/fi";
import { default as NextLink } from "next/link";

function trimString(string, length) {
  return string.length > length
    ? string.substring(0, length - 3) + "..."
    : string;
}

const MentorCard = ({ mentor, handleRequest }) => {
  return (
    <Stack
      borderWidth="1px"
      borderRadius="lg"
      w={{ sm: "100%", md: "540px" }}
      height={{ sm: "476px", md: "20rem" }}
      direction={{ base: "column", md: "row" }}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      padding={4}
    >
      <Flex flex={1} bg="blue.200">
        {mentor.picture && (
          <Image
            objectFit="cover"
            alt={mentor.name}
            boxSize="100%"
            src={mentor.picture + "?tr=w-300,h-300,fo-auto"}
          />
        )}
        {!mentor.picture && (
          <Icon color="white" p="10%" boxSize="100%" as={FiUser} />
        )}
      </Flex>
      <Stack
        flex={1}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={1}
        pt={2}
      >
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {mentor.name}
        </Heading>
        <Text
          textAlign="center"
          fontWeight={600}
          color={"gray.500"}
          size="sm"
          mb={4}
        >
          {mentor.title}
        </Text>
        <Text
          textAlign={"center"}
          fontSize={14}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {mentor.biography && trimString(mentor.biography, 180)}
        </Text>

        <Stack
          width={"100%"}
          mt={"2rem"}
          direction={"row"}
          padding={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <NextLink href={`/mentors/${mentor.id}`}>
            <Button flex={1} colorScheme="grayButton">
              View
            </Button>
          </NextLink>
          <Button
            onClick={() => handleRequest(mentor)}
            flex={1}
            colorScheme="greenButton"
          >
            Request
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MentorCard;
