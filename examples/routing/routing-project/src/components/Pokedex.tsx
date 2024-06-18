import pageStyles from '../styles/page.module.css';
import { ListingCard } from './ListingCard.tsx';

const POKEMON_GRAPHQL_SCHEMA_URL = 'https://beta.pokeapi.co/graphql/v1beta/';

export default function Pokedex({ pokemonList }: { pokemonList: any }) {
  return (
    <main className={pageStyles.page}>
      <h1>Pokedex</h1>
      <ListingCard pokemonList={pokemonList} />
    </main>
  );
}
