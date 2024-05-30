import { logInfo } from '@hubspot/cms-components';
import pokeCardStyles from '../styles/pokecard.module.css';

type PokeCardProps = {
  pokemonName: string;
  height: number;
  weight: number;
  profileImage: string;
  pokemonType: string;
};

export default function PokeCard({
  pokemonName,
  height,
  weight,
  profileImage,
  pokemonType,
}: PokeCardProps) {
  let typeColor = 'blue';
  switch (pokemonType) {
    case 'psychic':
      typeColor = 'purple';
      break;
    case 'normal':
      typeColor = 'gray';
      break;
    case 'electric':
      typeColor = 'yellow';
      break;
    case 'water':
      typeColor = 'blue';
      break;
    case 'fire':
      typeColor = 'red';
      break;
    case 'grass':
      typeColor = 'green';
      break;
  }
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
