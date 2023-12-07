import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button className={`${className}`} {...props} type="button">
      {children}
    </button>
  );
};

export default Button;
