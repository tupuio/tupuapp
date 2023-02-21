import { Avatar } from "@chakra-ui/avatar";
import { Heading, Link, Stack } from "@chakra-ui/layout";
import Icon from "@chakra-ui/icon";
import { default as NextLink } from "next/link";
import { FaTwitterSquare, FaLinkedin } from "react-icons/fa";

const PersonInfo = ({ person }) => {
  const { picture, name, twitter, linkedin } = person;
  const picture_src = picture ? `${picture}?tr=w-100,h-100,fo-auto` : '';
  return (
    <>
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
    </>
  );
}

export default PersonInfo;