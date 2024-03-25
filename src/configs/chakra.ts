import {
  Theme as BaseTheme,
  BaseThemeWithExtensions,
  ThemeOverride,
  extendTheme,
} from '@chakra-ui/react';

const themeOverride = {
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
    Input: {
      variants: {
        outline: {
          field: { bg: 'white' },
        },
      },
    },
    Select: {
      variants: {
        outline: {
          field: { bg: 'white' },
        },
      },
    },
  },

  fonts: { body: 'var(--font-inter)', heading: 'var(--font-inter)' },
} satisfies ThemeOverride;

const themeExtended = extendTheme(themeOverride);

type Theme = BaseThemeWithExtensions<BaseTheme, [typeof themeOverride]>;

export const theme = themeExtended as Theme;
