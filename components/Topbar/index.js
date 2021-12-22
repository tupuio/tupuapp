import { Avatar } from "@chakra-ui/avatar";
import { Flex, Heading } from "@chakra-ui/layout";

const Topbar = () => {
  const name = "Madalina";
  return (
    <Flex
      w="100vw"
      h="54px"
      bg="black"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex="1"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex
        w="90px"
        ml="15px"
        height="54px"
        bgColor="black"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
      >
        <Heading color={"gray.200"}>tupu</Heading>
      </Flex>
      <Flex>
        <Avatar name={name || ""} w="36px" h="36px" mr="15px" />
      </Flex>
    </Flex>
  );
};

export default Topbar;
