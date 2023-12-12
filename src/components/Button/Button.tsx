import { type ButtonHTMLAttributes } from 'react';
import { css } from '@/styled-system/css';
import { type SystemStyleObject } from '@/styled-system/types';

type SizeType = 'large' | 'medium';
type VariantType = 'cta' | 'primary' | 'secondary' | 'ghost';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: SizeType;
  variant?: VariantType;
}

const Button: React.FC<ButtonProps> = ({ className, children, size = 'large', variant = 'primary', ...props }) => {
  console.log('variant: ', variant);
  return (
    <button type="button" {...props} className={css(sizeCss[size], variantCss[variant])}>
      {children}
    </button>
  );
};

const sizeCss: Record<SizeType, SystemStyleObject> = {
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

const variantCss: Record<VariantType, SystemStyleObject> = {
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
};

export default Button;
