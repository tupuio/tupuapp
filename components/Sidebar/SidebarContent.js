import { CloseButton } from "@chakra-ui/close-button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { FiHome, FiSettings, FiUser, FiUsers } from "react-icons/fi";
import NavItem from "./NavItem";

const LinkItems = [
  { name: "Home", icon: FiHome, href: "/" },
  { name: "Your profile", icon: FiUser, href: "/profile" },
  { name: "Mentees", icon: FiUsers, href: "/mentees" },
  { name: "Settings", icon: FiSettings, href: "/settings" },
];

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg="gray.900"
      borderRight="1px"
      borderRightColor="gray.700"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="14" alignItems="center" mx="8" justifyContent="space-between">
        <Text textColor="brand.400" fontSize="4xl" fontWeight="bold">
          tupu
        </Text>
        <CloseButton
          color="white"
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Flex>
      <Box mt={50}>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} href={link.href}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    </Box>
  );
};

export default SidebarContent;
