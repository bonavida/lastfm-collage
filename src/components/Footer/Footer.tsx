import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/** Styles */
import styles from './Footer.module.scss';

const Footer = () => (
  <footer className={styles.container}>
    <span className={styles.author}>bonavida</span>
    <span className={styles.year}>{new Date().getFullYear()}</span>
    <div className={styles.divider} />
    <a
      href="https://www.last.fm/es/user/bonavida"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
    >
      <FontAwesomeIcon className={styles.icon} icon={['fab', 'lastfm']} />
    </a>
    <a
      href="https://github.com/bonavida"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
    >
      <FontAwesomeIcon className={styles.icon} icon={['fab', 'github']} />
    </a>
  </footer>
);

export default Footer;
