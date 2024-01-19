import { theme, defineStyleConfig } from '@chakra-ui/react';

export const ButtonStyle = defineStyleConfig({
  ...theme.components.Button,
  sizes: {
    ...theme.components.Button.sizes,
    md: {
      h: '48px',
    },
  },
  variants: {
    ...theme.components.Button.variants,
    primary: {
      _light: {
        bg: 'blue.500',
        color: 'white',
        _hover: {
          bg: 'blue.600',
          color: 'white',
        },
        _active: {
          bg: 'blue.700',
          color: 'white',
        },
      },
      _dark: {
        bg: 'blue.600',
        color: 'white',
        _hover: {
          bg: 'blue.500',
          color: 'white',
        },
        _active: {
          bg: 'blue.400',
          color: 'white',
        },
      },
    },
    secondary: {
      _light: {
        border: '1px solid',
        borderColor: 'blue.500',
        color: 'blue.500',
        _hover: {
          bg: 'blue.600',
          color: 'white',
        },
        _active: {
          bg: 'blue.700',
          color: 'white',
        },
      },
      _dark: {
        border: '1px solid',
        borderColor: 'blue.600',
        color: 'blue.600',
        _hover: {
          bg: 'blue.500',
          color: 'white',
        },
        _active: {
          bg: 'blue.400',
          color: 'white',
        },
      },
    },
  },
});