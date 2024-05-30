import axios from 'axios';
import { request as graphqlRequest, gql } from 'graphql-request';
import {
  withUrlAndQuery,
  logInfo,
  logError,
  ModuleDataFetchResult,
  ModulePropsWithoutSSP,
} from '@hubspot/cms-components';
import componentStyles from '../../../styles/component.module.css';
import PokeCard from '../../PokeCard.js';

type FieldValues = {
  fetchUrl: string;
  useCustomFetchUrl: boolean;
  pokemon: string;
  dataFetchingLib: string;
};

type CustomModulePropsWithoutSSP = Omit<
  ModulePropsWithoutSSP,
  'fieldValues'
> & {
  fieldValues: FieldValues | Record<string, any>;
};

const POKEMON_GRAPHQL_SCHEMA_URL = 'https://beta.pokeapi.co/graphql/v1beta/';

const pokemonQuery = gql`
  query samplePokeAPIquery($pokemonName: String) {
    pokemon_v2_pokemon(where: { name: { _eq: $pokemonName } }) {
      name
      height
      weight
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export const getServerSideProps = withUrlAndQuery(
  async (
    moduleProps: CustomModulePropsWithoutSSP,
    extraDeps,
  ): Promise<ModuleDataFetchResult> => {
    const fieldValues = moduleProps.fieldValues as FieldValues;
    const { url } = extraDeps;

    const dataPromises = [];
    const start = Date.now();

    const dataFetchingLib: string = fieldValues?.dataFetchingLib;
    const fetchUrl = fieldValues && urlToFetch(fieldValues);

    if (dataFetchingLib && !fieldValues.useCustomFetchUrl) {
      if (dataFetchingLib === 'axios') {
        if (fetchUrl) {
          dataPromises.push(
            axios.get(fetchUrl).then((response: any) => {
              return {
                json: response.data,
                duration: Date.now() - start,
              };
            }),
          );
        }
      }

      if (dataFetchingLib == 'graphql-request') {
        dataPromises.push(
          graphqlRequest(POKEMON_GRAPHQL_SCHEMA_URL, pokemonQuery, {
            pokemonName: fieldValues && fieldValues.pokemon,
          }).then((value) => {
            return {
              json: value,
              duration: Date.now() - start,
            };
          }),
        );
      }
    } else {
      dataPromises.push(
        axios.get(fetchUrl).then((response: any) => {
          return {
            json: response.data,
            duration: Date.now() - start,
          };
        }),
      );
    }

    logInfo('before data fetch');

    const jsonData = (await Promise.allSettled(dataPromises)).map(
      (result: any) => {
        if (result.status === 'fulfilled') {
          logInfo(
            'Fetch success',
            Object.keys(result.value.json).join(', '),
            `duration = ${result.value.duration}`,
          );
        } else {
          logError('Fetch failure');
        }
        return result.status === 'fulfilled'
          ? result.value
          : {
              status: result.status,
              reason: result.reason,
            };
      },
    );
    logInfo('after data fetch');

    const results =
      dataFetchingLib && !fieldValues.useCustomFetchUrl
        ? [dataFetchingLib, jsonData[0]]
        : jsonData[0];

    return {
      serverSideProps: { results, urlSearchParams: url.search },
      caching: {
        cacheControl: {
          maxAge: 60,
        },
      },
    };
  },
);

function DataForFetch({
  dataFetchingLib,
  data,
}: {
  dataFetchingLib: string;
  data: any;
}) {
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
  }
  if (dataFetchingLib === 'axios') {
    pokemonName = data.name;
    height = data.height;
    weight = data.weight;
    profileImage = data.sprites.other.dream_world.front_default;
    pokemonType = data.types[0].type.name;
  }

  return (
    <PokeCard
      pokemonName={pokemonName}
      height={height}
      weight={weight}
      profileImage={profileImage}
      pokemonType={pokemonType}
    />
  );
}

export function Component({
  fieldValues,
  serverSideProps = { results: {}, urlSearchParams: '' },
}: {
  fieldValues: FieldValues;
  serverSideProps: {
    results: Record<string, any>;
    urlSearchParams: string;
  };
}) {
  const { results } = serverSideProps;
  return (
    <div className={componentStyles.summary}>
      <h2>
        Fetched data from <code>{urlToFetch(fieldValues)}</code> via{' '}
        {fieldValues.useCustomFetchUrl ? 'axios' : fieldValues.dataFetchingLib}
      </h2>
      {fieldValues.useCustomFetchUrl ? (
        <details>
          <summary>
            <h3 style={{ display: 'inline', cursor: 'pointer' }}>
              ...via {fieldValues.fetchUrl}{' '}
              <small>(duration = {results.duration}ms)</small>
            </h3>
          </summary>
          <br />
          <code>
            <pre>{JSON.stringify(results.json, null, 2)}</pre>
          </code>
        </details>
      ) : (
        results && (
          <DataForFetch
            dataFetchingLib={fieldValues.dataFetchingLib}
            data={results[1].json}
            key={fieldValues.dataFetchingLib}
          />
        )
      )}
    </div>
  );
}

function urlToFetch(fieldValues: FieldValues) {
  if (fieldValues.useCustomFetchUrl) {
    return fieldValues.fetchUrl;
  }

  return `https://pokeapi.co/api/v2/pokemon/${fieldValues.pokemon}`;
}

export const meta = {
  label: 'Fetcher',
};

// @ts-ignore-next-line
export { fields } from './fields.tsx';
