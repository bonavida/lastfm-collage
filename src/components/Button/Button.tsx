import React from 'react';
/** Styles */
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isSecondary?: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const Button = ({
  children,
  className,
  disabled = false,
  isSecondary = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${
        isSecondary ? styles.buttonSecondary : ''
      } ${className || ''}`}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
