import { ChakraProvider } from "@chakra-ui/react";

function TupuApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default TupuApp;
