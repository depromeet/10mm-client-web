import { colorList, semanticColorList } from '@/styles/color';
import { keyframeList } from '@/styles/motion';
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
      keyframes: keyframeList,
      textStyles: typographyList,
      tokens: {
        fonts: {
          pretendard: { value: 'var(--pretendard)' },
        },
        zIndex: {
          modalOverlay: {
            value: 9999,
          },
          appBar: {
            value: '100',
          },
        },
        ...colorList,
      },
    },
    semanticTokens: semanticColorList,
  },

  // The output directory for your css system
  outdir: './src/styled-system',
});
