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
      gray200: { value: '#2F2F38' },
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
      purple900: {
        value: '#D7E3FF',
      },
      purple800: {
        value: '#C4D4FC',
      },
      purple700: {
        value: '#B3C3FD',
      },
      purple600: {
        value: '#9EB1F2',
      },
      purple500: {
        value: '#849BEB',
      },
      purple400: {
        value: '#767FAC',
      },
      purple300: {
        value: '#4F5780',
      },
      purple100: {
        value: '#414259',
      },
      purple050: {
        value: '#2D2D3E',
      },
      purple000: {
        value: '#20212E',
      },
    },

    red: {
      red700: {
        value: '#D37D7D',
      },
      red500: {
        value: '#C53C3C',
      },
      red300: {
        value: '#7B4F4F',
      },
      red000: {
        value: '#2E2020',
      },
    },
    blue: {
      blue500: {
        value: '#507BE9',
      },
    },
    gradients: {
      primary: {
        value: 'linear-gradient(91deg, #FAD0DE 0%, #CCCBFF 46.87%, #ABD2FF 100%)',
      },
      button1: {
        value: 'linear-gradient(91deg, #FFD8E6 0%, #F0D4F3 14%, #C3D2FF 71%, #B5D3F7 100%)',
      },
      button2: {
        value: 'linear-gradient(103deg, #F2C8D7 6.96%, #E7CAEA 18.8%, #AFC4F9 54.3%, #9BCFEC 94.63%)',
      },
      button3: {
        value: 'linear-gradient(91deg, #F6E8FF 0%, #B5CAF3 100%)',
      },
      button4: {
        value: 'linear-gradient(91deg, #F9D8F0 0%, #B4D5FB 100%)',
      },
      strong: {
        value: 'linear-gradient(91deg, #FD8EB6 0%, #E79FCA 24.5%, #B6ADEB 57%, #75C5FF 100%)',
      },
      medium: {
        value: 'linear-gradient(91deg, #F7C1D8 0%, #DDD5FA 48%, #97CDF4 100%)',
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
