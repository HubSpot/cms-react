import { NavLink } from 'react-router-dom';
import navigationStyles from '../styles/header.module.css';
import pokeball from '../assets/pokeball.svg';

export default function Header() {
  return (
    <header className={navigationStyles.header}>
      <NavLink to="/">
        <img src={pokeball} height="75" width="auto" alt="Pokeball" />
      </NavLink>
      <nav className={navigationStyles.nav}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? navigationStyles.active : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pokedex"
              className={({ isActive }) =>
                isActive ? navigationStyles.active : undefined
              }
            >
              Pokedex
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
