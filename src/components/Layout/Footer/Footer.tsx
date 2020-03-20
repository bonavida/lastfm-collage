import React from 'react';
/** Styles */
import './Footer.scss';

const Footer = () => (
  <div className="footer__container">
    <span className="footer__author">bonavida</span>
    <span className="footer__year">{new Date().getFullYear()}</span>
  </div>
);

export default Footer;
