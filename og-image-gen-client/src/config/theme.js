// CustomThemeProvider.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'inter',
    body: 'Poppins, sans-serif',
  },
  colors: {
    brand: {
      500: '#5b34eb',
      600: '#4b23db',
    },
  },
});

export default theme;
