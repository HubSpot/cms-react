import { Link } from 'react-router-dom';
import pageStyles from '../styles/page.module.css';

export default function Home() {
  return (
    <div className={pageStyles.home}>
      <h1>CMS React Routing</h1>
      <Link to="/pokedex">See Pokedex</Link>
    </div>
  );
}
