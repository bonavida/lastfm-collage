import { ChangeEvent, useCallback } from 'react';
/** Styles */
import styles from './Switch.module.scss';

interface SwitchProps {
  name: string;
  value: boolean;
  disabled?: boolean;
  children?: React.ReactNode | string;
  className?: string;
  error?: { message: string };
  onChange: (arg0: boolean) => void;
}

const Switch = ({
  name,
  value = false,
  children,
  onChange,
  className = '',
  disabled = false,
}: SwitchProps) => {
  const handleChange = useCallback(
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      onChange(checked);
    },
    [onChange, disabled]
  );

  return (
    <div className={className || styles.Switch}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className={styles.SwitchInput}
        defaultChecked={value}
        disabled={disabled}
        onChange={handleChange}
      />
      <label className={styles.SwitchLabel} htmlFor={name}>
        <div className={styles.SwitchSliderWrapper}>
          <span className={styles.SwitchSlider} />
        </div>
        <span className={styles.SwitchText}>{children}</span>
      </label>
    </div>
  );
};

export default Switch;
