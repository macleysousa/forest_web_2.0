import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'hover-blue': '#1d1242',
        'color-blue': '#1E93FF',
      },
    },
  },
  plugins: [],
};
export default config;