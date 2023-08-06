import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { useState } from "react";
import SidebarWithHeader from "../components/Sidebar";
import { SessionProvider } from "next-auth/react";
import AuthChecker from "../components/AuthChecker/AuthChecker";

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
            <AuthChecker authObject={Component.auth}>
              <Component mode={mode} {...pageProps} />
            </AuthChecker>
          ) : (
            <Component mode={mode} {...pageProps} />
          )}
        </SidebarWithHeader>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default TupuApp;