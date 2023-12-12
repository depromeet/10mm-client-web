import { type ButtonHTMLAttributes } from 'react';
import { css } from '@/styled-system/css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'large' | 'medium';
  variant: 'cta' | 'primary' | 'secondary' | 'ghost';
}

const Button: React.FC<ButtonProps> = ({ className, children, size, variant, ...props }) => {
  return (
    <button type="button" {...props} className={css(sizeCss.medium, variantCss[variant])}>
      {children}
    </button>
  );
};

const sizeCss = {
  large: {
    padding: '0 24px',
    borderRadius: '16px',
    height: '44px',
    width: '100%',
  },
  medium: {
    borderRadius: '16px',
    height: '44px',
    padding: '0 20px',
    width: 'fit-content',
  },
};

const variantCss = {
  cta: { backgroundColor: 'purple.purple300' },
  primary: {
    backgroundColor: 'purple.purple500',
  },
  secondary: {
    backgroundColor: 'red',
  },
  ghost: {},
};

export default Button;
