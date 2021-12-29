import Icon from "@chakra-ui/icon";
import { Flex, Link } from "@chakra-ui/layout";
import { default as NextLink } from "next/link";

const NavItem = ({ icon, children, href, ...rest }) => {
  return (
    <NextLink href={href}>
      <Link style={{ textDecoration: "none" }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          color="white"
          _hover={{
            bg: "brand.400",
            color: "black",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              color="white"
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "black",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
};

export default NavItem;
