import { cva } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';

const chipStyle = cva({
  base: {
    padding: '6px 14px',
    display: 'inline-block',
    textStyle: 'body3',
    borderRadius: '20px',
    transition: 'all 0.3s',
  },
  variants: {
    selected: {
      true: {
        background: 'purple.purple300',
        color: 'text.primary',
      },
      false: {
        background: 'gray.gray100',
        color: 'text.tertiary',
      },
    },
  },
});

const Chip = styled('div', chipStyle);

export default Chip;
