import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button className={`${className}`} type="button" {...props}>
      {children}
    </button>
  );
};

export default Button;
