/** Styles */
import styles from './ToastContainer.module.scss';

interface ToastcontainerProps {
  children: React.ReactNode;
}

const ToastContainer = ({ children }: ToastcontainerProps) => {
  return <div className={styles.toastContainer}>{children}</div>;
};

export default ToastContainer;
