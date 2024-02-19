import { ThemeConfig, extendTheme } from '@chakra-ui/react';

import { colors } from './colors';
import { ButtonStyle } from './components/button';
import { InputStyle } from './components/input';
import { breakpoints } from './breakpoints';

const config: ThemeConfig = {
  initialColorMode: process.env.THEME_MODE as 'light' | 'dark' | undefined,
  useSystemColorMode: true,
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