import { Link } from 'react-router-dom';
import cardStyles from '../styles/card.module.css';

export function ListingCard({ pokemonList }: { pokemonList: any }) {
  return (
    <div className={cardStyles.cards}>
      {pokemonList.map((pokemon) => (
        <Link key={pokemon.name} to={`${pokemon.name}`}>
          <div className={cardStyles.card}>
            <img
              src={pokemon.pokemon_v2_pokemonsprites[0].sprites}
              height={100}
              alt={pokemon.name}
            />
            <div>
              <p>{pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name}</p>
              <h2>{pokemon.name}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
