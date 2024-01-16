import { cva } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';

const badgeStyle = cva({
  base: {
    width: '54px',
    height: '23px',
    padding: '3px 10px 3px 10px',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textStyle: 'body6',
  },
  variants: {
    color: {
      purple: {
        color: 'purple.purple500',
        borderColor: 'purple.purple300',
        backgroundColor: 'purple.purple000',
      },
      gray: {
        color: 'text.secondary',
        borderColor: 'gray.gray400',
        backgroundColor: 'gray.gray100',
      },
      red: {
        color: 'red.red700',
        borderColor: 'red.red300',
        backgroundColor: 'red.red000',
      },
    },
    variant: {
      solid: {},
      line: {
        border: '1px solid', // TODO : 0.5 가능?
      },
    },
  },
  compoundVariants: [
    {
      color: 'gray',
      variant: 'solid',
      css: {
        backgroundColor: 'gray.gray300',
        color: 'purple.purple800',
      },
    },
  ],
  defaultVariants: {
    variant: 'line',
  },
});

const Badge = styled('div', badgeStyle);

export default Badge;
