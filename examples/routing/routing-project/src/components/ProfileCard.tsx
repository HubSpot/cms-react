import pageStyles from '../styles/page.module.css';

export default function ProfileCard({ pokemon }: any) {
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

  const listOfMoves = moves.map((move: any) => (
    <li key={move.pokemon_v2_move.name}>{move.pokemon_v2_move.name}</li>
  ));

  const listOfTypes = types.map((type: any) => (
    <li key={type.pokemon_v2_type.name}>{type.pokemon_v2_type.name}</li>
  ));

  return (
    <div className={pageStyles.card}>
      <img src={profileImageSrc} alt={name} width={300} />
      <div className={pageStyles.info}>
        <div>
          <h1>{name}</h1>
          <div>
            <ul>
              <li className={pageStyles.attributeTitle}>STATS</li>
              <li>HP: {base_experience}</li>
              <li>HEIGHT: {height}m</li>
              <li>WEIGHT: {weight}kg</li>
            </ul>
          </div>
        </div>
        <ul className={pageStyles.moves}>
          <div>
            <li className={pageStyles.attributeTitle}>TYPES</li>
            {listOfTypes}
          </div>
          <div>
            <li className={pageStyles.attributeTitle}>MOVES</li>
            {listOfMoves}
          </div>
        </ul>
      </div>
    </div>
  );
}
