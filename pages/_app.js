import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { useState } from "react";
import SidebarWithHeader from "../components/Sidebar";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";

const theme = extendTheme({
  colors: {
    brand: {
      blue: "#2e82ef",
      orange: "#fe8464",
      pink: "#fe6e9a",
      green: "#33c8c1",
    },
    blueButton: {
      500: "#2e82ef",
      600: "#1065d3",
      700: "#0c4b9e",
    },
    grayButton: {
      500: "#A0AEC0",
      600: "#4A5568",
      700: "#2D3748",
    },
    greenButton: {
      500: "#33c8c1",
      600: "#28a09a",
      700: "#1e7873",
    },
  },
  components: {
    Button: {
      baseStyle: {
        rounded: "lg",
        fontSize: "sm",
      },
    },
  },
});

function Auth({ children, authObject }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { data: session } = useSession()

  // if the user does not have a session deny access
  if (!session) {
    return <div>Access denied</div>
  }

  // if page requires the user to be published and the user is not published deny access
  if (authObject?.publishedOnly && !session?.user?.published) {
    return <div>Access denied</div>
  }

  // if the page requires the user to have a certain role and the user does not have the role deny access
  if (authObject?.roles && !authObject.roles.some(item => session?.user?.roles?.includes(item))) {
    return <div>Access denied</div>
  }

  return children
}

function TupuApp({
  Component,
  pageProps: { session, providers, ...pageProps },
}) {
  const [mode, setMode] = useState("mentee");

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <SidebarWithHeader mode={mode} setMode={setMode}>
          {Component.auth ? (
            <Auth authObject={Component.auth}>
              <Component mode={mode} {...pageProps} />
            </Auth>
          ) : (
            <Component mode={mode} {...pageProps} />
          )}
        </SidebarWithHeader>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default TupuApp;