import React from 'react';
import { Link } from 'react-router-dom';
import navigationStyles from '../styles/header.module.css';
import logo from '../assets/sprocket.svg';

export default function Header() {
  return (
    <header className={navigationStyles.header}>
      <Link to="/">
        <img src={logo} height="100" width="auto" />
      </Link>
      <nav className={navigationStyles.nav}>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li className={navigationStyles.btn}>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
