import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { useState } from "react";
import SidebarWithHeader from "../components/Sidebar";

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

function TupuApp({ Component, pageProps }) {
  const [mode, setMode] = useState("mentee");
  return (
    <ChakraProvider theme={theme}>
      <SidebarWithHeader mode={mode} setMode={setMode}>
        <Component {...pageProps} />
      </SidebarWithHeader>
    </ChakraProvider>
  );
}

export default TupuApp;
