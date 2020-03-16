import React from 'react';
/** Components */
import Header from './Header';
import Footer from './Footer';
/** Styles */
import './Layout.scss';

type LayoutProps = { children: React.ReactNode };

const Layout = ({ children }: LayoutProps) => (
  <div className="layout__container">
    <Header />
    <div className="layout__content">{children}</div>
    <Footer />
  </div>
);

export default Layout;
