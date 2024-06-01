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
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
        </ul>
      </nav>
      <li className={navigationStyles.btn}>
        <Link to="/contact">Contact Us</Link>
      </li>
    </header>
  );
}
