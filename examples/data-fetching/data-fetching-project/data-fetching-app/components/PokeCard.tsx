import pokeCardStyles from '../styles/pokecard.module.css';
import { getTypeColor } from '../utils/index.js';

type PokeCardProps = {
  pokemonData: any;
};

export default function PokeCard({ pokemonData }: PokeCardProps) {
  const { pokemonName, height, weight, profileImage, pokemonType } =
    pokemonData;
  const typeColor = getTypeColor(pokemonType);

  return (
    <div>
      <div className={pokeCardStyles.wrapper}>
        <div
          className={pokeCardStyles.card}
          style={{ boxShadow: `12px 12px 26px 0px ${typeColor}` }}
        >
          <div className={pokeCardStyles.profile}>
            <img
              src={profileImage}
              alt={pokemonName}
              width="100"
              height="auto"
            />
            <div className={pokeCardStyles.highlight}></div>
          </div>
          <h2>{pokemonName}</h2>
          <div className={pokeCardStyles.attributes}>
            <div className={pokeCardStyles.stack}>
              <h4>Height</h4>
              <p>{height}m</p>
            </div>
            <div className={pokeCardStyles.stack}>
              <h4>Weight</h4>
              <p>{weight}kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
