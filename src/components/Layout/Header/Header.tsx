import React from 'react';
import { useSelector } from 'react-redux';
/** Types */
import { RootState } from 'store';
import { UserSliceState } from 'context/user';
/** Styles */
import './Header.scss';

const Header = () => {
  const { name, realname, url, image } = useSelector<RootState, UserSliceState>(
    state => state.user
  );
  return (
    <div className="header__container">
      <h1 className="header__title">last.fm Collage</h1>
      {name && (
        <div className="header__user">
          <a href={url} target="_blank" rel="noopener noreferrer">
            @<span className="header__username">{name}</span>
          </a>
          <img className="header__avatar" alt={name} src={image} />
        </div>
      )}
    </div>
  );
};

export default Header;
