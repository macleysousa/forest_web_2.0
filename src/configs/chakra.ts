import { ThemeOverride, extendTheme } from '@chakra-ui/react';

export const theme = {
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
      variants: {
        ghost: {
          _active: { bg: 'blue.50' },
          _hover: { _disabled: { bg: 'blue.50' }, bg: 'blue.50' },
          bg: 'transparent',
          color: 'blue.500',
        },
        outline: {
          _active: { bg: 'blue.50' },
          _hover: { _disabled: { bg: 'blue.50' }, bg: 'blue.50' },
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.200',
          color: 'blue.500',
        },
        solid: {
          _active: { bg: 'blue.700' },
          _hover: { _disabled: { bg: 'blue.500' }, bg: 'blue.600' },
          bg: 'blue.500',
          color: 'white',
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

  /* eslint-disable canonical/sort-keys */
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
  /* eslint-enable canonical/sort-keys */
} satisfies ThemeOverride;

export const extendedTheme = extendTheme(theme);
