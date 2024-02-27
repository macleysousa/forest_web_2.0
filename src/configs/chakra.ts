import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    blue: {
      50: '#e3f2ff',
      100: '#bbdaff',
      200: '#8abfff',
      300: '#5a9eff',
      400: '#3ea2ff',
      500: '#1e93ff',
      600: '#2284f0',
      700: '#2272dc',
      800: '#2160ca',
      900: '#1b4f9e',
    },
  },

  components: {
    Button: {
      sizes: { md: { fontSize: 'sm', h: '3rem' }, sm: { h: '2.5rem' } },
      variants: {
        solid: {
          _active: { bg: 'blue.700', color: 'white' },
          _hover: { bg: 'blue.600', color: 'white' },
          bg: 'blue.500',
          color: 'white',
        },
      },
    },

    FormLabel: { baseStyle: { fontSize: 'sm', mb: 3 } },

    Input: {
      defaultProps: { size: 'sm' },
      sizes: {
        sm: {
          element: { h: '3rem' },
          field: { borderRadius: 'lg', h: '3rem' },
        },
      },
    },
  },

  fonts: { body: 'var(--font-inter)', heading: 'var(--font-inter)' },

  /* eslint-disable canonical/sort-keys */
  breakpoints: {
    'base': '0px',
    'sm': '320px',
    'md': '768px',
    'lg': '960px',
    'xl': '1200px',
    '2xl': '1536px',
    '3xl': '1920px',
    '4xl': '2560px',
    '5xl': '3840px',
  },
  /* eslint-enable canonical/sort-keys */
});
