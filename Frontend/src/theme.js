import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "blue.900",
        color: "white",
      },
    },
  },
});

export default theme;
