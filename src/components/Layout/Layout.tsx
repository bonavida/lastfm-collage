import React from 'react';
/** Components */
import Header from '@components/Header';
import Footer from '@components/Footer';
/** Styles */
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className={styles.container}>
    <Header />
    <div className={styles.content}>{children}</div>
    <Footer />
  </div>
);

export default Layout;
