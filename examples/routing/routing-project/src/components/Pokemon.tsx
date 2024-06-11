import { Link, useParams } from 'react-router-dom';
import pageStyles from '../styles/page.module.css';
import { logInfo } from '@hubspot/cms-components';

export function ProfileView({ pokemon }: any) {
  logInfo(pokemon);
  const {
    name,
    height,
    weight,
    base_experience,
    pokemon_v2_pokemonmoves: moves,
    pokemon_v2_pokemonsprites: sprites,
    pokemon_v2_pokemontypes: types,
  } = pokemon;

  const profileImageSrc = sprites[0].sprites;

  const listOfMoves = moves
    .map((move: any) => move.pokemon_v2_move.name)
    .join(', ');

  const listOfTypes = types
    .map((type: any) => type.pokemon_v2_type.name)
    .join(', ');

  return (
    <div className={pageStyles.profile}>
      <img src={profileImageSrc} alt={name} width={300} />
      <div>
        <p>HP: {base_experience}</p>
        <p>Height: {height}m</p>
        <p>Weight: {weight}kg</p>
        <p>{listOfMoves}</p>
        <p>{listOfTypes}</p>
      </div>
    </div>
  );
}

export default function Pokemon({ pokemonList }: { pokemonList: any }) {
  const params = useParams();
  const pokemon = pokemonList.find((pokemon) => pokemon.name === params.name);
  return (
    <main className={pageStyles.page}>
      <h1>{pokemon.name}</h1>
      <ProfileView pokemon={pokemon} />
      <div className={pageStyles.back}>
        <Link to="/pokedex">Back to Pokedex</Link>
      </div>
    </main>
  );
}
