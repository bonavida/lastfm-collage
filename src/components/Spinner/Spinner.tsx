/** Styles */
import styles from './Spinner.module.scss';

const Spinner = () => (
  <div className={styles.spinner}>
    <div className={styles.spinnerDot1} />
    <div className={styles.spinnerDot2} />
    <div className={styles.spinnerDot3} />
  </div>
);

export default Spinner;
