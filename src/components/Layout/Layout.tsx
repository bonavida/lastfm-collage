/** Components */
import Header from '@components/Header';
import Footer from '@components/Footer';
/** Types */
import { User } from '@customTypes/auth';
/** Styles */
import styles from './Layout.module.scss';

interface LayoutProps {
  user: User | null;
  children: React.ReactNode;
}

const Layout = ({ user, children }: LayoutProps) => (
  <div className={styles.container}>
    <Header user={user} />
    <main className={styles.content}>{children}</main>
    <Footer />
  </div>
);

export default Layout;
