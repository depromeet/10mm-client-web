// import { type ButtonHTMLAttributes } from 'react';
// import { css } from '@/styled-system/css';
// import { type SystemStyleObject } from '@/styled-system/types';

import { cva } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';

// type SizeType = 'large' | 'medium';
// type VariantType = 'cta' | 'primary' | 'secondary' | 'ghost';
// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   size?: SizeType;
//   variant?: VariantType;
// }

const buttonStyle = cva({
  base: {},
  variants: {
    size: {
      medium: {
        borderRadius: '16px',
        height: '44px',
        padding: '0 20px',
        width: 'fit-content',
      },
      large: {
        padding: '0 24px',
        borderRadius: '16px',
        height: '44px',
        width: '100%',
      },
    },
    variant: {
      cta: { background: 'linear-gradient(91deg, #FFE5EE 0%, #E9CEFF 18.75%, #B9CDFF 100%)', color: 'gray.gray100' },
      primary: {
        backgroundColor: 'purple.purple800',
        color: 'var(--colors-purple-purple800)',
      },
      secondary: {
        backgroundColor: 'red',
        color: 'var(--colors-text-secondary)',
      },
      ghost: {},
    },
  },
});

const Button = styled('button', buttonStyle);

// const Button: React.FC<ButtonProps> = ({ className, children, size = 'large', variant = 'primary', ...props }) => {
//   console.log('variant: ', variant);
//   return (
//     <button type="button" {...props}>
//       {children}
//     </button>
//   );
// };

export default Button;
