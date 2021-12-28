import React from 'react';
/** Styles */
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Last.fm Collage</h1>
    </div>
  );
};

export default Header;
