import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  jsxFramework: 'react',
  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './src/app/**/*.{ts,tsx,js,jsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: './src/styled-system',
});
