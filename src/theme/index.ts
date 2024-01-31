import { ThemeConfig, extendTheme } from '@chakra-ui/react';

import { colors } from './colors';
import { ButtonStyle } from './components/button';
import { InputStyle } from './components/input';

const config: ThemeConfig = {
  initialColorMode: process.env.THEME_MODE as 'light' | 'dark' | undefined,
  useSystemColorMode: true,
};

const breakpoints = {
  base: '0px',
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
  '3xl': '1920px',
  '4xl': '2560px',
  '5xl': '3840px',
};

export const theme = extendTheme({
  config,
  colors: colors,
  components: {
    Input: InputStyle,
    Button: ButtonStyle,
  },
  breakpoints,
});