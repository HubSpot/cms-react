export type DataFetchingLibs = 'graphql-request' | 'axios';

export function transformPokemonData(
  data: any,
  dataFetchingLib: DataFetchingLibs,
) {
  let pokemonName;
  let height;
  let weight;
  let profileImage;
  let pokemonType;

  if (dataFetchingLib === 'graphql-request') {
    const {
      name: pokemon,
      height: pokemonHeight,
      weight: pokemonWeight,
      pokemon_v2_pokemonsprites,
      pokemon_v2_pokemontypes,
    } = data.pokemon_v2_pokemon[0];

    const { sprites } = pokemon_v2_pokemonsprites[0];
    const { pokemon_v2_type } = pokemon_v2_pokemontypes[0];

    pokemonName = pokemon;
    height = pokemonHeight;
    weight = pokemonWeight;
    profileImage = sprites.other.dream_world.front_default;
    pokemonType = pokemon_v2_type.name;
  } else {
    pokemonName = data.name;
    height = data.height;
    weight = data.weight;
    profileImage = data.sprites.other.dream_world.front_default;
    pokemonType = data.types[0].type.name;
  }

  return {
    pokemonName,
    height,
    weight,
    profileImage,
    pokemonType,
  };
}

type PokemonTypes =
  | 'psychic'
  | 'normal'
  | 'electric'
  | 'water'
  | 'fire'
  | 'grass';

export function getTypeColor(pokemonType: PokemonTypes) {
  switch (pokemonType) {
    case 'psychic':
      return 'purple';
    case 'normal':
      return 'gray';
    case 'electric':
      return 'yellow';
    case 'water':
      return 'blue';
    case 'fire':
      return 'red';
    case 'grass':
      return 'green';
  }
}
