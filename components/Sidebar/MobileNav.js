import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex, HStack, Text, VStack } from "@chakra-ui/layout";
import { FiMenu } from "react-icons/fi";

const MobileNav = ({ onOpen, ...rest }) => {
  const name = "Madalina";
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="14"
      alignItems="center"
      bg="gray.100"
      borderBottomWidth="1px"
      borderBottomColor="gray.100"
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        textColor="brand.400"
        fontWeight="bold"
      >
        tupu
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Avatar name={name || ""} bg="brand.400" w="36px" h="36px" mr="15px" />
      </HStack>
    </Flex>
  );
};

export default MobileNav;
