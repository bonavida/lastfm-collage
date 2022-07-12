import { forwardRef } from 'react';
/** Types */
import { User } from '@customTypes/auth';
/** Styles */
import styles from './UserAvatar.module.scss';

interface UserAvatarProps {
  user: User;
  onClick: () => void;
}

const UserAvatar = forwardRef(
  ({ user, onClick }: UserAvatarProps, ref: any): JSX.Element => {
    return (
      <img
        ref={ref}
        className={styles.avatar}
        alt={user.username}
        src={user.avatar}
        onClick={onClick}
      />
    );
  }
);

UserAvatar.displayName = 'UserAvatar';

export default UserAvatar;
