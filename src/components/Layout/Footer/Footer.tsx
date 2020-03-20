import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/** Styles */
import './Footer.scss';

const Footer = () => (
  <div className="footer__container">
    <span className="footer__author">bonavida</span>
    <span className="footer__year">{new Date().getFullYear()}</span>
    <div className="footer__divider" />
    <a
      href="https://www.last.fm/es/user/bonavida"
      target="_blank"
      rel="noopener noreferrer"
      className="footer__link"
    >
      <FontAwesomeIcon className="footer__icon" icon={['fab', 'lastfm']} />
    </a>
    <a
      href="https://github.com/bonavida"
      target="_blank"
      rel="noopener noreferrer"
      className="footer__link"
    >
      <FontAwesomeIcon className="footer__icon" icon={['fab', 'github']} />
    </a>
  </div>
);

export default Footer;
