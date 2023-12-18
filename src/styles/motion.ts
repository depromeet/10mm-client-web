import { defineKeyframes } from '@pandacss/dev';

export const keyframeList = defineKeyframes({
  gradient: {
    '0%': { transform: 'rotate(0deg)', backgroundPositionX: '0%', backgroundPositionY: '0%' },
    '50%': { backgroundPositionX: '50%', backgroundPositionY: '100%' },
    '100%': { transform: 'rotate(0deg)', backgroundPositionX: '0%', backgroundPositionY: '0%' },
  },
  circleRotate: {
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
});
