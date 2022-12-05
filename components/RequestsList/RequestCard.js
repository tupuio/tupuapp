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
import { RequestStatusEnum } from "../../types/dbTablesEnums";

const markdownTheme = {
  p: (props) => {
    const { children } = props;
    return <Text mb={2}>{children}</Text>;
  },
};

const RequestCard = ({ request, handleContact, handleAccept, handleReject }) => {
  const { picture, name, twitter, linkedin } = request.mentee;
  const picture_src = picture ? `${picture}?tr=w-100,h-100,fo-auto` : '';
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
            src={picture_src}
            name={name}
            alignSelf={"center"}
          />
          <Heading size="sm">{name}</Heading>
          <Stack
            direction={"row"}
            textAlign={"center"}
            justifyContent={"center"}
          >
            {twitter && (
              <NextLink href={twitter} passHref>
                <Link target="_blank">
                  <Icon color="#1DA1F2" as={FaTwitterSquare} />
                </Link>
              </NextLink>
            )}
            {linkedin && (
              <NextLink href={linkedin} passHref>
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
          <Button
            colorScheme={"greenButton"}
            onClick={() => handleAccept(request)}
          >Accept</Button>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              Reject
            </MenuButton>
            <MenuList>
              <MenuItem 
                onClick={() => handleReject(request, RequestStatusEnum.RejectedNoGoodFit)}
              >Not a good fit</MenuItem>
              <MenuItem 
                onClick={() => handleReject(request, RequestStatusEnum.RejectedBusy)}
              >I&apos;m busy</MenuItem>
              <MenuItem 
                onClick={() => handleReject(request, RequestStatusEnum.Rejected)}
              >Prefer not to say</MenuItem>
            </MenuList>
          </Menu>
          <Button
            onClick={() => handleContact(request)}
            colorScheme={"blueButton"}
          >Contact</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RequestCard;
