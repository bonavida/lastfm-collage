import React from 'react';
/** Styles */
import './Button.scss';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
};

const Button = ({
  children,
  className,
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`button ${className || ''}`}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
