import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

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
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default TupuApp;
