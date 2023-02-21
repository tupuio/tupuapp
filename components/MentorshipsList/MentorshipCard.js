import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { MenuButton, Menu, MenuList, MenuItem } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import Icon from "@chakra-ui/icon";
import { default as NextLink } from "next/link";
import { FaTwitterSquare, FaLinkedin } from "react-icons/fa";
import { RelationshipStatusEnum } from "../../types/dbTablesEnums";

const markdownTheme = {
  p: (props) => {
    const { children } = props;
    return <Text mb={2}>{children}</Text>;
  },
};

const MentorshipCard = ({ mentorship, handleCloseMentorship }) => {

  const { mentor } = mentorship;

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
            src={mentor.picture + "?tr=w-100,h-100,fo-auto"}
            name={mentor.name}
            alignSelf={"center"}
          />
          <Heading size="sm">{mentor.name}</Heading>
          <Stack
            direction={"row"}
            textAlign={"center"}
            justifyContent={"center"}
          >
            {mentor.twitter && (
              <NextLink href={mentor.twitter} passHref>
                <Link target="_blank">
                  <Icon color="#1DA1F2" as={FaTwitterSquare} />
                </Link>
              </NextLink>
            )}
            {mentor.linkedin && (
              <NextLink href={mentor.linkedin} passHref>
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
            {mentorship.message}
          </ReactMarkdown>
        </Stack>


        <Stack
          direction={"column"}
          textAlign={"right"}
          justifyContent={"center"}
        >
          <Button colorScheme={"greenButton"}>Details</Button>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              Close
            </MenuButton>
            <MenuList>
              <MenuItem 
                onClick={() => handleCloseMentorship(mentorship, RelationshipStatusEnum.ClosedCompleted)}
              >Completed</MenuItem>
              <MenuItem 
                onClick={() => handleCloseMentorship(mentorship, RelationshipStatusEnum.ClosedNoGoodFit)}
              >Not a good fit</MenuItem>
              <MenuItem 
                onClick={() => handleCloseMentorship(mentorship, RelationshipStatusEnum.ClosedBusy)}
              >Not available</MenuItem>
              <MenuItem 
                onClick={() => handleCloseMentorship(mentorship, RelationshipStatusEnum.ClosedNotActive)}
              >Not active</MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MentorshipCard;
