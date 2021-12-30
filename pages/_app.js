import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { useState } from "react";
import SidebarWithHeader from "../components/Sidebar";
import { SessionProvider } from "next-auth/react";

const theme = extendTheme({
  colors: {
    brand: {
      blue: "#2e82ef",
      orange: "#fe8464",
      pink: "#fe6e9a",
      green: "#33c8c1",
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
          <Component {...pageProps} />
        </SidebarWithHeader>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default TupuApp;
