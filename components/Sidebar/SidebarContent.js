import { CloseButton } from "@chakra-ui/close-button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex, Text } from "@chakra-ui/layout";
import {
  FiHome,
  FiInbox,
  FiSearch,
  FiSettings,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import NavItem from "./NavItem";

const MentorLinkItems = [
  { name: "Home", icon: FiHome, href: "/" },
  { name: "Your profile", icon: FiUser, href: "/profile" },
  { name: "Requests", icon: FiInbox, href: "/requests" },
  { name: "Mentees", icon: FiUsers, href: "/mentees" },
  { name: "Settings", icon: FiSettings, href: "/settings" },
];

const MenteeLinkItems = [
  { name: "Home", icon: FiHome, href: "/" },
  { name: "Your profile", icon: FiUser, href: "/profile" },
  { name: "Find a mentor", icon: FiSearch, href: "/mentors" },
  { name: "Settings", icon: FiSettings, href: "/settings" },
];

const SidebarContent = ({ onClose, mode, ...rest }) => {
  const links = mode === "mentor" ? MentorLinkItems : MenteeLinkItems;
  return (
    <Box
      transition="3s ease"
      bg="brand.blue"
      borderRight="1px"
      borderRightColor="gray.400"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="14" alignItems="center" mx="8" justifyContent="space-between">
        <Text textColor="white" fontSize="4xl" fontWeight="bold">
          tupu
        </Text>
        <CloseButton
          color="white"
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Flex>
      <Box mt={50}>
        {links.map((link) => (
          <NavItem key={link.name} icon={link.icon} href={link.href}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    </Box>
  );
};

export default SidebarContent;
