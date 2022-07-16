import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/** Types */
import { User } from '@customTypes/auth';
/** Styles */
import styles from './UserMenu.module.scss';

interface UserMenuProps {
  user: User;
}

const UserMenu = ({ user }: UserMenuProps) => {
  const router = useRouter();

  const handleLogout = useCallback(() => {
    const logout = async () => {
      try {
        await fetch('/api/logout', {
          method: 'GET',
        });
        router.push('/signin');
      } catch (e) {
        console.error(e);
      }
    };
    logout();
  }, [router]);

  return (
    <ul className={styles.userMenu}>
      <li className={`${styles.userMenuItem} ${styles.userMenuItemNoPadding}`}>
        <a
          href={user.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.userMenuItemLink}
        >
          <span className={styles.username}>
            @<span>{user.username}</span>
          </span>
          <span className={styles.profile}>View profile</span>
        </a>
      </li>
      <li
        className={`${styles.userMenuItem} ${styles.userMenuItemLogout}`}
        onClick={() => handleLogout()}
      >
        <span className={styles.logout}>Logout</span>
        <FontAwesomeIcon
          icon="right-from-bracket"
          className={styles.logoutIcon}
        />
      </li>
    </ul>
  );
};

export default UserMenu;
