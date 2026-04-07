import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const Button = ({ children, type = 'button', ...props }: ButtonProps) => {
  return (
    <button
      className={
        'h-full p-16 bg-primary rounded-14 body-s text-text-on-primary'
      }
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
