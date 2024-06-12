import { Link, useParams } from 'react-router-dom';
import pageStyles from '../styles/page.module.css';
import ProfileCard from './ProfileCard.tsx';

export default function Pokemon({ pokemonList }: { pokemonList: any }) {
  const params = useParams();
  const pokemon = pokemonList.find((pokemon) => pokemon.name === params.name);
  return (
    <main className={pageStyles.page}>
      <h1>Profile</h1>
      <ProfileCard pokemon={pokemon} />
      <div className={pageStyles.back}>
        <Link to="/pokedex">Back to Pokedex</Link>
      </div>
    </main>
  );
}
