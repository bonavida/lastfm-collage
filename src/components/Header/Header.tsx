import React from 'react';
/** Types */
import { User } from '@customTypes/auth';
/** SVGs */
import Logo from '@public/lastfm_logo.svg';
/** Styles */
import styles from './Header.module.scss';

interface HeaderProps {
  user: User | null;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>
        <Logo className={styles.logo} />
        Collage
      </h1>
      {user && (
        <div className={styles.user}>
          <a href={user.url} target="_blank" rel="noopener noreferrer">
            @<span className={styles.username}>{user.username}</span>
          </a>
          <img
            className={styles.avatar}
            alt={user.username}
            src={user.avatar}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
