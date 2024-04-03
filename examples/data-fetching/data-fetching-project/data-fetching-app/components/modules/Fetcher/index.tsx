import {
  BooleanField,
  ChoiceField,
  ModuleFields,
  TextField,
} from '@hubspot/cms-components/fields';
import axios from 'axios';
import nodeFetch from 'node-fetch';
import { NodeFetchCache, FileSystemCache } from 'node-fetch-cache';
import { request as graphqlRequest, gql } from 'graphql-request';

// https://github.com/apollographql/apollo-feature-requests/issues/287#issuecomment-1192993207
import { ApolloClient, gql as apolloGql } from '@apollo/client/core/index.js';
import { InMemoryCache } from '@apollo/client/cache/index.js';
import { HttpLink } from '@apollo/client/link/http/index.js';

import ButtonIsland from './Button.js?island';
import { Island } from '@hubspot/cms-components';

const POKEMON_GRAPHQL_SCHEMA_URL = 'https://beta.pokeapi.co/graphql/v1beta/';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({}),
  uri: POKEMON_GRAPHQL_SCHEMA_URL,
  link: new HttpLink({
    uri: POKEMON_GRAPHQL_SCHEMA_URL,
    fetch: nodeFetch as any,
  }),
});

const apolloQuery = apolloGql`
  query samplePokeAPIquery($pokemonName: String) {
    pokemon_v2_pokemon(where: { name: { _eq: $pokemonName } }) {
      name
      height
      weight
      pokemon_v2_pokemonmoves(where: { level: { _eq: 1 } }) {
        pokemon_v2_move {
          name
        }
        level
      }
    }
  }
`;

const pokemonQuery = gql`
  query samplePokeAPIquery($pokemonName: String) {
    pokemon_v2_pokemon(where: { name: { _eq: $pokemonName } }) {
      name
      height
      weight
      pokemon_v2_pokemonmoves(where: { level: { _eq: 1 } }) {
        pokemon_v2_move {
          name
        }
        level
      }
    }
  }
`;
const nodeFetchCache = NodeFetchCache.create({
  cache: new FileSystemCache({
    cacheDirectory: '/tmp/nodeFetchCache',
    ttl: 1000 * 60 * 5, // 5 mins
  }),
});

export const meta = {
  label: 'Fetcher',
};

export async function getServerSideProps(
  {
    libs,
    fieldValues,
  }: {
    libs: string[];
    fieldValues: {
      pokemon: string;
      useCustomFetchUrl: boolean;
      fetchUrl: string;
    };
  },
  url?: URL,
) {
  const dataPromises = [];
  const start = Date.now();

  const fetchUrl = urlToFetch(fieldValues);

  if (libs.includes('axios')) {
    dataPromises.push(
      axios.get(fetchUrl).then((response) => {
        return { json: response.data, duration: Date.now() - start };
      }),
    );
  }
  if (libs.includes('nodeFetch')) {
    dataPromises.push(
      nodeFetch(fetchUrl).then(async (response) => {
        console.log('response');
        return { json: await response.json(), duration: Date.now() - start };
      }),
    );
  }
  if (libs.includes('nodeFetchCache')) {
    dataPromises.push(
      nodeFetchCache(fetchUrl).then(async (response) => {
        return { json: await response.json(), duration: Date.now() - start };
      }),
    );
  }
  if (libs.includes('fetch')) {
    if (!fetch) {
      throw new Error(
        `Fetch API is not defined, node version = ${process.versions.node}`,
      );
    }

    dataPromises.push(
      fetch(fetchUrl).then(async (response) => {
        return { json: await response.json(), duration: Date.now() - start };
      }),
    );
  }

  if (libs.includes('graphql-request')) {
    dataPromises.push(
      graphqlRequest(POKEMON_GRAPHQL_SCHEMA_URL, pokemonQuery, {
        pokemonName: fieldValues.pokemon,
      }).then((value) => {
        return { json: value, duration: Date.now() - start };
      }),
    );
  }
  if (libs.includes('apollo')) {
    dataPromises.push(
      apolloClient
        .query({
          query: apolloQuery,
          variables: {
            pokemonName: fieldValues.pokemon,
          },
        })
        .then((value) => {
          return { json: value.data, duration: Date.now() - start };
        }),
    );
  }

  const unknownLibs = libs.filter(
    (lib) =>
      ![
        'axios',
        'nodeFetch',
        'nodeFetchCache',
        'fetch',
        'graphql-request',
        'apollo',
      ].includes(lib),
  );

  if (unknownLibs.length > 0) {
    throw new Error(
      `Unknown fetch lib${
        unknownLibs.length > 1 ? 's' : ''
      }: ${unknownLibs.join(', ')}`,
    );
  }

  const jsonData = (await Promise.allSettled(dataPromises)).map((result) => {
    console.log(`result`, result);
    return result.status === 'fulfilled'
      ? result.value
      : {
          status: result.status,
          reason: result.reason,
        };
  });

  const resultByLib = Object.fromEntries(
    libs.map((lib, i) => {
      return [lib, jsonData[i]];
    }),
  );

  return {
    serverSideProps: { resultByLib },
  };
}

function DataForFetch({
  lib,
  result,
}: {
  lib: string;
  result: { json: any; duration: number };
}) {
  let stringifiedData: any;
  let errorMessage;
  const { duration, json } = result;

  try {
    stringifiedData = JSON.stringify(json, null, 2);
  } catch (error) {
    errorMessage = `Invalid json: ${json}`;
  }
  return (
    <details>
      <summary>
        <h3 style={{ display: 'inline', cursor: 'pointer' }}>
          ...via {lib} <small>(duration = {duration}ms)</small>
        </h3>
      </summary>
      <br />
      <code>
        <pre>{errorMessage || stringifiedData}</pre>
      </code>
    </details>
  );
}

export function Component({
  fieldValues,
  serverSideProps = {},
}: {
  fieldValues: {
    fetchUrl: string;
    useCustomFetchUrl: boolean;
    pokemon: string;
    showIsland: boolean;
  };
  serverSideProps: { resultByLib?: Record<string, any> };
}) {
  const { resultByLib } = serverSideProps;

  return (
    <>
      <h2>Fetched: {urlToFetch(fieldValues)}</h2>

      {resultByLib &&
        Object.entries(resultByLib).map(([lib, result]) => (
          <DataForFetch lib={lib} result={result} key={lib} />
        ))}

      {fieldValues.showIsland && (
        <Island module={ButtonIsland} style={{ margin: '1em' }} />
      )}
    </>
  );
}

export const fields = (
  <ModuleFields>
    <ChoiceField
      name="pokemon"
      label="Pokemon"
      default={'eevee'}
      choices={[
        ['eevee', 'Eevee'],
        ['pikachu', 'Pikachu'],
        ['mewtwo', 'Mewtwo'],
        ['squirtle', 'Squirtle'],
        ['charizard', 'Charizard'],
      ]}
      visibility={{
        controlling_field_path: 'useCustomFetchUrl',
        controlling_value_regex: 'false',
        operator: 'EQUAL',
      }}
    ></ChoiceField>

    <TextField
      name="fetchUrl"
      label="Fetch URL"
      default="https://swapi.dev/api/people/1/"
      visibility={{
        controlling_field_path: 'useCustomFetchUrl',
        controlling_value_regex: 'true',
        operator: 'EQUAL',
      }}
    />

    <BooleanField
      name="useCustomFetchUrl"
      label="Use custom fetch URL"
      default={false}
    />

    <ChoiceField
      name="libs"
      label="Fetch libraries"
      default={[
        'axios',
        'nodeFetch',
        'nodeFetchCache',
        'graphql-request',
        'apollo',
      ]}
      multiple={true}
      choices={[
        ['axios', 'axios'],
        ['nodeFetch', 'nodeFetch'],
        ['nodeFetchCache', 'nodeFetchCache (fs cache)'],
        ['fetch', 'fetch (needs node 18.x)'],
        ['graphql-request', 'graphql-request'],
        ['apollo', 'Apollo (memory cache)'],
      ]}
    ></ChoiceField>

    <BooleanField name="showIsland" default={false} label={'Show Island'} />
  </ModuleFields>
);

function urlToFetch(fieldValues: {
  useCustomFetchUrl: boolean;
  fetchUrl: string;
  pokemon: string;
}) {
  if (fieldValues.useCustomFetchUrl) {
    return fieldValues.fetchUrl;
  }

  return `https://pokeapi.co/api/v2/pokemon/${fieldValues.pokemon}`;
}
