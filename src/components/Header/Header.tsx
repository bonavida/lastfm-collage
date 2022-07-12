import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Popover, ArrowContainer } from 'react-tiny-popover';
/** Components */
import UserAvatar from './UserAvatar';
import UserMenu from './UserMenu';
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
  const [mounted, setMounted] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className={styles.container}>
      <Link href="/">
        <a className={styles.title}>
          <Logo className={styles.logo} />
          <span>Collage</span>
        </a>
      </Link>
      {mounted && user && (
        <Popover
          isOpen={isPopoverOpen}
          positions={['top', 'bottom', 'left', 'right']}
          content={({ position, childRect, popoverRect }) => (
            <ArrowContainer
              position={position}
              childRect={childRect}
              popoverRect={popoverRect}
              arrowColor={'#333'}
              arrowSize={7}
              className="popover-arrow-container"
              arrowClassName="popover-arrow"
            >
              <UserMenu user={user} />
            </ArrowContainer>
          )}
          padding={12}
          onClickOutside={() => setIsPopoverOpen(false)}
        >
          <UserAvatar
            user={user}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          />
        </Popover>
      )}
    </header>
  );
};

export default Header;
