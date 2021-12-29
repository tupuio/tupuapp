import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { useState } from "react";
import SidebarWithHeader from "../components/Sidebar";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#2F323A",
      200: "#77567A",
      300: "#C47AC0",
      400: "#E39EC1",
      500: "#DEBAC0",
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
