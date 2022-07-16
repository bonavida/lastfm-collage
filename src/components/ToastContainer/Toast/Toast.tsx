import { useEffect, useRef } from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/** Styles */
import styles from './Toast.module.scss';

interface ToastProps {
  message: string;
  status: 'success' | 'error' | 'info';
  duration?: number;
  isStatic?: boolean;
  onDismiss: () => void;
}

const Toast = ({
  message,
  status,
  duration = 3000,
  isStatic = false,
  onDismiss,
}: ToastProps) => {
  const timeoutRef = useRef<number | null>(null);
  const toastClassNames = cx(styles.toast, {
    [styles.toastSuccess]: status === 'success',
    [styles.toastError]: status === 'error',
    [styles.toastInfo]: status === 'info',
  });

  useEffect(() => {
    if (isStatic) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      onDismiss && onDismiss();
    }, duration);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className={toastClassNames}>
      <span className={styles.toastMessage}>{message}</span>
      <button className={styles.toastCloseButton} onClick={() => onDismiss()}>
        <FontAwesomeIcon icon="times" className={styles.toastCloseIcon} />
      </button>
    </div>
  );
};

export default Toast;
