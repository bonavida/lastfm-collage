import React from 'react';
/** SVGs */
import Logo from '@public/lastfm_logo.svg';
/** Styles */
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>
        <Logo className={styles.logo} />
        Collage
      </h1>
    </header>
  );
};

export default Header;
