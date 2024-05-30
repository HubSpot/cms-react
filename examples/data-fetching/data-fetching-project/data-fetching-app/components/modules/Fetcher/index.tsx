import axios from 'axios';
import { request as graphqlRequest, gql } from 'graphql-request';
import {
  withUrlAndQuery,
  logInfo,
  logError,
  ModuleDataFetchResult,
  ModulePropsWithoutSSP,
} from '@hubspot/cms-components';
import PokeCard from '../../PokeCard.js';
import componentStyles from '../../../styles/component.module.css';

type FieldValues = {
  fetchUrl: string;
  useCustomFetchUrl: boolean;
  pokemon: string;
  libs: string[];
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

    const libs: string[] = fieldValues?.libs;
    const fetchUrl = fieldValues && urlToFetch(fieldValues);

    if (libs && !fieldValues.useCustomFetchUrl) {
      if (libs.includes('axios')) {
        if (fetchUrl) {
          dataPromises.push(
            axios.get(fetchUrl).then((response) => {
              return {
                json: response.data,
                duration: Date.now() - start,
              };
            }),
          );
        }
      }

      if (libs.includes('graphql-request')) {
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
        axios.get(fetchUrl).then((response) => {
          return {
            json: response.data,
            duration: Date.now() - start,
          };
        }),
      );
    }

    logInfo('before data fetch');

    const jsonData = (await Promise.allSettled(dataPromises)).map((result) => {
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
    });
    logInfo('after data fetch');

    const results =
      libs && !fieldValues.useCustomFetchUrl
        ? Object.fromEntries(
            libs.map((lib, i: number) => {
              return [lib, jsonData[i]];
            }),
          )
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

function DataForFetch({ lib, result }: { lib: string; result: any }) {
  let pokemonName;
  let height;
  let weight;
  let profileImage;
  let pokemonType;

  if (lib === 'graphql-request') {
    pokemonName = result.json.pokemon_v2_pokemon[0].name;
    height = result.json.pokemon_v2_pokemon[0].height;
    weight = result.json.pokemon_v2_pokemon[0].weight;
    profileImage =
      result.json.pokemon_v2_pokemon[0].pokemon_v2_pokemonsprites[0].sprites
        .other.dream_world.front_default;
    pokemonType =
      result.json.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0]
        .pokemon_v2_type.name;
  }
  if (lib === 'axios') {
    pokemonName = result.json.name;
    height = result.json.height;
    weight = result.json.weight;
    profileImage = result.json;
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
        {fieldValues.libs}
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
        results &&
        Object.entries(results).map(([lib, result]) => (
          <DataForFetch lib={lib} result={result} key={lib} />
        ))
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
