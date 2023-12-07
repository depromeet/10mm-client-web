import { defineConfig } from '@pandacss/dev';

import { typographyList } from './src/styles/typography';

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  jsxFramework: 'react',
  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './src/app/**/*.{ts,tsx,js,jsx}', './stories/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%': { transform: 'rotate(0deg)', backgroundPositionX: '0%', backgroundPositionY: '0%' },
          '50%': { backgroundPositionX: '50%', backgroundPositionY: '100%' },
          '100%': { transform: 'rotate(0deg)', backgroundPositionX: '0%', backgroundPositionY: '0%' },
        },
      },
      textStyles: typographyList,
      tokens: {
        fonts: {
          pretendard: { value: 'var(--pretendard)' },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: './src/styled-system',
});
