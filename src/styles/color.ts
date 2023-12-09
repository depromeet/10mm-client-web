import { defineSemanticTokens, defineTokens } from '@pandacss/dev';

export const colorList = defineTokens({
  colors: {
    basicColor: {
      black: { value: '#272730' },
      white: { value: '#FFFFFF' },
    },
    gray: {
      gray000: { value: '#141417' },
      gray050: { value: '#18181D' },
      gray100: { value: '#212129' },
      gray150: { value: '#2A2A33' },
      gray200: { value: '#292931' },
      gray300: { value: '#3C3D47' },
      gray400: { value: '#464856' },
      gray500: { value: '#6B6B7C' },
      gray600: { value: '#9292A1' },
      gray700: { value: '#B5B5C0' },
      gray800: { value: '#D8D8DD' },
      gray900: { value: '#F0F0F0' },
    },
    scrim: {
      screen: { value: 'rgba(0, 0, 0, 0.60)' },
      pressed: { value: 'rgba(0, 0, 0, 0.10)' },
    },

    purple: {
      purple100: {
        value: '#D9D9FF',
      },
      purple200: {
        value: '#C5C4FC',
      },
      purple300: {
        value: '#B6B5F7',
      },
      purple400: {
        value: '#AAA9F7',
      },
      purple500: {
        value: '#7E7DF1',
      },
    },

    red: {
      red500: {
        value: '#C53C3C',
      },
    },
  },
});

export const semanticColorList = defineSemanticTokens({
  colors: {
    bg: {
      surface1: { value: '{colors.gray.gray000}' },
      surface2: { value: '{colors.gray.gray050}' },
      surface3: { value: '{colors.gray.gray100}' },
      surface4: { value: '{colors.gray.gray150}' },
    },
    text: {
      primary: { value: '{colors.gray.gray900}' },
      secondary: { value: '{colors.gray.gray700}' },
      tertiary: { value: '{colors.gray.gray500}' },
      quaternary: { value: '{colors.gray.gray400}' },
      placeholder: { value: '{colors.gray.gray300}' },
      disabled: { value: '{colors.gray.gray200}' },
    },
    icon: {
      primary: { value: '{colors.gray.gray800}' },
      secondary: { value: '{colors.gray.gray600}' },
      tertiary: { value: '{colors.gray.gray400}' },
      disabled: { value: '{colors.gray.gray200}' },
    },
    border: {
      default: { value: '{colors.gray.gray200}' },
      pressed: { value: '{colors.gray.gray150}' },
      disabled: { value: '{colors.gray.gray050}' },
    },
  },
});
