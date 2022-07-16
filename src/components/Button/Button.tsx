/** Styles */
import styles from './Button.module.scss';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isSecondary?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const Button = ({
  type = 'button',
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
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
