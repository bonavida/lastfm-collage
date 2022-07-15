import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import cx from 'classnames';
/** Styles */
import styles from './Input.module.scss';

type Error = {
  message: string;
};

type InputProps = {
  name: string;
  label?: string;
  className?: string;
  error?: Error;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = (
  { name, label, className, error, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const inputContainerClassnames = cx(styles.InputContainer, {
    ...(className && { [className]: !!className }),
  });

  const inputElementClassnames = cx(styles.InputElement, {
    [styles.InputElementError]: !!error,
  });

  return (
    <div className={inputContainerClassnames}>
      {label && (
        <label htmlFor={name} className={styles.InputLabel}>
          {label}
        </label>
      )}
      <input
        {...props}
        id={name}
        name={name}
        ref={ref}
        className={inputElementClassnames}
      />
      {error && error.message && (
        <span className={styles.InputErrorMessage}>{error.message}</span>
      )}
    </div>
  );
};

export default forwardRef(Input);
