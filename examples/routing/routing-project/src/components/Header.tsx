import { Link } from 'react-router-dom';
import navigationStyles from '../styles/header.module.css';
import pokeball from '../assets/pokeball.svg';

export default function Header() {
  return (
    <header className={navigationStyles.header}>
      <Link to="/">
        <img src={pokeball} height="75" width="auto" />
      </Link>
      <nav className={navigationStyles.nav}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`pokedex/`}>Pokedex</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
