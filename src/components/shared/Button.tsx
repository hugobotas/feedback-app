import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps {
  isDisabled?: boolean;
  children: React.ReactNode;
  version?: 'primary' | 'secondary';
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

function Button({
  children,
  version = 'primary',
  type = 'button',
  isDisabled = false,
}: ButtonProps) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  );
}

export default Button;
