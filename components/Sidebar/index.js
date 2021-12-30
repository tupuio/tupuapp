import { useDisclosure } from "@chakra-ui/hooks";
import { Box } from "@chakra-ui/layout";
import { Drawer, DrawerContent } from "@chakra-ui/modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SigninPass from "../auth/SigninPass";
import MobileNav from "./MobileNav";
import SidebarContent from "./SidebarContent";

export default function SidebarWithHeader({ mode, setMode, children }) {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  if (router.pathname.startsWith("/auth/")) {
    // /auth/* pages don't need a sidebar
    return <>{children}</>;
  }

  // If no session exists, go to the signin page
  if (!session) {
    return <SigninPass />;
  }

  console.log(session);

  return (
    <Box minH="100vh" bg="gray.100">
      <SidebarContent
        onClose={() => onClose}
        mode={mode}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav
        session={session}
        onOpen={onOpen}
        mode={mode}
        setMode={setMode}
      />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}
